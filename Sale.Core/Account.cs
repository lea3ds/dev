using Sale.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Sale.Core
{
    public class Account
    {
        public static Account Instance = new Account();
        private Account() { }

        public AccountLoginResponse Login(AccountLoginRequest request)
        {
            if (request == null
                || string.IsNullOrWhiteSpace(request.Email)
                || string.IsNullOrWhiteSpace(request.Password)
            ) throw new BadRequestException();

            var userId = (long)0;
            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new DataAccess.SaleContext())
                {
                    var now = DateTime.Now;
                    var pass = db.AccountPassword.FirstOrDefault(x => x.AccountUser.Email.Equals(request.Email, StringComparison.InvariantCultureIgnoreCase));
                    if (pass == null)
                        throw new Exception("User not found");
                    var isValid = PasswordHelper.IsValid(request.Password, new HashInfo { Hash = pass.Hash, Salt = pass.Salt, Iterations = pass.Iterations });

                    if (!isValid)
                    {
                        pass.Attempts++;
                        pass.AttemptTimeStamp = now;
                        db.SaveChanges();
                        throw new Exception("Invalid password");
                    }

                    pass.Attempts = 0;
                    pass.AttemptTimeStamp = now;
                    userId = pass.UserId;
                    db.SaveChanges();
                }
                scope.Complete();
                return new AccountLoginResponse { IsOk = true, UserId = userId };
            }
        }

        public AccountSigninResponse Signin(AccountSigninRequest request)
        {
            if (request == null
                || string.IsNullOrWhiteSpace(request.Email)
                || string.IsNullOrWhiteSpace(request.Password)
            ) throw new BadRequestException();

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new DataAccess.SaleContext())
                {
                    var now = DateTime.Now;
                    var userExists = db.AccountUser.Any(x => x.Email.Equals(request.Email, StringComparison.InvariantCultureIgnoreCase));
                    if (userExists)
                        throw new Exception("User already exists");

                    var hash = PasswordHelper.Hash(request.Password);

                    var user = new DataAccess.AccountUser { Email = request.Email };
                    user.AccountPassword = new DataAccess.AccountPassword { Hash = hash.Hash, Salt = hash.Salt, Iterations = hash.Iterations, Attempts = 0, AttemptTimeStamp = null };
                    db.AccountUser.Add(user);
                    db.SaveChanges();
                }
                scope.Complete();
                return new AccountSigninResponse { IsOk = true };
            }
        }

        public AccountPasswordResponse Password(AccountPasswordRequest request)
        {
            if (request == null
                || string.IsNullOrWhiteSpace(request.PasswordOld)
                || string.IsNullOrWhiteSpace(request.PasswordNew)
            ) throw new BadRequestException();

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new DataAccess.SaleContext())
                {
                    var now = DateTime.Now;
                    var pass = db.AccountPassword.FirstOrDefault(x => x.UserId == request.UserId);
                    if (pass == null)
                        throw new Exception("User not signin");
                    if (!PasswordHelper.IsValid(request.PasswordOld, new HashInfo { Hash = pass.Hash, Iterations = pass.Iterations, Salt = pass.Salt }))
                        throw new Exception("Invalid password");

                    var hash = PasswordHelper.Hash(request.PasswordNew);

                    pass.Hash = hash.Hash;
                    pass.Salt = hash.Salt;
                    pass.Iterations = hash.Iterations;
                    pass.Attempts = 0;
                    pass.AttemptTimeStamp = null;

                    db.SaveChanges();
                }
                scope.Complete();
                return new AccountPasswordResponse { IsOk = true };
            }
        }
    }

}
