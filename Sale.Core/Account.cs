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
                    var user = db.AccountUser.FirstOrDefault(x => x.Email.Equals(request.Email, StringComparison.InvariantCultureIgnoreCase));
                    if (user != null) throw new SigninUserExistsException();

                    var hash = PasswordHelper.Hash(request.Password);

                    user = new DataAccess.AccountUser { Email = request.Email };
                    user.AccountPassword = new DataAccess.AccountPassword { Hash = hash.Hash, Salt = hash.Salt, Iterations = hash.Iterations, Attempts = 0, AttemptTimeStamp = null };
                }
                scope.Complete();

                return new AccountSigninResponse { IsOk = true };
            }
        }
    }

}
