using SaleWebApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SaleWebApi.Controllers.Resources
{
    public class PaymentResource
    {
        public int id { get; set; }
        public string date { get; set; }
        public string detail { get; set; }
        public decimal amount { get; set; } // calculated field
        public int fees { get; set; } // calculated field
        public WaytopayResource waytopay { get; set; }
        public PaymentCategoryResource category { get; set; }
        public List<PaymentPendingResource> pendings { get; set; }

        public static PaymentResource ToResource(Payment obj)
        {
            if (obj == null) return null;
            var res = new PaymentResource
            {
                id = obj.id,
                date = obj.date?.ToString("yyyy-MM-dd"),
                detail = obj.detail,
                waytopay = null,
                category = PaymentCategoryResource.ToResource(obj.PaymentCategory),
                pendings = new List<PaymentPendingResource>()
            };
            foreach (var item in obj.PaymentPending)
            {
                res.pendings.Add(PaymentPendingResource.ToResource(item));
            }
            res.amount = res.pendings.Sum(x => x.amount);
            res.fees = res.pendings.Count;
            return res;
        }

        public static Payment ToEntity(PaymentResource  obj)
        {
            if (obj == null) return null;
            var res = new Payment
            {
                id = obj.id,
                date = string.IsNullOrWhiteSpace(obj.date) ? (DateTime?)null : DateTime.Parse(obj.date),
                detail = obj.detail,
                categoryId = obj.category?.id,
            };
            return res;
        }


    }
    
}