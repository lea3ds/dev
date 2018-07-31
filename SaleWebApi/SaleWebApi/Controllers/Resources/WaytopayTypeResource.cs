using SaleWebApi.Entities;
using System.Collections.Generic;

namespace SaleWebApi.Controllers.Resources
{
    public class WaytopayTypeResource
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool disabled { get; set; }

        public static WaytopayTypeResource ToResource(WaytopayType obj)
        {
            if (obj == null) return null;
            var res = new WaytopayTypeResource
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
            };
            return res;
        }

        public static WaytopayType ToEntity(WaytopayTypeResource obj)
        {
            if (obj == null) return null;
            var res = new WaytopayType
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
            };
            return res;
        }
    }

}