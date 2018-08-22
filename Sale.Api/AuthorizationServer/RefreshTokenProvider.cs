using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Infrastructure;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Sale.Api.AuthorizationServer
{
    public class RefreshTokenProvider : AuthenticationTokenProvider
    {
        private static ConcurrentDictionary<string, AuthenticationTicket> _refreshTokens = new ConcurrentDictionary<string, AuthenticationTicket>();

        private TimeSpan _refreshTokenLifetime;

        public RefreshTokenProvider(TimeSpan refreshTokenLifetime)
        {
            _refreshTokenLifetime = refreshTokenLifetime;
        }

        public override void Create(AuthenticationTokenCreateContext context)
        {
            CreateToken(context);
            base.Create(context);   
        }

        public override Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            var guid = "refresh123";// Guid.NewGuid().ToString();
            context.Ticket.Properties.IssuedUtc = DateTime.UtcNow;
            context.Ticket.Properties.ExpiresUtc = DateTime.UtcNow.Add(_refreshTokenLifetime);
            _refreshTokens.TryAdd(guid, context.Ticket);
            context.SetToken(guid);
            return Task.FromResult<object>(null);
        }

        public override void Receive(AuthenticationTokenReceiveContext context)
        {
            //ReceiveToken(context);
            base.Receive(context);  
        }

        public override Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {
            if (_refreshTokens.TryRemove(context.Token, out AuthenticationTicket ticket))
            {
                context.SetTicket(ticket);
            }
            return Task.FromResult<object>(null);
        }
        /*
        public async Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            CreateToken(context);
        }

        public void Receive(AuthenticationTokenReceiveContext context)
        {
            ReceiveToken(context);
        }

        public async Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {
            ReceiveToken(context);
        }
        */

        private void CreateToken(AuthenticationTokenCreateContext context)
        {
            context.Ticket.Properties.IssuedUtc = DateTime.UtcNow;
            context.Ticket.Properties.ExpiresUtc = DateTime.UtcNow.Add(_refreshTokenLifetime);
            context.SetToken("lindoGatito");
        }

        public void ReceiveToken(AuthenticationTokenReceiveContext context)
        {
            context.DeserializeTicket("lindoGatito");
        }

    }
}