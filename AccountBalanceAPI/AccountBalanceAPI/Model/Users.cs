using System;
using System.ComponentModel.DataAnnotations;

namespace AccountBalanceAPI.Model
{
    public class Users
    {
        [Key]
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}