using SaleWebApi.Entities;
using System;

namespace SaleWebApi.Controllers.Resources
{
    public class PaymentPendingResource
    {
        public int id { get; set; }
        public string date { get; set; }
        public decimal amount { get; set; }
        public WaytopayResource waytopay { get; set; }

        public static PaymentPendingResource ToResource(PaymentPending obj)
        {
            if (obj == null) return null;
            var res = new PaymentPendingResource
            {
                id = obj.id,
                date = obj.date?.ToString("yyyy-MM-dd"),
                amount = obj.amount,
                waytopay = WaytopayResource.ToResource(obj.Waytopay),
            };
            return res;
        }

        public static PaymentPending ToEntity(PaymentPendingResource obj)
        {
            if (obj == null) return null;
            var res = new PaymentPending
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