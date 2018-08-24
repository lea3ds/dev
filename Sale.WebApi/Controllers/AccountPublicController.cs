using Sale.WebApi.AuthorizationServer;
using Sale.WebApi.Controllers.Resources;
using Sale.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Transactions;
using System.Web;
using System.Web.Http;

namespace Sale.WebApi.Controllers
{
    public class AccountPublicController : ApiController
    {

        [HttpPost]
        [ActionName("Signin")]
        public AccountSigninResponse Signin(AccountSigninRequest request)
        {
            return Core.Account.Instance.Signin(request);
        }

    }
}