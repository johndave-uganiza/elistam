using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Domain.Constants
{
    public enum PaymentMethod
    {
        Cash,
        Stripe,
        PayLater
    }

    public static class PaymentMethodExtensions
    {
        public static string GetPaymentMethod(this PaymentMethod method)
        {
            return method switch
            {
                PaymentMethod.Cash => "Cash",
                PaymentMethod.Stripe => "Stripe",
                PaymentMethod.PayLater => "PayLater",
                _ => throw new ArgumentOutOfRangeException(nameof(method))
            };

        }
    }
}
