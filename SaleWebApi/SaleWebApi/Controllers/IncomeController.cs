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


    public class IncomeController : BaseController
    {

        private void UpdateVersion()
        {
            SynchronizatorController.UpdateVersion(this.GetType().Name);
        }
        

        [HttpGet]
        [ActionName("Get")]
        public IncomeResource Get(int id)
        {
            using (var db = new Context())
            {
                var obj = db.Income.FirstOrDefault(x => x.id == id);
                var res = IncomeResource.ToResource(obj);
                return res;
            }
        }

        [HttpGet]
        [ActionName("GetList")]
        public List<IncomeResource> GetList()
        {
            using (var db = new Context())
            {
                var res = new List<IncomeResource>();
                foreach (var obj in db.Income) res.Add(IncomeResource.ToResource(obj));
                return res;
            }
        }

        [HttpPut]
        [ActionName("Edit")]
        public IncomeResource Edit(int id, IncomeResource model)
        {
            if (model == null || id != model.id || !Exists(id)
                || !(model.id > 0)
                || model.category == null
                || string.IsNullOrWhiteSpace(model.date)
                || !(model.pendings.Count > 0)
            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new Context())
                {
                    var obj = db.Income.Include(x => x.IncomePending).FirstOrDefault(x => x.id == id);
                    db.Entry(obj).CurrentValues.SetValues(IncomeResource.ToEntity(model));
                    obj.IncomePending.Clear();
                    foreach (var item in model.pendings) obj.IncomePending.Add(IncomePendingResource.ToEntity(item));
                    db.SaveChanges();
                }
                UpdateVersion();
                scope.Complete();
            }
            return Get(model.id);
        }


        [HttpPost]
        [ActionName("Create")]
        public IncomeResource Create(IncomeResource model)
        {
            if (model == null // || Exists(model.id) //solo si no auto increment
                || model.category == null
                || string.IsNullOrWhiteSpace(model.date)
                || !(model.pendings.Count > 0)
                || !(model.fees >= 0)
                || !(model.amount >= 0)
                || model.waytopay == null

            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new Context())
                {
                    var obj = IncomeResource.ToEntity(model);
                    db.Income.Add(obj);

                    model.fees = model.fees > 1 ? model.fees : 1;
                    for (int i = 1; i <= model.fees; i++)
                    {
                        var amount = Math.Truncate(model.amount / model.fees);
                        if (i == 1) amount = amount + (model.amount - (amount * model.fees));
                        obj.IncomePending.Add(new IncomePending
                        {
                            id = i,
                            date = null,
                            amount = amount,
                            waytopayId = model.waytopay?.id,
                        });
                    }
                    db.SaveChanges();
                    model.id = obj.id;
                }
                UpdateVersion();
                scope.Complete();
            }
            return Get(model.id);
        }


        [HttpDelete]
        [ActionName("Delete")]
        public int Delete(int id)
        {
            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new Context())
                {
                    var item = db.Income.FirstOrDefault(x => x.id == id);
                    db.Income.Remove(item);
                    db.SaveChanges();
                    UpdateVersion();
                }
            }
            return id;
        }

        private bool Exists(int id)
        {
            using (var db = new Context())
            {
                return db.Income.Count(x => x.id == id) > 0;
            }
        }
   
        

    }
}