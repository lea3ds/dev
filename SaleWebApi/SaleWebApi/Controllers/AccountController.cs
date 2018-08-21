using SaleWebApi.Controllers.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SaleWebApi.Controllers
{
    public class AccountController : BaseController
    {
        [HttpPost]
        [ActionName("ChangePassword")]
        public bool ChangePassword(AccountChangePasswordRequest request)
        {
            try
            {
                if (request == null
                    || string.IsNullOrWhiteSpace(request.PasswordOld)
                    || string.IsNullOrWhiteSpace(request.PasswordNew)
                ) throw new InvalidRequestException();

                EndUserService.Instance.ChangePassword(UserId, request);
                return new ChangePasswordResponse { Success = true };
            }
            catch (Exception e)
            {
                Logger.LogException(e);
                throw new ChangePasswordErrorException();
            }

        }

    }
}