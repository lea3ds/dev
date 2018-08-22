using Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using Sale.Api.App_Start;
using System;
using System.Web.Http;

/* NuGet
Newtonsoft.Json
Microsoft.Owin.Host.SystemWeb   -> Owin (>= 1.0.0) Microsoft.Owin (>= 4.0.0)
Microsoft.AspNet.WebApi.Owin    -> Owin (>= 1.0.0) Microsoft.Owin (>= 2.0.2) Microsoft.AspNet.WebApi.Core (>= 5.2.6 && < 5.3.0) 
Microsoft.Owin.Cors             -> Owin (>= 1.0.0) Microsoft.Owin (>= 4.0.0) Microsoft.AspNet.Cors (>= 5.0.0)
Microsoft.Owin.Security.OAuth   -> Owin (>= 1.0.0) Microsoft.Owin (>= 4.0.0) Microsoft.Owin.Security (>= 4.0.0) Newtonsoft.Json (>= 9.0.1)  
*/

[assembly: OwinStartup(typeof(Startup))]
namespace Sale.Api.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888

            ConfigureOAuth(appBuilder);

            var httpConfiguration = new HttpConfiguration();
            WebApiConfig.Register(httpConfiguration);
            httpConfiguration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new DefaultContractResolver();
            //httpConfiguration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            appBuilder.UseWebApi(httpConfiguration);

            appBuilder.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

        }

        private void ConfigureOAuth(IAppBuilder appBuilder)
        {
            var accessTokenLifetime = TimeSpan.FromMinutes(10);
            var refreshTokenLifetime = TimeSpan.FromDays(10);

            var serverOptions = new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/token"), // http://localhost:51931/api/token //grant_type:password&username:admin password:123456
                AccessTokenExpireTimeSpan = accessTokenLifetime,
                Provider = new AuthorizationServer.TokenProvider(), // http://localhost:51931/api/token //grant_type:refresh_token&refresh_token:elRefreshToken
                RefreshTokenProvider = new AuthorizationServer.RefreshTokenProvider(refreshTokenLifetime),
            };
            appBuilder.UseOAuthAuthorizationServer(serverOptions);
            appBuilder.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
        private static void ConfigureJsonFormatter(HttpConfiguration httpConfiguration)
        {
            httpConfiguration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new DefaultContractResolver();
            //httpConfiguration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
        }
    }
}