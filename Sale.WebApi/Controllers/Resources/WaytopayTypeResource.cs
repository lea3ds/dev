
namespace Sale.WebApi.Controllers.Resources
{
    public class WaytopayTypeResource
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool disabled { get; set; }

        public static WaytopayTypeResource ToResource(DataAccess.WaytopayType obj)
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

        public static DataAccess.WaytopayType ToEntity(WaytopayTypeResource obj)
        {
            if (obj == null) return null;
            var res = new DataAccess.WaytopayType
            {
                id = obj.id,
                name = obj.name,
                disabled = obj.disabled,
            };
            return res;
        }
    }

}