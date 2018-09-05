using AccountBalanceAPI.AppSettings;
using AccountBalanceAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace AccountBalanceAPI.DBConnection
{
    public class AccountBalanceContext : DbContext
    {
        public DbSet<AccountBalance> AccountBalance { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConstantStrings.DBCONNECTIONURL);
        }
    }
}