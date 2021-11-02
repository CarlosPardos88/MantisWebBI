using EntitiesTD;
using System.Collections.Generic;
using System.Configuration;
using Teradata.Client.Provider;
using System.Data.SqlClient;
using System.Windows;
using System;

namespace BIDAL
{
    public class Tp_ParametroDAL
    {

        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instacia = ConfigurationManager.AppSettings["InstaciaData"].ToString();
        private static readonly string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;

        public List<Tp_Parametros> GetTp_Parametros()
        {
            List<Tp_Parametros> list = new List<Tp_Parametros>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                oSqlConnection.Open();
                using (TdCommand oSqlCmd = new TdCommand())
                {
                    oSqlCmd.Parameters.Clear();
                    oSqlCmd.CommandText = "Select * from " + @instacia + ".Tp_Parametros"; // TODO ajustar a Tp_Parametros
                    oSqlCmd.CommandTimeout = 30;
                    oSqlCmd.Connection = oSqlConnection;

                    TdDataReader oReader = oSqlCmd.ExecuteReader();
                    if (oReader != null)
                    {
                        if (oReader.HasRows)
                        {

                            while (oReader.Read())
                            {
                                list.Add(new Tp_Parametros()
                                {
                                    Id_Parametro = int.Parse(oReader["Id_Parametro"].ToString()),
                                    NombreGrupoParametro = oReader["NombreGrupoParametro"].ToString(),
                                    NombreParametro = oReader["NombreParametro"].ToString(),
                                    DescripcionParametro = oReader["DescripcionParametro"].ToString(),
                                    ValorParametro = oReader["ValorParametro"].ToString(),
                                    FechaCreacion = oReader["FechaCreacion"].ToString(),
                                    FechaModificacion = oReader["FechaModificacion"].ToString()
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
        public List<Tp_Parametros> GetTp_ParametrosByArea(string area)
        {
            List<Tp_Parametros> list = new List<Tp_Parametros>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                oSqlConnection.Open();
                using (TdCommand oSqlCmd = new TdCommand())
                {
                    oSqlCmd.Parameters.Clear();
                    oSqlCmd.CommandText = "Select * from " + @instacia + ".Tp_Parametros where NombreGrupoParametro = " + "'" + area + "'"; // TODO ajustar a Tp_Parametros
                    oSqlCmd.CommandTimeout = 30;
                    oSqlCmd.Connection = oSqlConnection;

                    TdDataReader oReader = oSqlCmd.ExecuteReader();
                    if (oReader != null)
                    {
                        if (oReader.HasRows)
                        {

                            while (oReader.Read())
                            {
                                list.Add(new Tp_Parametros()
                                {
                                    Id_Parametro = int.Parse(oReader["Id_Parametro"].ToString()),
                                    NombreGrupoParametro = oReader["NombreGrupoParametro"].ToString(),
                                    NombreParametro = oReader["NombreParametro"].ToString(),
                                    DescripcionParametro = oReader["DescripcionParametro"].ToString(),
                                    ValorParametro = oReader["ValorParametro"].ToString(),
                                    FechaCreacion = oReader["FechaCreacion"].ToString(),
                                    FechaModificacion = oReader["FechaModificacion"].ToString()
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


        public Tp_Parametros GetTp_Parametro(int id)
        {
            Tp_Parametros result = new Tp_Parametros();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                oSqlConnection.Open();
                using (TdCommand oSqlCmd = new TdCommand())
                {
                    oSqlCmd.Parameters.Clear();
                    oSqlCmd.CommandText = "Select * from " + @instacia + ".Tp_Parametros where id_Parametro = " + id; // TODO ajustar a Tp_Parametros
                    oSqlCmd.CommandTimeout = 30;
                    oSqlCmd.Connection = oSqlConnection;

                    TdDataReader oReader = oSqlCmd.ExecuteReader();
                    if (oReader != null)
                    {
                        if (oReader.HasRows)
                        {

                            while (oReader.Read())
                            {
                                result = new Tp_Parametros()
                                {
                                    Id_Parametro = int.Parse(oReader["Id_Parametro"].ToString()),
                                    NombreGrupoParametro = oReader["NombreGrupoParametro"].ToString(),
                                    NombreParametro = oReader["NombreParametro"].ToString(),
                                    DescripcionParametro = oReader["DescripcionParametro"].ToString(),
                                    ValorParametro = oReader["ValorParametro"].ToString(),
                                    FechaCreacion = oReader["FechaCreacion"].ToString(),
                                    FechaModificacion = oReader["FechaModificacion"].ToString()
                                };
                            }
                            oReader.Close();
                        }
                        oReader.Dispose();
                    }
                }
                oSqlConnection.Close();
            }
            return result;
        }

      
        public int PostTp_Parametro(Tp_Parametros parametro)
        {
            var result =0;
                    
            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                oSqlConnection.Open();
                using (TdCommand oSqlCmd = new TdCommand())
                {
                   
                    oSqlCmd.Parameters.Clear();
                    oSqlCmd.CommandText = "INSERT	INTO " + instacia + ".TP_Parametros " +
                                        "(Id_Parametro, NombreGrupoParametro, NombreParametro, ValorParametro, " +
                                        "DescripcionParametro, FechaCreacion) " +
                                        "  VALUES " +
                                        " ((SEL MAX(id_Parametro) + 1 FROM " + instacia + ".TP_Parametros), '" +parametro.NombreGrupoParametro + "', '"+parametro.NombreParametro+"', '"+parametro.ValorParametro+"', '"+parametro.DescripcionParametro+"', CURRENT_TIMESTAMP(3)); "; // TODO ajustar a Tp_Parametros
                                   
                    oSqlCmd.CommandTimeout = 30;
                    oSqlCmd.Connection = oSqlConnection;

                    TdDataReader oReader = oSqlCmd.ExecuteReader();

                    if (oReader != null)
                    {
                        if (oReader.HasRows)
                        {
                            result = 1;

                        }
                        oReader.Close();
                        using (SqlConnection connection = new SqlConnection(connectionString))
                        {

                            try
                            {
                                connection.Open();

                                SqlCommand command = new SqlCommand("Insert Into OPE_SolicitudEjecucionPorDemandaProceso" +
                                    "(FechaHora_FinVentanaSugerida" +
                                       ",FechaHora_EjecucionAprobada" +
                                       ",Id_Proceso" +
                                       ",FechaHora_InicioVentanaSugerida" +
                                       ",FechaHora_Sugerida" +
                                       ",FechaHora_RevisionUsuario" +
                                       " ,FechaHora_RevisionOperador)" +
                                       "Values (" +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT Id_proceso From OPE_Proceso p inner join OPE_AreaNegocio op on (op.Id_AreaNegocio= p.Id_AreaNegocio " +
                                       "and op.Nombre_AreaNegocio ='" + parametro.NombreGrupoParametro + "') where Nombre_Proceso LIKE '%tp_parametros_descarga%')," +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT DATEADD(minute,2,Getdate()))" +
                                       ")", connection);

                                var reader = command.ExecuteNonQuery();
                                command.Dispose();
                            } catch (Exception)
                            {
                                result = -1;
                               /* oSqlCmd.Parameters.Clear();
                                oSqlCmd.CommandText = "delete  from " + @instacia + ".Tp_Parametros_BI where NombreGrupoParametro = " + parametro.NombreGrupoParametro + " and NombreParametro=" + parametro.NombreParametro; // TODO ajustar a Tp_Parametros
                                oSqlCmd.CommandTimeout = 30;
                                oSqlCmd.Connection = oSqlConnection;*/

                            }
                           
                            connection.Close();
                        }
                            }
                    oReader.Dispose();
                }
                oSqlConnection.Close();
            }
            

            return result;
        }

        public int PutTp_Parametro(Tp_Parametros parametro)
        {
            var result = 0;

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                oSqlConnection.Open();
                using (TdCommand oSqlCmd = new TdCommand())
                {
                    oSqlCmd.Parameters.Clear();
                    oSqlCmd.CommandText = "UPDATE " + instacia + ".TP_Parametros " + // TODO ajustar a Tp_Parametros
                                            "SET ValorParametro = '" + parametro.ValorParametro +"'" + 
                                            ",DescripcionParametro = '" + parametro.DescripcionParametro + "'" +
                                            ",FechaModificacion = CURRENT_TIMESTAMP(3) " +
                                            "WHERE Id_Parametro = " + parametro.Id_Parametro;
  
                    oSqlCmd.CommandTimeout = 30;
                    oSqlCmd.Connection = oSqlConnection;

                    TdDataReader oReader = oSqlCmd.ExecuteReader();

                    if (oReader != null)
                    {
                        if (oReader.HasRows)
                        {
                            result = 1;

                        }
                        oReader.Close();
                        using (SqlConnection connection = new SqlConnection(connectionString))
                        {
                            try
                            {
                                connection.Open();

                                SqlCommand command = new SqlCommand("Insert Into OPE_SolicitudEjecucionPorDemandaProceso" +
                                    "(FechaHora_FinVentanaSugerida" +
                                       ",FechaHora_EjecucionAprobada" +
                                       ",Id_Proceso" +
                                       ",FechaHora_InicioVentanaSugerida" +
                                       ",FechaHora_Sugerida" +
                                       ",FechaHora_RevisionUsuario" +
                                       " ,FechaHora_RevisionOperador)" +
                                       "Values (" +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT Id_proceso From OPE_Proceso p inner join OPE_AreaNegocio op on (op.Id_AreaNegocio= p.Id_AreaNegocio " +
                                       "and op.Nombre_AreaNegocio ='" + parametro.NombreGrupoParametro + "') where Nombre_Proceso LIKE '%tp_parametros_descarga%')," +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT DATEADD(minute,2,Getdate()))," +
                                       "(SELECT DATEADD(minute,2,Getdate()))" +
                                       ")", connection);

                                var reader = command.ExecuteNonQuery();
                                command.Dispose();

                            }
                            catch (Exception)
                            {

                                result = -1;

                                /*  oSqlCmd.Parameters.Clear();
                                  oSqlCmd.CommandText = "delete  from " + @instacia + ".Tp_Parametros_BI where NombreGrupoParametro = " + parametro.NombreGrupoParametro + " and NombreParametro=" + parametro.NombreParametro; // TODO ajustar a Tp_Parametros
                                  oSqlCmd.CommandTimeout = 30;
                                  oSqlCmd.Connection = oSqlConnection;*/

                            }

                            connection.Dispose();
                            connection.Close();

                        }
                        
                    }
                    oReader.Dispose();
                }
                oSqlConnection.Close();
            }


            return result;
        }

    }
}
