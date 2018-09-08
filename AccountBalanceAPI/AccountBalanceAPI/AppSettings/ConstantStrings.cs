using System;
namespace AccountBalanceAPI.AppSettings
{
    public static class ConstantStrings
    {
        #region Application Settings
        public static string DBCONNECTIONURL = Environment.GetEnvironmentVariable("DBCONNECTIONURL");
        #endregion
    }
}