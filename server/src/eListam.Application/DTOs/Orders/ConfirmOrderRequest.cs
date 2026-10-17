using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.DTOs.Orders
{
    public class ConfirmOrderRequest
    {
        public string PaymentMethod { get; set; } = string.Empty;
    }
}
