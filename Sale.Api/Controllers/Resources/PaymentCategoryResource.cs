using System.Collections.Generic;

namespace Sale.Api.Controllers.Resources
{
    public class PaymentCategoryResource
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool disabled { get; set; }

        public static PaymentCategoryResource ToResource(DataAccess.PaymentCategory obj)
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

        public static DataAccess.PaymentCategory  ToEntity(PaymentCategoryResource obj)
        {
            if (obj == null) return null;
            var res = new DataAccess.PaymentCategory
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
            };
            return res;
        }

    }
    
}