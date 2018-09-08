using System;
using System.ComponentModel.DataAnnotations;

namespace AccountBalanceAPI.Model
{
    public class AccountBalance
    {
        [Key]
        public int BalanceID { get; set; }
        public DateTime BalanceDate { get; set; }
        public decimal BalanceRAD { get; set; }
        public decimal BalanceCanteen { get; set; }
        public decimal BalanceCEOCar { get; set; }
        public decimal BalanceMarketing { get; set; }
        public decimal BalanceParkingFines { get; set; }
    }
}