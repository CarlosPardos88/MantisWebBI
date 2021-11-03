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
    public class RC_PeriodicidadAgregacionNumeralesDAL
    {

        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instancia = ConfigurationManager.AppSettings["InstanciaView"].ToString();

        public List<RC_PeriodicidadAgregacionNumerales> Get_RC_PeriodicidadAgregacionNumeralesDAL(int id_fuente)
        {
            List<RC_PeriodicidadAgregacionNumerales> list = new List<RC_PeriodicidadAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        if (id_fuente == 1)
                        {
                            oSqlCmd.CommandText = "Select * from " + @instancia + ".V_RC_PeriodicidadAgregacionNumerales order by Desc_Periodicidad ";
                        }
                        else
                        {
                            oSqlCmd.CommandText = "Select * from " + @instancia + ".V_RC_PeriodicidadAgregacionNumerales where Id_Periodicidad >2 order by Desc_Periodicidad ";
                        }
                        
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {
                                    RC_PeriodicidadAgregacionNumerales item = new RC_PeriodicidadAgregacionNumerales();


                                    item.Id_Periodicidad = int.Parse(oReader["Id_Periodicidad"].ToString());
                                    item.Desc_Periodicidad = oReader["Desc_Periodicidad"].ToString();
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
