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


    public class IncomeCategoryController : ApiController
    {

        private void UpdateVersion()
        {
            SynchronizatorController.UpdateVersion(this.GetType().Name);
        }
        

        [HttpGet]
        [ActionName("Get")]
        public IncomeCategoryResource Get(int id)
        {
            using (var db = new Context())
            {
                var obj = db.IncomeCategory.FirstOrDefault(x => x.id == id);
                var res = IncomeCategoryResource.ToResource(obj);
                return res;
            }
        }

        [HttpGet]
        [ActionName("GetList")]
        public List<IncomeCategoryResource> GetList()
        {
            using (var db = new Context())
            {
                var res = new List<IncomeCategoryResource>();
                foreach (var obj in db.IncomeCategory) res.Add(IncomeCategoryResource.ToResource(obj));
                return res;
            }
        }

        [HttpPut]
        [ActionName("Edit")]
        public IncomeCategoryResource Edit(int id, IncomeCategoryResource model)
        {
            if (model == null || id != model.id || !(model.id>0)
                || string.IsNullOrWhiteSpace(model.name)
            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new Context())
                {
                    var obj = db.IncomeCategory.FirstOrDefault(x => x.id == id);
                    if (obj==null) throw new HttpResponseException(HttpStatusCode.NotFound);
                    db.Entry(obj).CurrentValues.SetValues(IncomeCategoryResource.ToEntity(model));
                    db.SaveChanges();
                }
                UpdateVersion();
                scope.Complete();
            }
            return Get(model.id);
        }


        [HttpPost]
        [ActionName("Create")]
        public IncomeCategoryResource Create(IncomeCategoryResource model)
        {
            if (model == null
                || string.IsNullOrWhiteSpace(model.name)
            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new Context())
                {
                    var obj = IncomeCategoryResource.ToEntity(model);
                    db.IncomeCategory.Add(obj);
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