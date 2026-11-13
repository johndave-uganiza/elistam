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
        public decimal TotalPrice { get; set; }
        public decimal TotalQuantity { get; set; }
        public bool IsCompleted { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public List<CreateTransactionDetailRequest> TransactionDetails { get; set; } = [];
    }

    public class CreateTransactionDetailRequest
    {
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
