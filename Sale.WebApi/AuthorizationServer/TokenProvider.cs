using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Sale.WebApi.AuthorizationServer
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
            var response = Core.Account.Instance.Login(new Resources.AccountLoginRequest { Email = context.UserName, Password = context.Password });

            if (response.IsOk && response.UserId > 0)
            {
                var claimsIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
                claimsIdentity.AddClaim(new Claim("UserId", response.UserId.ToString()));
                //identity.AddClaim(new Claim("SessionId", Guid.NewGuid().ToString()));
                //claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                //claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
                var ticket = new AuthenticationTicket(claimsIdentity, null);
                context.Validated(ticket);
            }
            return Task.FromResult<object>(null);
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