using Sale.WebApi.Controllers.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Sale.Resources;

namespace Sale.WebApi.Controllers
{
    public class AccountController : BaseController
    {
        [HttpPost]
        [ActionName("Password")]
        public AccountPasswordResponse Signin(AccountPasswordRequest request)
        {
            request.UserId = UserId;
            return Core.Account.Instance.Password(request);
        }

    }
}