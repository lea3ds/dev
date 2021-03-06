﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Transactions;
using System.Web.Http;


namespace Sale.WebApi.Controllers
{
    public class SynchronizatorController : BaseController
    {
        public class SyncStateResource
        {
            public string key { get; set; }
            public long version { get; set; }
            public object data { get; set; }
        }

        [HttpGet]
        [ActionName("Initialize")]
        public object Initialize()
        {
            // Not publish !!!
            var tables = new List<string>
            {
                "Account",
                "Income",
                "IncomeCategory",
                "OperationType",
                "Payment",
                "PaymentCategory",
                "Stocktaking",
                "User",
                "Waytopay",
                "WaytopayType"
            };

            using (var db = new  DataAccess.SaleContext())
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    db.VersionTable.RemoveRange(db.VersionTable);
                    foreach (var tb in tables)
                    {
                        db.VersionTable.Add(new DataAccess.VersionTable { key = tb, version = 1 });
                    }
                    db.SaveChanges();
                    scope.Complete();
                }
            }
            return Versions();
        }

        [HttpGet]
        [ActionName("Versions")]
        public object Versions()
        {
            using (var db = new  DataAccess.SaleContext())
            {
                return db.VersionTable.ToList();
            }
        }

        [HttpPost]
        [ActionName("Sync")]
        public object Sync(List<SyncStateResource> model)
        {
            using (var db = new  DataAccess.SaleContext())
            {
                if (model == null) throw new HttpResponseException(HttpStatusCode.BadRequest);
                var localState = db.VersionTable.ToList();

                foreach (var item in model)
                {
                    try
                    {
                        var state = localState.FirstOrDefault(x => x.key.ToLower() == item.key.ToLower());
                        var version = state?.version ?? 0;
                        if (version > item.version)
                        {
                            item.version = version;
                            item.data = GetTableResponse(state.key);
                        }
                        else if (version == item.version && version > 0)
                        {
                            item.data = null;
                        }
                        else
                        {
                            item.version = 0;
                            item.data = "Not support";
                        }
                    }
                    catch (Exception ex)
                    {
                        item.version = 0;
                        item.data = ex.Message;
                    }
                }
            }
            return model;
        }

        #region Helpers

        private object GetTableResponse(string key)
        {
            key = key + "Controller";
            switch (key)
            {
                //case "AccountController": return new AccountController().GetList();
                //case "IncomeController": return new IncomeController().GetList();
                //case "IncomeCategoryController": return new IncomeCategoryController().GetList();
                //case "OperationTypeController": return new OperationTypeController().GetList();
                case "PaymentController": return new PaymentController().GetList();
                case "PaymentCategoryController": return new PaymentCategoryController().GetList();
                //case "StocktakingController": return new StocktakingController().GetList();
                case "UserController": return null;
                case "WaytopayController": return new WaytopayController().GetList();
                case "WaytopayTypeController": return new WaytopayTypeController().GetList();

                default: break;
            }
            return null;
        }

        public static void UpdateVersion(string Key)
        {
            using (var db = new  DataAccess.SaleContext())
            {
                Key = Key.Replace("Controller", "").ToLower();
                var obj = db.VersionTable.FirstOrDefault(x => x.key == Key);
                if (obj == null) obj = new DataAccess.VersionTable { key = Key, version = 0 };
                obj.version += 1;
                db.SaveChanges();
            }
        }

        #endregion

    }
}