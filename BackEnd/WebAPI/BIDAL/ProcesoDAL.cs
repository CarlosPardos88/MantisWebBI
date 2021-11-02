using EntitiesTD;
using System.Collections.Generic;
using System.Configuration;
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
                    oSqlCmd.CommandText = "Select * from " + @instacia + ".Proceso where ProcesoCD between "+ "'" + rangoincial + "'" + " and " + "'" +rangofinal+"'"; // TODO ajustar a Tp_Parametros
                    oSqlCmd.CommandTimeout = 30;
                    oSqlCmd.Connection = oSqlConnection;

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
