using SaleWebApi.Entities;
using System.Collections.Generic;

namespace SaleWebApi.Controllers.Resources
{
    public class IncomeCategoryResource
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool disabled { get; set; }

        public static IncomeCategoryResource ToResource(IncomeCategory obj)
        {
            if (obj == null) return null;
            var res = new IncomeCategoryResource
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
            };
            return res;
        }

        public static IncomeCategory ToEntity(IncomeCategoryResource obj)
        {
            if (obj == null) return null;
            var res = new IncomeCategory
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
            };
            return res;
        }

    }
    
}