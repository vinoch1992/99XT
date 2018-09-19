using System;
using System.Collections.Generic;
using System.Linq;
using AccountBalanceAPI.DBConnection;
using AccountBalanceAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace AccountBalanceAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/GetCurrentBalance
        [HttpGet]
        public AccountBalance GetCurrentBalance()
        {
            AccountBalance accountBalance = new AccountBalance();
            using (var db = new AccountBalanceContext())
            {
                accountBalance.BalanceCanteen = db.AccountBalance.Sum(s => s.BalanceCanteen);
                accountBalance.BalanceMarketing = db.AccountBalance.Sum(s => s.BalanceMarketing);
                accountBalance.BalanceCEOCar = db.AccountBalance.Sum(s => s.BalanceCEOCar);
                accountBalance.BalanceRAD = db.AccountBalance.Sum(s => s.BalanceRAD);
                accountBalance.BalanceParkingFines = db.AccountBalance.Sum(s => s.BalanceParkingFines);
                accountBalance.BalanceID = db.AccountBalance.Select(s => s.BalanceID).LastOrDefault();
                accountBalance.BalanceDate = db.AccountBalance.Select(s => s.BalanceDate).LastOrDefault();
            }

            return accountBalance;
        }

        // GET api/GetBalancePeriodWise
        [HttpGet("{startdate}/{enddate}")]
        public List<AccountBalance> GetBalancePeriodWise(DateTime startDate, DateTime endDate)
        {
            List<AccountBalance> accountBalance;
            using (var db = new AccountBalanceContext())
            {
                accountBalance = db.AccountBalance.Where(a => a.BalanceDate >= startDate & a.BalanceDate <= endDate).ToList();
            }

            return accountBalance;
        }

        // POST api/values
        [HttpPost]
        public void UploadBalance(AccountBalance accountBalance)
        {
            using (var db = new AccountBalanceContext())
            {
                accountBalance.BalanceDate = DateTime.Now;
                db.AccountBalance.Add(accountBalance);
                db.SaveChanges();
            }
        }

        // POST api/values
        [HttpPost]
        public Users ValidateUser(Users user)
        {
            using (var db = new AccountBalanceContext())
            {
                Users user_actual = db.Users.FirstOrDefault(u => u.Username == user.Username & u.Password == user.Password);
                if (user_actual != null)
                    user_actual.Password = string.Empty;
                return user_actual;
            }
        }
    }
}