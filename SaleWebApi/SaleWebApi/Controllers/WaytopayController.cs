using SaleWebApi.Controllers.Resources;
using SaleWebApi.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Transactions;
using System.Web.Http;


namespace SaleWebApi.Controllers
{
    using Context = SaleEntities;


    public class WaytopayController : ApiController
    {

        private void UpdateVersion()
        {
            SynchronizatorController.UpdateVersion(this.GetType().Name);
        }
        

        [HttpGet]
        [ActionName("Get")]
        public WaytopayResource Get(int id)
        {
            using (var db = new Context())
            {
                var obj = db.Waytopay.FirstOrDefault(x => x.id == id);
                var res = WaytopayResource.ToResource(obj);
                return res;
            }
        }

        [HttpGet]
        [ActionName("GetList")]
        public List<WaytopayResource> GetList()
        {
            using (var db = new Context())
            {
                var res = new List<WaytopayResource>();
                foreach (var obj in db.Waytopay) res.Add(WaytopayResource.ToResource(obj));
                return res;
            }
        }

        [HttpPut]
        [ActionName("Edit")]
        public WaytopayResource Edit(int id, WaytopayResource model)
        {
            if (model == null || id != model.id || !(model.id>0)
                || string.IsNullOrWhiteSpace(model.name)
            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new Context())
                {
                    var obj = db.Waytopay.FirstOrDefault(x => x.id == id);
                    if (obj==null) throw new HttpResponseException(HttpStatusCode.NotFound);
                    db.Entry(obj).CurrentValues.SetValues(WaytopayResource.ToEntity(model));
                    db.SaveChanges();
                }
                UpdateVersion();
                scope.Complete();
            }
            return Get(model.id);
        }


        [HttpPost]
        [ActionName("Create")]
        public WaytopayResource Create(WaytopayResource model)
        {
            if (model == null
                || string.IsNullOrWhiteSpace(model.name)
            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new Context())
                {
                    var obj = WaytopayResource.ToEntity(model);
                    db.Waytopay.Add(obj);
                    db.SaveChanges();
                    model.id = obj.id;
                }
                UpdateVersion();
                scope.Complete();
            }
            return Get(model.id);
        }

    }
}