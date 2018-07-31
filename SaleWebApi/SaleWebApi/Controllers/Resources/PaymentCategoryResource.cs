using SaleWebApi.Entities;
using System.Collections.Generic;

namespace SaleWebApi.Controllers.Resources
{
    public class PaymentCategoryResource
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool disabled { get; set; }

        public static PaymentCategoryResource ToResource(PaymentCategory obj)
        {
            if (obj == null) return null;
            var res = new PaymentCategoryResource
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
            };
            return res;
        }

        public static PaymentCategory  ToEntity(PaymentCategoryResource obj)
        {
            if (obj == null) return null;
            var res = new PaymentCategory
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
            };
            return res;
        }

    }
    
}