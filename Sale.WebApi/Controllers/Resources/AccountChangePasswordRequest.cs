﻿namespace Sale.WebApi.Controllers.Resources
{
    public class AccountChangePasswordRequest
    {
        public string PasswordOld { get; set; }
        public string PasswordNew { get; set; }
    }

}