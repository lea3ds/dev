using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SaleWebApi.Controllers
{
    //[Authorize]
    [EnableCors("*", "*", "*")]
    public class BaseController : ApiController
    {
        protected BaseController()
        {
            //asdasd
            //asdasd
        }
    }
}