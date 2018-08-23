using Sale.Api.AuthorizationServer;
using Sale.Api.Controllers.Resources;
using Sale.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Transactions;
using System.Web;
using System.Web.Http;

namespace Sale.Api.Controllers
{
    public class AccountPublicController: ApiController
    {

        [HttpPost]
        [ActionName("Signin")]
        public AccountSigninResponse Signin(AccountSigninRequest request)
        {
            return Core.Account.Instance.Signin(request);
        }

    }
}