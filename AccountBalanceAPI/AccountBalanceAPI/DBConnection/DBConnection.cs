using AccountBalanceAPI.AppSettings;
using AccountBalanceAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace AccountBalanceAPI.DBConnection
{
    public class AccountBalanceContext : DbContext
    {
        public DbSet<AccountBalance> AccountBalance { get; set; }

        public DbSet<Users> Users { get; set; }

        private static readonly bool[] _migrated = { false };

        public AccountBalanceContext() : base(GetOptions(ConstantStrings.DBCONNECTIONURL))
        {
            if (!_migrated[0])
                lock (_migrated)
                    if (!_migrated[0])
                    {
                        Database.Migrate(); // apply all migrations
                        _migrated[0] = true;
                    }
        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConstantStrings.DBCONNECTIONURL);
        }
    }
}