using EntitiesTD;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using Teradata.Client.Provider;

namespace BIDAL
{
    public class ProcesoDAL
    {
        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instacia = ConfigurationManager.AppSettings["InstaciaGestor"].ToString();

        public List<Proceso> GetProcesos(string rangoincial, string rangofinal)
        {
            List<Proceso> list = new List<Proceso>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                oSqlConnection.Open();
                using (TdCommand oSqlCmd = new TdCommand())
                {
                    oSqlCmd.Parameters.Clear();
                    oSqlCmd.CommandText = "Select * from " + @instacia + ".Proceso where ProcesoCD between ? and ?;";
                    oSqlCmd.CommandType = CommandType.Text;
                    oSqlCmd.CommandTimeout = 30;
                    oSqlCmd.Connection = oSqlConnection;

                    TdParameter rangoincialP = oSqlCmd.CreateParameter();
                    rangoincialP.DbType = DbType.String;
                    rangoincialP.Direction = ParameterDirection.Input;
                    oSqlCmd.Parameters.Add(rangoincialP);
                    rangoincialP.Value = rangoincial;

                    TdParameter rangofinalP = oSqlCmd.CreateParameter();
                    rangofinalP.DbType = DbType.String;
                    rangofinalP.Direction = ParameterDirection.Input;
                    oSqlCmd.Parameters.Add(rangofinalP);
                    rangofinalP.Value = rangofinal;

                    oSqlCmd.Prepare();

                    TdDataReader oReader = oSqlCmd.ExecuteReader();
                    if (oReader != null)
                    {
                        if (oReader.HasRows)
                        {
                            while (oReader.Read())
                            {
                                list.Add(new Proceso()
                                {
                                    ProcesoCD = oReader["ProcesoCD"].ToString(),
                                    NombreProceso = oReader["NombreProceso"].ToString(),
                                    IndReinyeccion = oReader["IndReinyeccion"].ToString(),
                                    indEjecuta = oReader["indEjecuta"].ToString(),
                                    ProcesoDesc = oReader["ProcesoDesc"].ToString(),
                                    Version = oReader["Version"].ToString(),
                                    FechaUltModificacion = oReader["FechaUltModificacion"].ToString(),
                                    EspecificadoPor = oReader["EspecificadoPor"].ToString(),
                                    VistaTransformacionCD = oReader["VistaTransformacionCD"].ToString(),
                                    IndActivo = oReader["IndActivo"].ToString(),
                                    LayoutOrigenCD = int.Parse(oReader["LayoutOrigenCD"].ToString())
                                });
                            }
                            oReader.Close();
                        }
                        oReader.Dispose();
                    }
                }
                oSqlConnection.Close();
            }
            return list;
        }

       

    }
}
