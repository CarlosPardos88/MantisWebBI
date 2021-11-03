using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using Teradata.Client.Provider;

namespace BIDAL
{
    public class NumeralCambiarioDAL
    {
        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instancia = ConfigurationManager.AppSettings["InstanciaView"].ToString();

        public List<NumeralCambiario> Get_NumeralCambiarioDAL()
        {
            List<NumeralCambiario> list = new List<NumeralCambiario>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select * from " + @instancia + ".V_D_RCNumeralCambiario ORDER BY Desc_NumeralCambiario ";
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {

                                    list.Add(new NumeralCambiario()
                                    {
                                        Sk_RCNumeralCambiario = int.Parse(oReader["Sk_RCNumeralCambiario"].ToString()),
                                        Desc_NumeralCambiario = oReader["Desc_NumeralCambiario"].ToString(),
                                   
                                    });
                                }
                                oReader.Close();
                            }
                            oReader.Dispose();
                        }
                    }
                    oSqlConnection.Close();
                }
                catch (SqlException ex)
                {
                    throw ex;
                }
                catch (IndexOutOfRangeException ex)
                {
                    throw ex;
                }
                catch (TdException ex)
                {
                    throw ex;
                }
                catch (FormatException ex)
                {
                    throw ex;
                }
            }
            return list;
        }
    }
}
