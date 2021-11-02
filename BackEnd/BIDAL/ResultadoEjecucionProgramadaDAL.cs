using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Windows;

namespace BIDAL
{
    public class ResultadoEjecucionProgramadaDAL
    {
        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramadabyarea(string Fecha_incio, string Fecha_fin, string area)
        {
            List<ResultadoEjecucionProgramada> list = new List<ResultadoEjecucionProgramada>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("SELECT NULL AS Id_ProgramacionPeriodica,                                                                                                            " +
"	RE.Id_AprobacionProgramacionPeriodica,RE.Id_SolicitudEjecucionPorDemanda, P.Id_Proceso,                                                          " +
"	p.Nombre_Proceso,                                                                                                                                " +
"	NULL AS Hora_Ejecucion,                                                                                                                          " +
"	AN.Id_AreaNegocio, AN.Nombre_AreaNegocio, AN.Nombre_CarpetaWorkflows,                                                                            " +
"	CAST(FORMAT (RE.FechaHora_InicioEjecucion, 'yyyy-MM-dd HH:mm:ss ') AS VARCHAR(30)) AS FechaHora_InicioEjecucion,                                 " +
"	RE.FechaHora_FinEjecucion, RE.Id_EstadoEjecucionInformatica, EP.Nombre_EstadoEjecucion AS Nombre_EstadoEjecucionInformatica,                     " +
"	RE.Id_EstadoOperadorEjecucionProceso, EP2.Nombre_EstadoEjecucion AS Nombre_EstadoOperadorEjecucionProceso,                                       " +
"	RE.Id_EstadoUsuarioEjecucionProceso, EP3.Nombre_EstadoEjecucion AS Nombre_EstadoEjecucion, RE.Id_ResultadoEjecucionProgramada,                   " +
"	(CASE WHEN RE.FechaHora_InicioEjecucion IS NOT NULL AND Id_EstadoEjecucionInformatica != 3 THEN 'S' ELSE 'N' END) AS Cb_ProcesoEjecutado,        " +
"	CASE WHEN Id_EstadoEjecucionInformatica = 3 THEN 'S' ELSE 'N' END AS Cb_Vencido                                                                  " +
"FROM OPE_ResultadoEjecucionProgramada AS RE                                                                                                         " +
"                                                                                                                                                    " +
"JOIN OPE_Proceso AS P                                                                                                                               " +
"	ON(P.Id_Proceso = RE.Id_Proceso)                                                                                                                 " +
"JOIN OPE_AreaNegocio AS AN                                                                                                                          " +
"	ON(p.Id_AreaNegocio = AN.Id_AreaNegocio)                                                                                                         " +
"JOIN OPE_EstadoEjecucionProceso EP                                                                                                                  " +
"	ON(Re.Id_EstadoEjecucionInformatica = EP.Id_EstadoEjecucion)                                                                                     " +
"LEFT JOIN OPE_EstadoEjecucionProceso EP2                                                                                                            " +
"	ON(Re.Id_EstadoOperadorEjecucionProceso = EP2.Id_EstadoEjecucion)                                                                                " +
"LEFT JOIN OPE_EstadoEjecucionProceso EP3                                                                                                            " +
"	ON(Re.Id_EstadoUsuarioEjecucionProceso = EP3.Id_EstadoEjecucion)                                                                                 " +
"WHERE CAST(RE.FechaHora_InicioEjecucion AS DATE) BETWEEN @Fecha_inicioT AND @Fecha_Fint                                                             " +
"	AND AN.Nombre_AreaNegocio=@Area " +
"UNION                                                                                                                                               " +
"SELECT TOP(1000)Id_ProgramacionPeriodica, Id_AprobacionProgramacionPeriodica, Id_SolicitudEjecucionPorDemanda,                                      " +
"	Id_Proceso, Nombre_Proceso, Hora_EjecucionProgramada, Id_AreaNegocio, Nombre_AreaNegocio, Nombre_CarpetaWorkflows,                               " +
"	CAST(FORMAT (CONVERT(DATETIME,CONVERT(CHAR(8), Fecha, 112) + ' ' + CONVERT(CHAR(8), Hora_EjecucionProgramada, 108)) , 'yyyy-MM-dd HH:mm:ss ') AS VARCHAR(30)) AS Fecha, " +
"   FechaHora_FinEjecucion, Id_EstadoEjecucionInformatica, Nombre_EstadoEjecucionInformatica,    " +
"	 Id_EstadoOperadorEjecucionProceso, Nombre_EstadoOperadorEjecucionProceso, Id_EstadoUsuarioEjecucionProceso, Nombre_EstadoUsuarioEjecucionProceso," +
"	 Id_ResultadoEjecucionProgramada, Cb_ProcesoEjecutado , Cb_Vencido                                                                               " +
"FROM C_ProcesoProgramado                                                                                                                            " +
"WHERE ( " +
"        Fecha > CONVERT(date, GETDATE()) " +
"       OR(Fecha = CONVERT(date, GETDATE())  AND  Hora_EjecucionProgramada > CONVERT(TIME, GETDATE())) " +
"    ) " +
"    AND CAST(Fecha AS DATE) BETWEEN @Fecha_inicioT AND @Fecha_Fint " +
"    AND Id_EstadoEjecucionInformatica IS NULL " +
"    AND Cb_Vencido = 'N' AND Nombre_AreaNegocio=@Area AND (Cb_Activo IS NULL OR Cb_Activo = 'S') "
                        , connection);
                   
                    SqlParameter Fecha_iniciot = new SqlParameter("@Fecha_iniciot", SqlDbType.VarChar)
                    {
                        Value = Fecha_incio

                    };

                    SqlParameter Fecha_fint = new SqlParameter("@Fecha_fint", SqlDbType.Int)
                    {
                        Value = Fecha_fin
                    };

                      SqlParameter Area = new SqlParameter("@Area", SqlDbType.Int)
                    {
                        Value = area
                    };

                    command.Parameters.AddWithValue("@Fecha_iniciot", Fecha_incio);
                    command.Parameters.AddWithValue("@Fecha_fint", Fecha_fin);
                    command.Parameters.AddWithValue("@Area", area);

                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            list.Add(new ResultadoEjecucionProgramada()
                            {
                                Id_ProgramacionPeriodica = reader["Id_ProgramacionPeriodica"].ToString(),
                                Id_AprobacionProgramacionPeriodica = reader["Id_AprobacionProgramacionPeriodica"].ToString(),
                                Id_SolicitudEjecucionPorDemanda = reader["Id_SolicitudEjecucionPorDemanda"].ToString(),
                                Id_Proceso = reader["Id_Proceso"].ToString(),
                                Nombre_Proceso = reader["Nombre_Proceso"].ToString(),
                              Hora_EjecucionProgramada = reader["Hora_Ejecucion"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Nombre_CarpetaWorkflows = reader["Nombre_CarpetaWorkflows"].ToString(),
                                FechaHora_InicioEjecucion = reader["FechaHora_InicioEjecucion"].ToString(),
                                FechaHora_FinEjecucion = reader["FechaHora_FinEjecucion"].ToString(),
                                Id_EstadoEjecucionInformatica = reader["Id_EstadoEjecucionInformatica"].ToString(),
                                Nombre_EstadoEjecucionInformatica = reader["Nombre_EstadoEjecucionInformatica"].ToString(),
                                Id_EstadoOperadorEjecucionProceso = reader["Id_EstadoOperadorEjecucionProceso"].ToString(),
                                Nombre_EstadoOperadorEjecucionProceso = reader["Nombre_EstadoOperadorEjecucionProceso"].ToString(),
                                Id_EstadoUsuarioEjecucionProceso = reader["Id_EstadoUsuarioEjecucionProceso"].ToString(),
                                Nombre_EstadoUsuarioEjecucionProceso = reader["Nombre_EstadoEjecucion"].ToString(),
                                Id_ResultadoEjecucionProgramada = reader["Id_ResultadoEjecucionProgramada"].ToString(),
                                Cb_ProcesoEjecutado= reader["Cb_ProcesoEjecutado"].ToString(),
                                Cb_Vencido = reader["Cb_Vencido"].ToString()
                            });

                        }
                    }


                  

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {
                        
                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }

        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramada(string Fecha_incio, string Fecha_fin)
        {
            List<ResultadoEjecucionProgramada> list = new List<ResultadoEjecucionProgramada>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("SELECT NULL AS Id_ProgramacionPeriodica,                                                                                                            " +
"	RE.Id_AprobacionProgramacionPeriodica,RE.Id_SolicitudEjecucionPorDemanda, P.Id_Proceso,                                                          " +
"	p.Nombre_Proceso,                                                                                                                                " +
"	NULL AS Hora_Ejecucion,                                                                                                                          " +
"	AN.Id_AreaNegocio, AN.Nombre_AreaNegocio, AN.Nombre_CarpetaWorkflows,                                                                            " +
"	CAST(FORMAT (RE.FechaHora_InicioEjecucion, 'yyyy-MM-dd HH:mm:ss ') AS VARCHAR(30)) AS FechaHora_InicioEjecucion,                                 " +
"	RE.FechaHora_FinEjecucion, RE.Id_EstadoEjecucionInformatica, EP.Nombre_EstadoEjecucion AS Nombre_EstadoEjecucionInformatica,                     " +
"	RE.Id_EstadoOperadorEjecucionProceso, EP2.Nombre_EstadoEjecucion AS Nombre_EstadoOperadorEjecucionProceso,                                       " +
"	RE.Id_EstadoUsuarioEjecucionProceso, EP3.Nombre_EstadoEjecucion AS Nombre_EstadoEjecucion, RE.Id_ResultadoEjecucionProgramada,                   " +
"	(CASE WHEN RE.FechaHora_InicioEjecucion IS NOT NULL AND Id_EstadoEjecucionInformatica != 3 THEN 'S' ELSE 'N' END) AS Cb_ProcesoEjecutado,        " +
"	CASE WHEN Id_EstadoEjecucionInformatica = 3 THEN 'S' ELSE 'N' END AS Cb_Vencido                                                                  " +
"FROM OPE_ResultadoEjecucionProgramada AS RE                                                                                                         " +
"                                                                                                                                                    " +
"JOIN OPE_Proceso AS P                                                                                                                               " +
"	ON(P.Id_Proceso = RE.Id_Proceso)                                                                                                                 " +
"JOIN OPE_AreaNegocio AS AN                                                                                                                          " +
"	ON(p.Id_AreaNegocio = AN.Id_AreaNegocio)                                                                                                         " +
"JOIN OPE_EstadoEjecucionProceso EP                                                                                                                  " +
"	ON(Re.Id_EstadoEjecucionInformatica = EP.Id_EstadoEjecucion)                                                                                     " +
"LEFT JOIN OPE_EstadoEjecucionProceso EP2                                                                                                            " +
"	ON(Re.Id_EstadoOperadorEjecucionProceso = EP2.Id_EstadoEjecucion)                                                                                " +
"LEFT JOIN OPE_EstadoEjecucionProceso EP3                                                                                                            " +
"	ON(Re.Id_EstadoUsuarioEjecucionProceso = EP3.Id_EstadoEjecucion)                                                                                 " +
"WHERE CAST(RE.FechaHora_InicioEjecucion AS DATE) BETWEEN @Fecha_inicioT AND @Fecha_Fint                                                             " +
"UNION                                                                                                                                               " +
"SELECT TOP(1000)Id_ProgramacionPeriodica, Id_AprobacionProgramacionPeriodica, Id_SolicitudEjecucionPorDemanda,                                      " +
"	Id_Proceso, Nombre_Proceso, Hora_EjecucionProgramada, Id_AreaNegocio, Nombre_AreaNegocio, Nombre_CarpetaWorkflows,                               " +
"	CAST(FORMAT (CONVERT(DATETIME,CONVERT(CHAR(8), Fecha, 112) + ' ' + CONVERT(CHAR(8), Hora_EjecucionProgramada, 108)) , 'yyyy-MM-dd HH:mm:ss ') AS VARCHAR(30)) AS Fecha, " +
"   FechaHora_FinEjecucion, Id_EstadoEjecucionInformatica, Nombre_EstadoEjecucionInformatica,    " +
"	Id_EstadoOperadorEjecucionProceso, Nombre_EstadoOperadorEjecucionProceso, Id_EstadoUsuarioEjecucionProceso, Nombre_EstadoUsuarioEjecucionProceso," +
"	Id_ResultadoEjecucionProgramada, Cb_ProcesoEjecutado , Cb_Vencido                                                                               " +
"FROM C_ProcesoProgramado                                                                                                                            " +
"WHERE ( " +
"        Fecha > CONVERT(date, GETDATE()) " +
"       OR(Fecha = CONVERT(date, GETDATE())  AND  Hora_EjecucionProgramada > CONVERT(TIME, GETDATE())) " +
"    ) " +
"    AND CAST(Fecha AS DATE) BETWEEN @Fecha_inicioT AND @Fecha_Fint " +
"    AND Cb_Vencido = 'N' " +
"    AND Id_EstadoEjecucionInformatica IS NULL AND (Cb_Activo IS NULL OR Cb_Activo = 'S') ", connection);

                    SqlParameter Fecha_iniciot = new SqlParameter("@Fecha_iniciot", SqlDbType.VarChar)
                    {
                        Value = Fecha_incio

                    };

                    SqlParameter Fecha_fint = new SqlParameter("@Fecha_fint", SqlDbType.Int)
                    {
                        Value = Fecha_fin
                    };

                    command.Parameters.AddWithValue("@Fecha_iniciot", Fecha_incio);
                    command.Parameters.AddWithValue("@Fecha_fint", Fecha_fin);

                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            list.Add(new ResultadoEjecucionProgramada()
                            {
                                Id_ProgramacionPeriodica = reader["Id_ProgramacionPeriodica"].ToString(),
                                Id_AprobacionProgramacionPeriodica = reader["Id_AprobacionProgramacionPeriodica"].ToString(),
                                Id_SolicitudEjecucionPorDemanda = reader["Id_SolicitudEjecucionPorDemanda"].ToString(),
                                Id_Proceso = reader["Id_Proceso"].ToString(),
                                Nombre_Proceso = reader["Nombre_Proceso"].ToString(),
                                Hora_EjecucionProgramada = reader["Hora_Ejecucion"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Nombre_CarpetaWorkflows = reader["Nombre_CarpetaWorkflows"].ToString(),
                                FechaHora_InicioEjecucion = reader["FechaHora_InicioEjecucion"].ToString(),
                                FechaHora_FinEjecucion = reader["FechaHora_FinEjecucion"].ToString(),
                                Id_EstadoEjecucionInformatica = reader["Id_EstadoEjecucionInformatica"].ToString(),
                                Nombre_EstadoEjecucionInformatica = reader["Nombre_EstadoEjecucionInformatica"].ToString(),
                                Id_EstadoOperadorEjecucionProceso = reader["Id_EstadoOperadorEjecucionProceso"].ToString(),
                                Nombre_EstadoOperadorEjecucionProceso = reader["Nombre_EstadoOperadorEjecucionProceso"].ToString(),
                                Id_EstadoUsuarioEjecucionProceso = reader["Id_EstadoUsuarioEjecucionProceso"].ToString(),
                                Nombre_EstadoUsuarioEjecucionProceso = reader["Nombre_EstadoEjecucion"].ToString(),
                                Id_ResultadoEjecucionProgramada = reader["Id_ResultadoEjecucionProgramada"].ToString(),
                                Cb_ProcesoEjecutado = reader["Cb_ProcesoEjecutado"].ToString(),
                                Cb_Vencido = reader["Cb_Vencido"].ToString()
                            });

                        }
                    }

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {
                        
                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }


        public List<ResultadoEjecucionProgramada> GetProcesosVencidos()
        {
            List<ResultadoEjecucionProgramada> list = new List<ResultadoEjecucionProgramada>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("SELECT NULL AS Id_ProgramacionPeriodica,                                                                                                            " +
                "	RE.Id_AprobacionProgramacionPeriodica,RE.Id_SolicitudEjecucionPorDemanda, P.Id_Proceso,                                                          " +
                "	p.Nombre_Proceso,                                                                                                                                " +
                "	NULL AS Hora_Ejecucion,                                                                                                                          " +
                "	AN.Id_AreaNegocio, AN.Nombre_AreaNegocio, AN.Nombre_CarpetaWorkflows,                                                                            " +
                "	CAST(FORMAT (RE.FechaHora_InicioEjecucion, 'yyyy-MM-dd HH:mm:ss ') AS VARCHAR(30)) AS FechaHora_InicioEjecucion,                                 " +
                "	RE.FechaHora_FinEjecucion, RE.Id_EstadoEjecucionInformatica, EP.Nombre_EstadoEjecucion AS Nombre_EstadoEjecucionInformatica,                     " +
                "	RE.Id_EstadoOperadorEjecucionProceso, EP2.Nombre_EstadoEjecucion AS Nombre_EstadoOperadorEjecucionProceso,                                       " +
                "	RE.Id_EstadoUsuarioEjecucionProceso, EP3.Nombre_EstadoEjecucion AS Nombre_EstadoEjecucion, RE.Id_ResultadoEjecucionProgramada,                   " +
                "	(CASE WHEN RE.FechaHora_InicioEjecucion IS NOT NULL AND Id_EstadoEjecucionInformatica != 3 THEN 'S' ELSE 'N' END) AS Cb_ProcesoEjecutado,        " +
                "	CASE WHEN Id_EstadoEjecucionInformatica = 3 THEN 'S' ELSE 'N' END AS Cb_Vencido                                                                  " +
                "FROM OPE_ResultadoEjecucionProgramada AS RE                                                                                                         " +
                "                                                                                                                                                    " +
                "JOIN OPE_Proceso AS P                                                                                                                               " +
                "	ON(P.Id_Proceso = RE.Id_Proceso)                                                                                                                 " +
                "JOIN OPE_AreaNegocio AS AN                                                                                                                          " +
                "	ON(p.Id_AreaNegocio = AN.Id_AreaNegocio)                                                                                                         " +
                "JOIN OPE_EstadoEjecucionProceso EP                                                                                                                  " +
                "	ON(Re.Id_EstadoEjecucionInformatica = EP.Id_EstadoEjecucion)                                                                                     " +
                "LEFT JOIN OPE_EstadoEjecucionProceso EP2                                                                                                            " +
                "	ON(Re.Id_EstadoOperadorEjecucionProceso = EP2.Id_EstadoEjecucion)                                                                                " +
                "LEFT JOIN OPE_EstadoEjecucionProceso EP3                                                                                                            " +
                "	ON(Re.Id_EstadoUsuarioEjecucionProceso = EP3.Id_EstadoEjecucion)                                                                                 " +
                "WHERE CAST(RE.FechaHora_InicioEjecucion AS DATE) BETWEEN convert(date,getdate()) AND convert(date,getdate()) and Re.Id_EstadoEjecucionInformatica=3 ", connection);


                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            list.Add(new ResultadoEjecucionProgramada()
                            {
                                Id_ProgramacionPeriodica = reader["Id_ProgramacionPeriodica"].ToString(),
                                Id_AprobacionProgramacionPeriodica = reader["Id_AprobacionProgramacionPeriodica"].ToString(),
                                Id_SolicitudEjecucionPorDemanda = reader["Id_SolicitudEjecucionPorDemanda"].ToString(),
                                Id_Proceso = reader["Id_Proceso"].ToString(),
                                Nombre_Proceso = reader["Nombre_Proceso"].ToString(),
                                Hora_EjecucionProgramada = reader["Hora_Ejecucion"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Nombre_CarpetaWorkflows = reader["Nombre_CarpetaWorkflows"].ToString(),
                                FechaHora_InicioEjecucion = reader["FechaHora_InicioEjecucion"].ToString(),
                                FechaHora_FinEjecucion = reader["FechaHora_FinEjecucion"].ToString(),
                                Id_EstadoEjecucionInformatica = reader["Id_EstadoEjecucionInformatica"].ToString(),
                                Nombre_EstadoEjecucionInformatica = reader["Nombre_EstadoEjecucionInformatica"].ToString(),
                                Id_EstadoOperadorEjecucionProceso = reader["Id_EstadoOperadorEjecucionProceso"].ToString(),
                                Nombre_EstadoOperadorEjecucionProceso = reader["Nombre_EstadoOperadorEjecucionProceso"].ToString(),
                                Id_EstadoUsuarioEjecucionProceso = reader["Id_EstadoUsuarioEjecucionProceso"].ToString(),
                                Nombre_EstadoUsuarioEjecucionProceso = reader["Nombre_EstadoEjecucion"].ToString(),
                                Id_ResultadoEjecucionProgramada = reader["Id_ResultadoEjecucionProgramada"].ToString(),
                                Cb_ProcesoEjecutado = reader["Cb_ProcesoEjecutado"].ToString(),
                                Cb_Vencido = reader["Cb_Vencido"].ToString()
                            });

                        }
                    }

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {

                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }

        public List<ResultadoEjecucionProgramada> GetProcesosPorCertificar()
        {
            List<ResultadoEjecucionProgramada> list = new List<ResultadoEjecucionProgramada>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("select * from dbo.C_ProcesoProgramado "+
                    " where Fecha = convert(date, getdate()) and Id_EstadoEjecucionInformatica = 1 and Id_EstadoOperadorEjecucionProceso is null ", connection);


                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            list.Add(new ResultadoEjecucionProgramada()
                            {
                                Id_ProgramacionPeriodica = reader["Id_ProgramacionPeriodica"].ToString(),
                                Id_AprobacionProgramacionPeriodica = reader["Id_AprobacionProgramacionPeriodica"].ToString(),
                                Id_SolicitudEjecucionPorDemanda = reader["Id_SolicitudEjecucionPorDemanda"].ToString(),
                                Id_Proceso = reader["Id_Proceso"].ToString(),
                                Nombre_Proceso = reader["Nombre_Proceso"].ToString(),
                                Hora_EjecucionProgramada = reader["Hora_EjecucionProgramada"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Nombre_CarpetaWorkflows = reader["Nombre_CarpetaWorkflows"].ToString(),
                                FechaHora_InicioEjecucion = reader["FechaHora_InicioEjecucion"].ToString(),
                                FechaHora_FinEjecucion = reader["FechaHora_FinEjecucion"].ToString(),
                                Id_EstadoEjecucionInformatica = reader["Id_EstadoEjecucionInformatica"].ToString(),
                                Nombre_EstadoEjecucionInformatica = reader["Nombre_EstadoEjecucionInformatica"].ToString(),
                                Id_EstadoOperadorEjecucionProceso = reader["Id_EstadoOperadorEjecucionProceso"].ToString(),
                                Nombre_EstadoOperadorEjecucionProceso = reader["Nombre_EstadoOperadorEjecucionProceso"].ToString(),
                                Id_EstadoUsuarioEjecucionProceso = reader["Id_EstadoUsuarioEjecucionProceso"].ToString(),
                                Nombre_EstadoUsuarioEjecucionProceso = reader["Nombre_EstadoUsuarioEjecucionProceso"].ToString(),
                                Id_ResultadoEjecucionProgramada = reader["Id_ResultadoEjecucionProgramada"].ToString(),
                                Cb_ProcesoEjecutado = reader["Cb_ProcesoEjecutado"].ToString(),
                                Cb_Vencido = reader["Cb_Vencido"].ToString()
                            });

                        }
                    }

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {

                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }

        public List<ResultadoEjecucionProgramada> GetProcesosPorCertificarUsuario()
        {
            List<ResultadoEjecucionProgramada> list = new List<ResultadoEjecucionProgramada>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("select * from dbo.C_ProcesoProgramado " +
                    " where Fecha = convert(date, getdate()) and Id_EstadoEjecucionInformatica = 1 and Id_EstadoOperadorEjecucionProceso = 7 and Id_EstadoUsuarioEjecucionProceso is null", connection);


                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            list.Add(new ResultadoEjecucionProgramada()
                            {
                                Id_ProgramacionPeriodica = reader["Id_ProgramacionPeriodica"].ToString(),
                                Id_AprobacionProgramacionPeriodica = reader["Id_AprobacionProgramacionPeriodica"].ToString(),
                                Id_SolicitudEjecucionPorDemanda = reader["Id_SolicitudEjecucionPorDemanda"].ToString(),
                                Id_Proceso = reader["Id_Proceso"].ToString(),
                                Nombre_Proceso = reader["Nombre_Proceso"].ToString(),
                                Hora_EjecucionProgramada = reader["Hora_EjecucionProgramada"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Nombre_CarpetaWorkflows = reader["Nombre_CarpetaWorkflows"].ToString(),
                                FechaHora_InicioEjecucion = reader["FechaHora_InicioEjecucion"].ToString(),
                                FechaHora_FinEjecucion = reader["FechaHora_FinEjecucion"].ToString(),
                                Id_EstadoEjecucionInformatica = reader["Id_EstadoEjecucionInformatica"].ToString(),
                                Nombre_EstadoEjecucionInformatica = reader["Nombre_EstadoEjecucionInformatica"].ToString(),
                                Id_EstadoOperadorEjecucionProceso = reader["Id_EstadoOperadorEjecucionProceso"].ToString(),
                                Nombre_EstadoOperadorEjecucionProceso = reader["Nombre_EstadoOperadorEjecucionProceso"].ToString(),
                                Id_EstadoUsuarioEjecucionProceso = reader["Id_EstadoUsuarioEjecucionProceso"].ToString(),
                                Nombre_EstadoUsuarioEjecucionProceso = reader["Nombre_EstadoUsuarioEjecucionProceso"].ToString(),
                                Id_ResultadoEjecucionProgramada = reader["Id_ResultadoEjecucionProgramada"].ToString(),
                                Cb_ProcesoEjecutado = reader["Cb_ProcesoEjecutado"].ToString(),
                                Cb_Vencido = reader["Cb_Vencido"].ToString()
                            });

                        }
                    }

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {

                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }

        public List<ResultadoEjecucionProgramada> GetProcesosPorAprobar()
        {
            List<ResultadoEjecucionProgramada> list = new List<ResultadoEjecucionProgramada>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("select c.* from dbo.C_ProcesoProgramado c "+
                                                        " where Fecha = convert(date, getdate()) and Cb_ProgramacionAprobada = 'N' "+
                                                        " and Cb_Vencido = 'N' and Cb_Activo = 'S' and  datediff(Minute, GETDATE(), cast(fecha as datetime) + cast(c.Hora_EjecucionProgramada as datetime)) = 40", connection);


                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            list.Add(new ResultadoEjecucionProgramada()
                            {
                                Id_ProgramacionPeriodica = reader["Id_ProgramacionPeriodica"].ToString(),
                                Id_AprobacionProgramacionPeriodica = reader["Id_AprobacionProgramacionPeriodica"].ToString(),
                                Id_SolicitudEjecucionPorDemanda = reader["Id_SolicitudEjecucionPorDemanda"].ToString(),
                                Id_Proceso = reader["Id_Proceso"].ToString(),
                                Nombre_Proceso = reader["Nombre_Proceso"].ToString(),
                                Hora_EjecucionProgramada = reader["Hora_EjecucionProgramada"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Nombre_CarpetaWorkflows = reader["Nombre_CarpetaWorkflows"].ToString(),
                                FechaHora_InicioEjecucion = reader["FechaHora_InicioEjecucion"].ToString(),
                                FechaHora_FinEjecucion = reader["FechaHora_FinEjecucion"].ToString(),
                                Id_EstadoEjecucionInformatica = reader["Id_EstadoEjecucionInformatica"].ToString(),
                                Nombre_EstadoEjecucionInformatica = reader["Nombre_EstadoEjecucionInformatica"].ToString(),
                                Id_EstadoOperadorEjecucionProceso = reader["Id_EstadoOperadorEjecucionProceso"].ToString(),
                                Nombre_EstadoOperadorEjecucionProceso = reader["Nombre_EstadoOperadorEjecucionProceso"].ToString(),
                                Id_EstadoUsuarioEjecucionProceso = reader["Id_EstadoUsuarioEjecucionProceso"].ToString(),
                                Nombre_EstadoUsuarioEjecucionProceso = reader["Nombre_EstadoUsuarioEjecucionProceso"].ToString(),
                                Id_ResultadoEjecucionProgramada = reader["Id_ResultadoEjecucionProgramada"].ToString(),
                                Cb_ProcesoEjecutado = reader["Cb_ProcesoEjecutado"].ToString(),
                                Cb_Vencido = reader["Cb_Vencido"].ToString()
                            });

                        }
                    }

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {

                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }

        public List<ResultadoEjecucionProgramada> GetEstadosProcesos()
        {
            List<ResultadoEjecucionProgramada> list = new List<ResultadoEjecucionProgramada>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("select * from dbo.C_ProcesoProgramado c "+
                            "where Fecha = convert(date, getdate()) and nombre_EstadoejecucionInformatica is not null", connection);


                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            list.Add(new ResultadoEjecucionProgramada()
                            {
                                Id_ProgramacionPeriodica = reader["Id_ProgramacionPeriodica"].ToString(),
                                Id_AprobacionProgramacionPeriodica = reader["Id_AprobacionProgramacionPeriodica"].ToString(),
                                Id_SolicitudEjecucionPorDemanda = reader["Id_SolicitudEjecucionPorDemanda"].ToString(),
                                Id_Proceso = reader["Id_Proceso"].ToString(),
                                Nombre_Proceso = reader["Nombre_Proceso"].ToString(),
                                Hora_EjecucionProgramada = reader["Hora_EjecucionProgramada"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Nombre_CarpetaWorkflows = reader["Nombre_CarpetaWorkflows"].ToString(),
                                FechaHora_InicioEjecucion = reader["FechaHora_InicioEjecucion"].ToString(),
                                FechaHora_FinEjecucion = reader["FechaHora_FinEjecucion"].ToString(),
                                Id_EstadoEjecucionInformatica = reader["Id_EstadoEjecucionInformatica"].ToString(),
                                Nombre_EstadoEjecucionInformatica = reader["Nombre_EstadoEjecucionInformatica"].ToString(),
                                Id_EstadoOperadorEjecucionProceso = reader["Id_EstadoOperadorEjecucionProceso"].ToString(),
                                Nombre_EstadoOperadorEjecucionProceso = reader["Nombre_EstadoOperadorEjecucionProceso"].ToString(),
                                Id_EstadoUsuarioEjecucionProceso = reader["Id_EstadoUsuarioEjecucionProceso"].ToString(),
                                Nombre_EstadoUsuarioEjecucionProceso = reader["Nombre_EstadoUsuarioEjecucionProceso"].ToString(),
                                Id_ResultadoEjecucionProgramada = reader["Id_ResultadoEjecucionProgramada"].ToString(),
                                Cb_ProcesoEjecutado = reader["Cb_ProcesoEjecutado"].ToString(),
                                Cb_Vencido = reader["Cb_Vencido"].ToString()
                            });

                        }
                    }

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {

                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }

        public Tp_Parametros GetTp_Parametros(string area, string nombre) {
            Tp_Parametros result = new Tp_Parametros();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("select * from dbo.OPE_Parametro  " +
                            "where Nombre_Parametro = @nombreT and Nombre_GrupoParametro = @areaT", connection);

                    SqlParameter nombreT = new SqlParameter("@nombreT", SqlDbType.VarChar)
                    {
                        Value = nombre

                    };

                    SqlParameter areaT = new SqlParameter("@areaT", SqlDbType.VarChar)
                    {
                        Value = area
                    };

                    command.Parameters.AddWithValue("@nombreT", nombre);
                    command.Parameters.AddWithValue("@areaT", area);
                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            result = new Tp_Parametros(){ 
                                NombreGrupoParametro = reader["Nombre_GrupoParametro"].ToString(),
                                NombreParametro= reader["Nombre_Parametro"].ToString(),
                                ValorParametro=reader["Valor_Parametro"].ToString()
                            };
                        }
                    }

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {

                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return result;
        }

        public void UpdateTp_Parametros(string area, string nombre, string valor)
        {
            
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("update dbo.OPE_Parametro  set Valor_Parametro = @valorT" +
                            " where Nombre_Parametro = @nombreT and Nombre_GrupoParametro = @areaT", connection);

                    SqlParameter nombreT = new SqlParameter("@nombreT", SqlDbType.VarChar)
                    {
                        Value = nombre

                    };

                    SqlParameter areaT = new SqlParameter("@areaT", SqlDbType.VarChar)
                    {
                        Value = area
                    };

                    SqlParameter valorT = new SqlParameter("@valorT", SqlDbType.VarChar)
                    {
                        Value = valor
                    };

                    command.Parameters.AddWithValue("@nombreT", nombre);
                    command.Parameters.AddWithValue("@areaT", area);
                    command.Parameters.AddWithValue("@valorT", valor);

                    int i = command.ExecuteNonQuery();
                    
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {

                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            
        }


        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramada(int IdProceso)
        {
            List<ResultadoEjecucionProgramada> list = new List<ResultadoEjecucionProgramada>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("SELECT TOP (1) AP.Id_ProgramacionPeriodica, " +
                        "RE.Id_AprobacionProgramacionPeriodica,RE.Id_SolicitudEjecucionPorDemanda, P.Id_Proceso, " +
                        "p.Nombre_Proceso, coalesce(ap.Hora_Ejecucion, coalesce(CAST(ED.FechaHora_InicioVentanaSugerida AS TIME(0)), CAST(ED.FechaHora_EjecucionAprobada AS TIME(0)))) AS Hora_Ejecucion, " +
                        "AN.Id_AreaNegocio, AN.Nombre_AreaNegocio, AN.Nombre_CarpetaWorkflows, cast(cast(RE.FechaHora_InicioEjecucion as date) as varchar(10)) as FechaHora_InicioEjecucion, " +
                        "RE.FechaHora_FinEjecucion, RE.Id_EstadoEjecucionInformatica, EP.Nombre_EstadoEjecucion as Nombre_EstadoEjecucionInformatica," +
                        "RE.Id_EstadoOperadorEjecucionProceso, EP2.Nombre_EstadoEjecucion as Nombre_EstadoOperadorEjecucionProceso, " +
                        "RE.Id_EstadoUsuarioEjecucionProceso, EP3.Nombre_EstadoEjecucion as Nombre_EstadoEjecucion, RE.Id_ResultadoEjecucionProgramada, " +
                        "(CASE WHEN RE.FechaHora_InicioEjecucion IS NOT NULL THEN 'S' ELSE 'N' END) AS Cb_ProcesoEjecutado, " +
                        "case when Id_EstadoEjecucionInformatica = 3 then 'S' else 'N' end as Cb_Vencido  " +
                        "FROM OPE_ResultadoEjecucionProgramada as RE  " +
                        "left join OPE_SolicitudEjecucionPorDemandaProceso as ED  " +
                        "on(ED.Id_SolicitudEjecucionPorDemanda = RE.Id_SolicitudEjecucionPorDemanda)  " +
                        "left join OPE_ProgramacionPeriodicaProceso as AP  " +
                        "on(AP.Id_ProgramacionPeriodica = RE.Id_AprobacionProgramacionPeriodica)  " +
                        "join OPE_Proceso as P  on(P.Id_Proceso = ED.Id_Proceso or P.Id_Proceso = ap.Id_Proceso)  " +
                        "join OPE_AreaNegocio as AN  on(p.Id_AreaNegocio = AN.Id_AreaNegocio)    " +
                        "left join OPE_EstadoEjecucionProceso EP  " +
                        "on(Re.Id_EstadoEjecucionInformatica = EP.Id_EstadoEjecucion)   " +
                        "left join OPE_EstadoEjecucionProceso EP2  " +
                        "on(Re.Id_EstadoOperadorEjecucionProceso = EP2.Id_EstadoEjecucion)    " +
                        "left join OPE_EstadoEjecucionProceso EP3  " +
                        "on(Re.Id_EstadoUsuarioEjecucionProceso = EP3.Id_EstadoEjecucion) " +
                        "left join OPE_ProcesoPrerequisito as Pr " +
                        "on(Pr.Id_ProcesoRequerido = p.Id_Proceso) " +
                        "where Pr.Id_Proceso = @IdProceso " +
                        " and cast(RE.FechaHora_InicioEjecucion as date) <= CONVERT(date, GETDATE())" +
                        "order by Re.FechaHora_InicioEjecucion desc", connection);

                    SqlParameter Fecha_iniciot = new SqlParameter("@IdProceso", SqlDbType.VarChar)
                    {
                        Value = IdProceso

                    };

                    command.Parameters.AddWithValue("@IdProceso", IdProceso);
                    

                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            list.Add(new ResultadoEjecucionProgramada()
                            {
                                Id_ProgramacionPeriodica = reader["Id_ProgramacionPeriodica"].ToString(),
                                Id_AprobacionProgramacionPeriodica = reader["Id_AprobacionProgramacionPeriodica"].ToString(),
                                Id_SolicitudEjecucionPorDemanda = reader["Id_SolicitudEjecucionPorDemanda"].ToString(),
                                Id_Proceso = reader["Id_Proceso"].ToString(),
                                Nombre_Proceso = reader["Nombre_Proceso"].ToString(),
                                Hora_EjecucionProgramada = reader["Hora_Ejecucion"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Nombre_CarpetaWorkflows = reader["Nombre_CarpetaWorkflows"].ToString(),
                                FechaHora_InicioEjecucion = reader["FechaHora_InicioEjecucion"].ToString(),
                                FechaHora_FinEjecucion = reader["FechaHora_FinEjecucion"].ToString(),
                                Id_EstadoEjecucionInformatica = reader["Id_EstadoEjecucionInformatica"].ToString(),
                                Nombre_EstadoEjecucionInformatica = reader["Nombre_EstadoEjecucionInformatica"].ToString(),
                                Id_EstadoOperadorEjecucionProceso = reader["Id_EstadoOperadorEjecucionProceso"].ToString(),
                                Nombre_EstadoOperadorEjecucionProceso = reader["Nombre_EstadoOperadorEjecucionProceso"].ToString(),
                                Id_EstadoUsuarioEjecucionProceso = reader["Id_EstadoUsuarioEjecucionProceso"].ToString(),
                                Nombre_EstadoUsuarioEjecucionProceso = reader["Nombre_EstadoEjecucion"].ToString(),
                                Id_ResultadoEjecucionProgramada = reader["Id_ResultadoEjecucionProgramada"].ToString(),
                                Cb_ProcesoEjecutado = reader["Cb_ProcesoEjecutado"].ToString(),
                                Cb_Vencido = reader["Cb_Vencido"].ToString()
                            });

                        }
                    }

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {
                        
                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }


        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramadaBool(string Fecha_incio, string Fecha_fin)
        //(int IdProceso)
        {
            List<ResultadoEjecucionProgramada> list = new List<ResultadoEjecucionProgramada>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    /* SqlCommand command = new SqlCommand("SELECT TOP(1)Id_ProgramacionPeriodica, Id_AprobacionProgramacionPeriodica, Id_SolicitudEjecucionPorDemanda,"+
                          " Id_Proceso, Nombre_Proceso, Hora_EjecucionProgramada, Id_AreaNegocio, Nombre_AreaNegocio, Nombre_CarpetaWorkflows,"+
                           "  CAST(FORMAT(CONVERT(DATETIME, CONVERT(CHAR(8), Fecha, 112) + ' ' + CONVERT(CHAR(8), Hora_EjecucionProgramada, 108)), 'yyyy-MM-dd HH:mm:ss ') AS VARCHAR(30)) AS Fecha," +
                            " FechaHora_FinEjecucion, Id_EstadoEjecucionInformatica, Nombre_EstadoEjecucionInformatica," +
                           "  Id_EstadoOperadorEjecucionProceso, Nombre_EstadoOperadorEjecucionProceso, Id_EstadoUsuarioEjecucionProceso," +
                             "Nombre_EstadoUsuarioEjecucionProceso, Id_ResultadoEjecucionProgramada, Cb_ProcesoEjecutado, Cb_Vencido" +
                            " FROM C_ProcesoProgramado" +
                            " WHERE Id_Proceso = @IdProceso AND (Fecha > CONVERT(date, GETDATE())OR(Fecha = CONVERT(date, GETDATE())" +
                            " AND  Hora_EjecucionProgramada > CONVERT(TIME, GETDATE())))" +
                           "  AND Cb_Vencido = 'N' AND Id_EstadoEjecucionInformatica IS NULL" +
                            " AND(Cb_Activo IS NULL OR Cb_Activo = 'S') " +
                            " AND CAST(Fecha AS DATE) BETWEEN CONVERT(varchar, getdate(), 23) AND  CONVERT(varchar, getdate(), 23)", connection);*/
                    SqlCommand command = new SqlCommand("SELECT CPD.Id_ProgramacionPeriodica AS Id_ProgramacionPeriodica,                                                                                                            " +
                        "	RE.Id_AprobacionProgramacionPeriodica,RE.Id_SolicitudEjecucionPorDemanda, P.Id_Proceso,                                                          " +
                        "	p.Nombre_Proceso,                                                                                                                                " +
                        "	NULL AS Hora_Ejecucion,                                                                                                                          " +
                        "	AN.Id_AreaNegocio, AN.Nombre_AreaNegocio, AN.Nombre_CarpetaWorkflows,                                                                            " +
                        "	CAST(FORMAT (RE.FechaHora_InicioEjecucion, 'yyyy-MM-dd HH:mm:ss ') AS VARCHAR(30)) AS FechaHora_InicioEjecucion,                                 " +
                        "	RE.FechaHora_FinEjecucion, RE.Id_EstadoEjecucionInformatica, EP.Nombre_EstadoEjecucion AS Nombre_EstadoEjecucionInformatica,                     " +
                        "	RE.Id_EstadoOperadorEjecucionProceso, EP2.Nombre_EstadoEjecucion AS Nombre_EstadoOperadorEjecucionProceso,                                       " +
                        "	RE.Id_EstadoUsuarioEjecucionProceso, EP3.Nombre_EstadoEjecucion AS Nombre_EstadoEjecucion, RE.Id_ResultadoEjecucionProgramada,                   " +
                        "	(CASE WHEN RE.FechaHora_InicioEjecucion IS NOT NULL AND RE.Id_EstadoEjecucionInformatica != 3 THEN 'S' ELSE 'N' END) AS Cb_ProcesoEjecutado,        " +
                        "	CASE WHEN RE.Id_EstadoEjecucionInformatica = 3 THEN 'S' ELSE 'N' END AS Cb_Vencido                                                                  " +
                        "FROM OPE_ResultadoEjecucionProgramada AS RE                                                                                                         " +
                        "                                                                                                                                                    " +
                        "JOIN OPE_Proceso AS P                                                                                                                               " +
                        "	ON(P.Id_Proceso = RE.Id_Proceso)                                                                                                                 " +
                        "JOIN OPE_AreaNegocio AS AN                                                                                                                          " +
                        "	ON(p.Id_AreaNegocio = AN.Id_AreaNegocio)                                                                                                         " +
                        "JOIN OPE_EstadoEjecucionProceso EP                                                                                                                  " +
                        "	ON(Re.Id_EstadoEjecucionInformatica = EP.Id_EstadoEjecucion)                                                                                     " +
                        "LEFT JOIN OPE_EstadoEjecucionProceso EP2                                                                                                            " +
                        "	ON(Re.Id_EstadoOperadorEjecucionProceso = EP2.Id_EstadoEjecucion)                                                                                " +
                        "LEFT JOIN OPE_EstadoEjecucionProceso EP3                                                                                                            " +
                        "	ON(Re.Id_EstadoUsuarioEjecucionProceso = EP3.Id_EstadoEjecucion)    " +
                        "LEFT JOIN C_ProcesoProgramado  CPD" +
                        " ON  CPD.Id_Proceso = P.Id_Proceso AND (CPD.Fecha > CONVERT(date, GETDATE())OR(CPD.Fecha = CONVERT(date, GETDATE())" +
                        " AND  CPD.Hora_EjecucionProgramada > CONVERT(TIME, GETDATE())))" +
                        "  AND CPD.Cb_Vencido = 'N' AND CPD.Id_EstadoEjecucionInformatica IS NULL" +
                        " AND(CPD.Cb_Activo IS NULL OR CPD.Cb_Activo = 'S') " +
                        " AND CAST(Fecha AS DATE) BETWEEN CONVERT(varchar, getdate(), 23) AND  CONVERT(varchar, getdate(), 23)                                                                             " +
                        " WHERE CAST(RE.FechaHora_InicioEjecucion AS DATE) BETWEEN @Fecha_inicioT AND @Fecha_Fint                                                             " +
                        " UNION                                                                                                                                               " +
                        " SELECT TOP(1000)Id_ProgramacionPeriodica, Id_AprobacionProgramacionPeriodica, Id_SolicitudEjecucionPorDemanda,                                      " +
                        "	Id_Proceso, Nombre_Proceso, Hora_EjecucionProgramada, Id_AreaNegocio, Nombre_AreaNegocio, Nombre_CarpetaWorkflows,                               " +
                        "	CAST(FORMAT (CONVERT(DATETIME,CONVERT(CHAR(8), Fecha, 112) + ' ' + CONVERT(CHAR(8), Hora_EjecucionProgramada, 108)) , 'yyyy-MM-dd HH:mm:ss ') AS VARCHAR(30)) AS Fecha, " +
                        "   FechaHora_FinEjecucion, Id_EstadoEjecucionInformatica, Nombre_EstadoEjecucionInformatica,    " +
                        "	Id_EstadoOperadorEjecucionProceso, Nombre_EstadoOperadorEjecucionProceso, Id_EstadoUsuarioEjecucionProceso, Nombre_EstadoUsuarioEjecucionProceso," +
                        "	Id_ResultadoEjecucionProgramada, Cb_ProcesoEjecutado , Cb_Vencido                                                                               " +
                        " FROM C_ProcesoProgramado                                                                                                                            " +
                        " WHERE ( Fecha > CONVERT(date, GETDATE()) " +
                        " OR(Fecha = CONVERT(date, GETDATE())  AND  Hora_EjecucionProgramada > CONVERT(TIME, GETDATE())) ) " +
                        "    AND CAST(Fecha AS DATE) BETWEEN @Fecha_inicioT AND @Fecha_Fint " +
                        "    AND Cb_Vencido = 'N' " +
                        "    AND Id_EstadoEjecucionInformatica IS NULL AND (Cb_Activo IS NULL OR Cb_Activo = 'S') ", connection);
                    /*

                                        SqlParameter Fecha_iniciot = new SqlParameter("@IdProceso", SqlDbType.VarChar)
                                        {
                                            Value = IdProceso

                                        };

                                        command.Parameters.AddWithValue("@IdProceso", IdProceso);
                    */


                    SqlParameter Fecha_iniciot = new SqlParameter("@Fecha_iniciot", SqlDbType.VarChar)
                    {
                        Value = Fecha_incio

                    };

                    SqlParameter Fecha_fint = new SqlParameter("@Fecha_fint", SqlDbType.Int)
                    {
                        Value = Fecha_fin
                    };

                    command.Parameters.AddWithValue("@Fecha_iniciot", Fecha_incio);
                    command.Parameters.AddWithValue("@Fecha_fint", Fecha_fin);

                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            list.Add(new ResultadoEjecucionProgramada()
                            {
                                Id_ProgramacionPeriodica = reader["Id_ProgramacionPeriodica"].ToString(),
                                Id_AprobacionProgramacionPeriodica = reader["Id_AprobacionProgramacionPeriodica"].ToString(),
                                Id_SolicitudEjecucionPorDemanda = reader["Id_SolicitudEjecucionPorDemanda"].ToString(),
                                Id_Proceso = reader["Id_Proceso"].ToString(),
                                Nombre_Proceso = reader["Nombre_Proceso"].ToString(),
                                Hora_EjecucionProgramada = reader["Hora_Ejecucion"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Nombre_CarpetaWorkflows = reader["Nombre_CarpetaWorkflows"].ToString(),
                                FechaHora_InicioEjecucion = reader["FechaHora_InicioEjecucion"].ToString(),
                                FechaHora_FinEjecucion = reader["FechaHora_FinEjecucion"].ToString(),
                                Id_EstadoEjecucionInformatica = reader["Id_EstadoEjecucionInformatica"].ToString(),
                                Nombre_EstadoEjecucionInformatica = reader["Nombre_EstadoEjecucionInformatica"].ToString(),
                                Id_EstadoOperadorEjecucionProceso = reader["Id_EstadoOperadorEjecucionProceso"].ToString(),
                                Nombre_EstadoOperadorEjecucionProceso = reader["Nombre_EstadoOperadorEjecucionProceso"].ToString(),
                                Id_EstadoUsuarioEjecucionProceso = reader["Id_EstadoUsuarioEjecucionProceso"].ToString(),
                                Nombre_EstadoUsuarioEjecucionProceso = reader["Nombre_EstadoEjecucion"].ToString(),
                                Id_ResultadoEjecucionProgramada = reader["Id_ResultadoEjecucionProgramada"].ToString(),
                                Cb_ProcesoEjecutado = reader["Cb_ProcesoEjecutado"].ToString(),
                                Cb_Vencido = reader["Cb_Vencido"].ToString()
                            });

                        }
                    }

                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {

                    }

                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }

    }


}
