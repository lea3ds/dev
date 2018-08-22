using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
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
            if (context.UserName == "admin" || context.Password == "123456")
            {
                var claimsIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));

                var ticket = new AuthenticationTicket(claimsIdentity, null);
                context.Validated(ticket);
            }

            return Task.FromResult<object>(null);
            /*
            var mail = context.UserName;
            var password = context.Password;
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(ClaimTypes.Name, mail));
            context.Validated(identity);
            return base.GrantResourceOwnerCredentials(context);
            */
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