using System.Collections.Generic;

namespace Sale.Api.Controllers.Resources
{
    public class IncomeCategoryResource
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool disabled { get; set; }

        public static IncomeCategoryResource ToResource(DataAccess.IncomeCategory obj)
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

        public static DataAccess.IncomeCategory ToEntity(IncomeCategoryResource obj)
        {
            if (obj == null) return null;
            var res = new DataAccess.IncomeCategory
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
            };
            return res;
        }

    }
    
}