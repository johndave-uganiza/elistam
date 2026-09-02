using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace eListam.Application.DTOs.Transactions
{
    public class CreateTransactionRequest
    {
        [Required]
        public int OrderId { get; set; }
        public bool IsCompleted { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;
    }
}
