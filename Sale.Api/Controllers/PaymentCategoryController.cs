using Sale.Api.Controllers.Resources;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Transactions;
using System.Web.Http;


namespace Sale.Api.Controllers
{
    public class PaymentCategoryController : BaseController
    {

        private void UpdateVersion()
        {
            SynchronizatorController.UpdateVersion(this.GetType().Name);
        }
        

        [HttpGet]
        [ActionName("Get")]
        public PaymentCategoryResource Get(int id)
        {
            using (var db = new  DataAccess.SaleContext())
            {
                var obj = db.PaymentCategory.FirstOrDefault(x => x.id == id);
                var res = PaymentCategoryResource.ToResource(obj);
                return res;
            }
        }

        [HttpGet]
        [ActionName("GetList")]
        public List<PaymentCategoryResource> GetList()
        {
            using (var db = new  DataAccess.SaleContext())
            {
                var res = new List<PaymentCategoryResource>();
                foreach (var obj in db.PaymentCategory) res.Add(PaymentCategoryResource.ToResource(obj));
                return res;
            }
        }

        [HttpPut]
        [ActionName("Edit")]
        public PaymentCategoryResource Edit(int id, PaymentCategoryResource model)
        {
            if (model == null || id != model.id || !(model.id>0)
                || string.IsNullOrWhiteSpace(model.name)
            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new  DataAccess.SaleContext())
                {
                    var obj = db.PaymentCategory.FirstOrDefault(x => x.id == id);
                    if (obj==null) throw new HttpResponseException(HttpStatusCode.NotFound);
                    db.Entry(obj).CurrentValues.SetValues(PaymentCategoryResource.ToEntity(model));
                    db.SaveChanges();
                }
                UpdateVersion();
                scope.Complete();
            }
            return Get(model.id);
        }


        [HttpPost]
        [ActionName("Create")]
        public PaymentCategoryResource Create(PaymentCategoryResource model)
        {
            if (model == null
                || string.IsNullOrWhiteSpace(model.name)
            ) throw new HttpResponseException(HttpStatusCode.BadRequest);

            using (TransactionScope scope = new TransactionScope())
            {
                using (var db = new  DataAccess.SaleContext())
                {
                    var obj = PaymentCategoryResource.ToEntity(model);
                    db.PaymentCategory.Add(obj);
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