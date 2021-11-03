using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teradata.Client.Provider;

namespace BIDAL
{
    public class RC_FuenteAgregacionNumeralesDAL
    {
        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instancia = ConfigurationManager.AppSettings["InstanciaView"].ToString();

        public List<RC_FuenteAgregacionNumerales> Get_RC_FuenteAgregacionNumeralesDAL()
        {
            List<RC_FuenteAgregacionNumerales> list = new List<RC_FuenteAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select * from " + @instancia + ".V_RC_FuenteAgregacionNumerales ORDER BY Desc_Fuente ASC";
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {
                                    RC_FuenteAgregacionNumerales item = new RC_FuenteAgregacionNumerales();

                                    
                                    item.Id_Fuente = int.Parse(oReader["Id_Fuente"].ToString());
                                    item.Desc_Fuente = oReader["Desc_Fuente"].ToString();
                                    item.Sk_Lote = int.Parse(oReader["Sk_Lote"].ToString());
                                    item.Sk_Lote_Upd = null;
                                    item.Cod_Severidad = int.Parse(oReader["Cod_Severidad"].ToString());


                                    list.Add(item);
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
