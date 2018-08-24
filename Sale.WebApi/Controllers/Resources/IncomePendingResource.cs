using System;

namespace Sale.WebApi.Controllers.Resources
{
    public class IncomePendingResource
    {
        public int id { get; set; }
        public string date { get; set; }
        public decimal amount { get; set; }
        public WaytopayResource waytopay { get; set; }

        public static IncomePendingResource ToResource(DataAccess.IncomePending obj)
        {
            if (obj == null) return null;
            var res = new IncomePendingResource
            {
                id = obj.id,
                date = obj.date?.ToString("yyyy-MM-dd"),
                amount = obj.amount,
                waytopay = WaytopayResource.ToResource(obj.Waytopay),
            };
            return res;
        }

        public static DataAccess.IncomePending ToEntity(IncomePendingResource obj)
        {
            if (obj == null) return null;
            var res = new DataAccess.IncomePending
            {
                id = obj.id,
                date = string.IsNullOrWhiteSpace(obj.date) ? (DateTime?)null : DateTime.Parse(obj.date),
                amount = obj.amount,
                waytopayId = obj.waytopay?.id
            };
            return res;
        }

    }

}