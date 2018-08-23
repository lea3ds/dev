using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Sale.Api.AuthorizationServer
{
    public class TokenProvider : OAuthAuthorizationServerProvider
    {

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
           context.Validated();
           return Task.FromResult<object>(null);
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            try
            {
                using (var db = new DataAccess.SaleContext())
                {
                    var now = DateTime.Now;
                    var pass = db.AccountPassword.FirstOrDefault(x => x.AccountUser.Email.Equals(context.UserName, StringComparison.InvariantCultureIgnoreCase));
                    if (pass == null) throw new InvalidCredentialException();
                    var isValid = PasswordHelper.IsValid(context.Password, new HashInfo { Hash = pass.Hash, Salt = pass.Salt, Iterations = pass.Iterations });

                    if (!isValid)
                    {
                        pass.Attempts++;
                        pass.AttemptTimeStamp = now;
                        db.SaveChanges();
                        throw new InvalidCredentialException();
                    }

                    pass.Attempts = 0;
                    pass.AttemptTimeStamp = now;
                    db.SaveChanges();

                    var claimsIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
                    claimsIdentity.AddClaim(new Claim("UserId", pass.UserId.ToString()));
                    //identity.AddClaim(new Claim("SessionId", Guid.NewGuid().ToString()));
                    //claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                    //claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
                    var ticket = new AuthenticationTicket(claimsIdentity, null);
                    context.Validated(ticket);

                }
                return Task.FromResult<object>(null);
            }
            catch (InvalidCredentialException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            context.Validated(context.Ticket);
            return Task.FromResult<object>(null);
        }

        /*
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            //return Task.FromResult<object>(null);

            return base.TokenEndpoint(context);
        }

        public override Task GrantCustomExtension(OAuthGrantCustomExtensionContext context)
        {
            var code = context.Parameters.Get("code");
            var uri = context.Parameters.Get("uri");
            return base.GrantCustomExtension(context);
        }

        public override Task ValidateTokenRequest(OAuthValidateTokenRequestContext context)
        {
            return base.ValidateTokenRequest(context);
        }
        */
    }
}