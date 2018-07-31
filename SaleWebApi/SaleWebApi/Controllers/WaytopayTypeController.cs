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


    public class WaytopayTypeController : ApiController
    {

        private void UpdateVersion()
        {
            SynchronizatorController.UpdateVersion(this.GetType().Name);
        }
        

        [HttpGet]
        [ActionName("Get")]
        public WaytopayTypeResource Get(int id)
        {
            using (var db = new Context())
            {
                var obj = db.WaytopayType.FirstOrDefault(x => x.id == id);
                var res = WaytopayTypeResource.ToResource(obj);
                return res;
            }
        }

        [HttpGet]
        [ActionName("GetList")]
        public List<WaytopayTypeResource> GetList()
        {
            using (var db = new Context())
            {
                var res = new List<WaytopayTypeResource>();
                foreach (var obj in db.WaytopayType) res.Add(WaytopayTypeResource.ToResource(obj));
                return res;
            }
        }

        [HttpPut]
        [ActionName("Edit")]
        public WaytopayTypeResource Edit(int id, WaytopayTypeResource model)
        {
            if (model == null || id != model.id || !(model.id>0)
                || string.IsNullOrWhiteSpace(model.name)
            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new Context())
                {
                    var obj = db.WaytopayType.FirstOrDefault(x => x.id == id);
                    if (obj==null) throw new HttpResponseException(HttpStatusCode.NotFound);
                    db.Entry(obj).CurrentValues.SetValues(WaytopayTypeResource.ToEntity(model));
                    db.SaveChanges();
                }
                UpdateVersion();
                scope.Complete();
            }
            return Get(model.id);
        }


        [HttpPost]
        [ActionName("Create")]
        public WaytopayTypeResource Create(WaytopayTypeResource model)
        {
            if (model == null
                || string.IsNullOrWhiteSpace(model.name)
            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new Context())
                {
                    var obj = WaytopayTypeResource.ToEntity(model);
                    db.WaytopayType.Add(obj);
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