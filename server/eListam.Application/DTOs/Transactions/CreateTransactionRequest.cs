using eListam.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace eListam.Application.DTOs.Transactions
{
    public class  CreateTransactionRequest
    {
        public string TransactionNumber { get; set; } = string.Empty;
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
        public double TotalQuantity { get; set; }
        public bool IsCompleted { get; set; }
        public int PaymentMethodId { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public List<CreateTransactionDetailRequest> TransactionDetails { get; set; } = [];
    }

    public class CreateTransactionDetailRequest
    {
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
