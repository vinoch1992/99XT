using System;
namespace AccountBalanceAPI.AppSettings
{
    public static class ConstantStrings
    {
        #region Application Settings
        public static string DBCONNECTIONURL = Environment.GetEnvironmentVariable("DBCONNECTIONURL");
        //public static string DBCONNECTIONURL = "Server=tcp:accountbalance.database.windows.net,1433;Initial Catalog=AccountBalance;Persist Security Info=False;User ID=vinoch;Password=pass#word1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        #endregion
    }
}