using SaleWebApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SaleWebApi.Controllers.Resources
{
    public class IncomeResource
    {
        public int id { get; set; }
        public string date { get; set; }
        public string detail { get; set; }
        public decimal amount { get; set; } // calculated field
        public int fees { get; set; } // calculated field
        public WaytopayResource waytopay { get; set; }
        public IncomeCategoryResource category { get; set; }
        public List<IncomePendingResource> pendings { get; set; }

        public static IncomeResource ToResource(Income obj)
        {
            if (obj == null) return null;
            var res = new IncomeResource
            {
                id = obj.id,
                date = obj.date?.ToString("yyyy-MM-dd"),
                detail = obj.detail,
                waytopay = null,
                category = IncomeCategoryResource.ToResource(obj.IncomeCategory),
                pendings = new List<IncomePendingResource>()
            };
            res.amount = res.pendings.Sum(x => x.amount);
            res.fees = res.pendings.Count;
            foreach (var item in obj.IncomePending)
            {
                res.pendings.Add(IncomePendingResource.ToResource(item));
            }
            return res;
        }

        public static Income ToEntity(IncomeResource  obj)
        {
            if (obj == null) return null;
            var res = new Income
            {
                id = obj.id,
                date = string.IsNullOrWhiteSpace(obj.date) ? (DateTime?)null : DateTime.Parse(obj.date),
                detail = obj.detail,
                categoryId = obj.category?.id
            };
            return res;
        }


    }
    
}