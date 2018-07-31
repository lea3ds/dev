using SaleWebApi.Entities;
using System.Collections.Generic;

namespace SaleWebApi.Controllers.Resources
{
    public class WaytopayResource
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool disabled { get; set; }
        public WaytopayTypeResource type { get; set; }

        public static WaytopayResource ToResource(Waytopay obj)
        {
            if (obj == null) return null;
            var res = new WaytopayResource
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
                type = WaytopayTypeResource.ToResource(obj.WaytopayType),
            };
            return res;
        }

        public static Waytopay ToEntity(WaytopayResource obj)
        {
            if (obj == null) return null;
            var res = new Waytopay
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
                typeId = obj.type?.id,
            };
            return res;
        }

    }

}