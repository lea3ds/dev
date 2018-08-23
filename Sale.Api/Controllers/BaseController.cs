using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Sale.Api.Controllers
{
    [Authorize]
    [EnableCors("*", "*", "*")]
    public class BaseController : ApiController
    {
        private ClaimsIdentity Identity => (ClaimsIdentity)User.Identity;
        public long UserId => Convert.ToInt64(Identity.FindFirst("UserId").Value);

        protected BaseController()
        {

        }
    }
}