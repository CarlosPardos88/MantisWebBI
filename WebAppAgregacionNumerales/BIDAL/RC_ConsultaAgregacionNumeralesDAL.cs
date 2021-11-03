using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teradata.Client.Provider;

namespace BIDAL
{
    public class RC_ConsultaAgregacionNumeralesDAL
    {
        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instancia = ConfigurationManager.AppSettings["InstanciaView"].ToString();
        private static readonly string instanciaStage = ConfigurationManager.AppSettings["instanciaStage"].ToString();

        private readonly string SpAgregacionNumerales = "SP_DCINAgregacionNumerales";

        private int GuardarConsultaAgregacionNumerales(RC_ConsultaAgregacionNumerales consulta)  {
            var result = 0;

            DateTime centuryBegin = new DateTime(2001, 1, 1);
            DateTime currentDate = DateTime.Now;

            long elapsedTicks = currentDate.Ticks - centuryBegin.Ticks;
            TimeSpan elapsedSpan = new TimeSpan(elapsedTicks);

            int lote = Convert.ToInt32(elapsedSpan.TotalSeconds);

          

                using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {

                    oSqlConnection.Open();

                    using (TdCommand oSqlCmd = new TdCommand())
                    {

                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "INSERT INTO " + instancia + ".V_RC_ConsultaAgregacionNumerales " +
                                            "(Sk_Consulta, Id_Estructura, Fecha_Consulta, Id_Fuente, Fecha_Inicial, Fecha_Final," +
                                            "Id_Periodicidad, Nombre_UsuarioCreacion, Fecha_Creacion, Sk_Lote, Sk_Lote_Upd," +
                                            "Cod_Severidad)" +
                                            "  VALUES " +
                                            " ((SEL COALESCE(MAX(Sk_Consulta), 0) + 1 FROM " + instancia + ".V_RC_ConsultaAgregacionNumerales)," +
                                            "?, ?, ?, ?, ?,?,?, CURRENT_DATE,  ?, null, 1); ";

                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter Id_Estructura = oSqlCmd.CreateParameter();
                        Id_Estructura.DbType = DbType.String;
                        Id_Estructura.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Estructura);
                        Id_Estructura.Value = consulta.Id_Estructura;

                        TdParameter Fecha_Consulta = oSqlCmd.CreateParameter();
                        Fecha_Consulta.DbType = DbType.DateTime;
                        Id_Estructura.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Consulta);
                        Fecha_Consulta.Value = consulta.Fecha_Consulta;

                        TdParameter Id_Fuente = oSqlCmd.CreateParameter();
                        Id_Fuente.DbType = DbType.String;
                        Id_Estructura.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Fuente);
                        Id_Fuente.Value = consulta.Id_Fuente;

                        TdParameter Fecha_Inicial = oSqlCmd.CreateParameter();
                        Fecha_Inicial.DbType = DbType.DateTime;
                        Id_Estructura.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Inicial);
                        Fecha_Inicial.Value = consulta.Fecha_Inicial;

                        TdParameter Fecha_Final = oSqlCmd.CreateParameter();
                        Fecha_Final.DbType = DbType.DateTime;
                        Fecha_Final.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Final);
                        Fecha_Final.Value = consulta.Fecha_Final;

                        TdParameter Id_Periodicidad = oSqlCmd.CreateParameter();
                        Id_Periodicidad.DbType = DbType.String;
                        Id_Periodicidad.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Periodicidad);
                        Id_Periodicidad.Value = consulta.Id_Periodicidad;

                        TdParameter Nombre_UsuarioCreacion = oSqlCmd.CreateParameter();
                        Nombre_UsuarioCreacion.DbType = DbType.String;
                        Nombre_UsuarioCreacion.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Nombre_UsuarioCreacion);
                        Nombre_UsuarioCreacion.Value = consulta.Nombre_UsuarioCreacion;

                        TdParameter loteP = oSqlCmd.CreateParameter();
                        loteP.DbType = DbType.Int32;
                        loteP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(loteP);
                        loteP.Value = lote;

                        result = oSqlCmd.ExecuteNonQuery();

                        oSqlCmd.Dispose();
                        oSqlConnection.Close();

                    }

                }
                catch (SqlException )
                {
                    result = -1;
                }
                catch (TdException  )
                {
                    result = -1;
                }
                catch (FormatException )
                {
                    result = -1;
                }
                catch (OverflowException )
                {
                    result = -1;
                }
            }
                return result;
        }


        public int DeleteConsultaAgregacionNumerales(RC_ConsultaAgregacionNumerales consulta)
        {
            var result = 0;

            DateTime centuryBegin = new DateTime(2001, 1, 1);
            DateTime currentDate = DateTime.Now;

            long elapsedTicks = currentDate.Ticks - centuryBegin.Ticks;
            TimeSpan elapsedSpan = new TimeSpan(elapsedTicks);

            int lote = Convert.ToInt32(elapsedSpan.TotalSeconds);



            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {

                    oSqlConnection.Open();

                    using (TdCommand oSqlCmd = new TdCommand())
                    {

                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = " DELETE FROM " + instancia + ".V_RC_ResultadoAgregacionNumerales " +
                                            " WHERE Sk_Consulta= (SEL sk_consulta FROM " + instancia + ".V_RC_ConsultaAgregacionNumerales WHERE Id_Estructura= ? AND Fecha_Consulta= ? AND Id_Fuente=? AND Fecha_Inicial=? AND Fecha_Final=? " +
                                            " AND Id_Periodicidad=?);" +
                                            " DELETE FROM " + instancia + ".V_RC_DetalleResultadoAgregacionNumerales " +
                                            " WHERE Sk_Consulta= (SEL sk_consulta FROM " + instancia + ".V_RC_ConsultaAgregacionNumerales WHERE Id_Estructura= ? AND Fecha_Consulta= ? AND Id_Fuente=? AND Fecha_Inicial=? AND Fecha_Final=? " +
                                            " AND Id_Periodicidad=?);" +
                                            "DELETE FROM " + instancia + ".V_RC_ConsultaAgregacionNumerales " +
                                            " WHERE Id_Estructura= ? AND Fecha_Consulta= ? AND Id_Fuente=? AND Fecha_Inicial=? AND Fecha_Final=? " +
                                            " AND Id_Periodicidad=?;";

                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter Id_Estructura = oSqlCmd.CreateParameter();
                        Id_Estructura.DbType = DbType.String;
                        Id_Estructura.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Estructura);
                        Id_Estructura.Value = consulta.Id_Estructura;

                        TdParameter Fecha_Consulta = oSqlCmd.CreateParameter();
                        Fecha_Consulta.DbType = DbType.DateTime;
                        Fecha_Consulta.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Consulta);
                        Fecha_Consulta.Value = consulta.Fecha_Consulta;

                        TdParameter Id_Fuente = oSqlCmd.CreateParameter();
                        Id_Fuente.DbType = DbType.String;
                        Id_Fuente.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Fuente);
                        Id_Fuente.Value = consulta.Id_Fuente;

                        TdParameter Fecha_Inicial = oSqlCmd.CreateParameter();
                        Fecha_Inicial.DbType = DbType.DateTime;
                        Fecha_Inicial.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Inicial);
                        Fecha_Inicial.Value = consulta.Fecha_Inicial;

                        TdParameter Fecha_Final = oSqlCmd.CreateParameter();
                        Fecha_Final.DbType = DbType.DateTime;
                        Fecha_Final.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Final);
                        Fecha_Final.Value = consulta.Fecha_Final;

                        TdParameter Id_Periodicidad = oSqlCmd.CreateParameter();
                        Id_Periodicidad.DbType = DbType.String;
                        Id_Periodicidad.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Periodicidad);
                        Id_Periodicidad.Value = consulta.Id_Periodicidad;

                        TdParameter Id_Estructura2 = oSqlCmd.CreateParameter();
                        Id_Estructura2.DbType = DbType.String;
                        Id_Estructura2.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Estructura2);
                        Id_Estructura2.Value = consulta.Id_Estructura;

                        TdParameter Fecha_Consulta2 = oSqlCmd.CreateParameter();
                        Fecha_Consulta2.DbType = DbType.DateTime;
                        Fecha_Consulta2.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Consulta2);
                        Fecha_Consulta2.Value = consulta.Fecha_Consulta;

                        TdParameter Id_Fuente2 = oSqlCmd.CreateParameter();
                        Id_Fuente2.DbType = DbType.String;
                        Id_Fuente2.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Fuente2);
                        Id_Fuente2.Value = consulta.Id_Fuente;

                        TdParameter Fecha_Inicial2 = oSqlCmd.CreateParameter();
                        Fecha_Inicial2.DbType = DbType.DateTime;
                        Fecha_Inicial2.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Inicial2);
                        Fecha_Inicial2.Value = consulta.Fecha_Inicial;

                        TdParameter Fecha_Final2 = oSqlCmd.CreateParameter();
                        Fecha_Final2.DbType = DbType.DateTime;
                        Fecha_Final2.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Final2);
                        Fecha_Final2.Value = consulta.Fecha_Final;

                        TdParameter Id_Periodicidad2 = oSqlCmd.CreateParameter();
                        Id_Periodicidad2.DbType = DbType.String;
                        Id_Periodicidad2.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Periodicidad2);
                        Id_Periodicidad2.Value = consulta.Id_Periodicidad;

                        TdParameter Id_Estructura3 = oSqlCmd.CreateParameter();
                        Id_Estructura3.DbType = DbType.String;
                        Id_Estructura3.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Estructura3);
                        Id_Estructura3.Value = consulta.Id_Estructura;

                        TdParameter Fecha_Consulta3 = oSqlCmd.CreateParameter();
                        Fecha_Consulta3.DbType = DbType.DateTime;
                        Fecha_Consulta3.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Consulta3);
                        Fecha_Consulta3.Value = consulta.Fecha_Consulta;

                        TdParameter Id_Fuente3 = oSqlCmd.CreateParameter();
                        Id_Fuente3.DbType = DbType.String;
                        Id_Fuente3.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Fuente3);
                        Id_Fuente3.Value = consulta.Id_Fuente;

                        TdParameter Fecha_Inicial3 = oSqlCmd.CreateParameter();
                        Fecha_Inicial3.DbType = DbType.DateTime;
                        Fecha_Inicial3.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Inicial3);
                        Fecha_Inicial3.Value = consulta.Fecha_Inicial;

                        TdParameter Fecha_Final3 = oSqlCmd.CreateParameter();
                        Fecha_Final3.DbType = DbType.DateTime;
                        Fecha_Final3.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Final3);
                        Fecha_Final3.Value = consulta.Fecha_Final;

                        TdParameter Id_Periodicidad3 = oSqlCmd.CreateParameter();
                        Id_Periodicidad3.DbType = DbType.String;
                        Id_Periodicidad3.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Periodicidad3);
                        Id_Periodicidad3.Value = consulta.Id_Periodicidad;

                        result = oSqlCmd.ExecuteNonQuery();

                        oSqlCmd.Dispose();
                        oSqlConnection.Close();

                    }

                }
                catch (SqlException )
                {
                    result = -1;
                }
                catch (TdException e)
                {
                    result = -1;
                }
                catch (FormatException )
                {
                    result = -1;
                }
                catch (OverflowException )
                {
                    result = -1;
                }
            }
            return result;




        }
        public List<NodeStructureQuery> GetNodeStructue(string idStructure)
        {
            throw new NotImplementedException();

            
        }

        public int EjecutarConsultaAgregacionNumerales(RC_ConsultaAgregacionNumerales consulta)
        {
            var result = 0;

            DateTime centuryBegin = new DateTime(2001, 1, 1);
            DateTime currentDate = DateTime.Now;
            long elapsedTicks = currentDate.Ticks - centuryBegin.Ticks;
            TimeSpan elapsedSpan = new TimeSpan(elapsedTicks);
            int lote = Convert.ToInt32(elapsedSpan.TotalSeconds);

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();

                    using (TdCommand oSqlCmd = new TdCommand())
                    {

                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = $"{instanciaStage}.{SpAgregacionNumerales}";
                        oSqlCmd.CommandType = CommandType.StoredProcedure;
                        oSqlCmd.CommandTimeout = int.MaxValue;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter Id_Estructura = oSqlCmd.CreateParameter();
                        Id_Estructura.DbType = DbType.String;
                        Id_Estructura.Direction = ParameterDirection.Input;
                        Id_Estructura.ParameterName = "Id_Estructura";
                        oSqlCmd.Parameters.Add(Id_Estructura);
                        Id_Estructura.Value = consulta.Id_Estructura;
                        
                        TdParameter Fecha_Consulta = oSqlCmd.CreateParameter();
                        Fecha_Consulta.DbType = DbType.DateTime;
                        Id_Estructura.Direction = ParameterDirection.Input;
                        Id_Estructura.ParameterName = "Fecha_Consulta";
                        oSqlCmd.Parameters.Add(Fecha_Consulta);
                        Fecha_Consulta.Value = consulta.Fecha_Consulta;

                        TdParameter Id_Fuente = oSqlCmd.CreateParameter();
                        Id_Fuente.DbType = DbType.String;
                        Id_Estructura.Direction = ParameterDirection.Input;
                        Id_Estructura.ParameterName = "Id_Fuente";
                        oSqlCmd.Parameters.Add(Id_Fuente);
                        Id_Fuente.Value = consulta.Id_Fuente;

                        TdParameter Fecha_Inicial = oSqlCmd.CreateParameter();
                        Fecha_Inicial.DbType = DbType.DateTime;
                        Id_Estructura.Direction = ParameterDirection.Input;
                        Id_Estructura.ParameterName = "Fecha_Inicial";
                        oSqlCmd.Parameters.Add(Fecha_Inicial);
                        Fecha_Inicial.Value = consulta.Fecha_Inicial;

                        TdParameter Fecha_Final = oSqlCmd.CreateParameter();
                        Fecha_Final.DbType = DbType.DateTime;
                        Fecha_Final.Direction = ParameterDirection.Input;
                        Id_Estructura.ParameterName = "Fecha_Final";
                        oSqlCmd.Parameters.Add(Fecha_Final);
                        Fecha_Final.Value = consulta.Fecha_Final;

                        TdParameter Id_Periodicidad = oSqlCmd.CreateParameter();
                        Id_Periodicidad.DbType = DbType.String;
                        Id_Periodicidad.Direction = ParameterDirection.Input;
                        Id_Estructura.ParameterName = "Id_Periodicidad";
                        oSqlCmd.Parameters.Add(Id_Periodicidad);
                        Id_Periodicidad.Value = consulta.Id_Periodicidad;

                        result = oSqlCmd.ExecuteNonQuery();
                        result = 1;
                        oSqlCmd.Dispose();
                        oSqlConnection.Close();
                    }

                }
                catch (SqlException e)
                {
                    DeleteConsultaAgregacionNumerales(consulta);
                    result = -1;
                }
                
                catch (TdException e)
                {
                    DeleteConsultaAgregacionNumerales(consulta);
                    result = -1;
                }
                catch (FormatException e)
                {
                    DeleteConsultaAgregacionNumerales(consulta);
                    result = -1;
                }
                catch (OverflowException e)
                {
                    DeleteConsultaAgregacionNumerales(consulta);
                    result = -1;
                }
            }

            return result;

        }

        public List<RC_ConsultaAgregacionNumerales> Get_RC_ConsultaAgregacionNumeralesDAL(int Id_Estructura, DateTime Fecha_Consulta, int Id_Fuente, DateTime Fecha_Inicial, DateTime Fecha_Final, int Id_Periodicidad)
        {
            List<RC_ConsultaAgregacionNumerales> list = new List<RC_ConsultaAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select * from " + @instancia + ".V_RC_ConsultaAgregacionNumerales "
                                                       + " where Id_Estructura = ? and Fecha_Consulta = ?" +
                                                       " AND Id_Fuente= ? AND Fecha_Inicial=? AND Fecha_Final=? " +
                                                       " AND Id_Periodicidad=? ;";
                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter Id_EstructuraP = oSqlCmd.CreateParameter();
                        Id_EstructuraP.DbType = DbType.String;
                        Id_EstructuraP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_EstructuraP);
                        Id_EstructuraP.Value = Id_Estructura;


                        TdParameter Fecha_ConsultaP = oSqlCmd.CreateParameter();
                        Fecha_ConsultaP.DbType = DbType.DateTime;
                        Fecha_ConsultaP.Direction = ParameterDirection.Input;
                        Fecha_ConsultaP.IsNullable = true;
                        object v;
                        if (Fecha_Consulta != null)
                        {
                            v = Fecha_Consulta;
                        }
                        else
                        {
                            v = System.DBNull.Value;
                        }
                        oSqlCmd.Parameters.Add(Fecha_ConsultaP);
                        Fecha_ConsultaP.Value = v;

                        TdParameter Id_FuenteP = oSqlCmd.CreateParameter();
                        Id_FuenteP.DbType = DbType.String;
                        Id_FuenteP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_FuenteP);
                        Id_FuenteP.Value = Id_Fuente;


                        TdParameter Fecha_Inicialp = oSqlCmd.CreateParameter();
                        Fecha_Inicialp.DbType = DbType.DateTime;
                        Fecha_Inicialp.Direction = ParameterDirection.Input;
                        Fecha_Inicialp.IsNullable = true;
                       
                        if (Fecha_Inicial != null)
                        {
                            v = Fecha_Inicial;
                        }
                        else
                        {
                            v = System.DBNull.Value;
                        }
                        oSqlCmd.Parameters.Add(Fecha_Inicialp);
                        Fecha_Inicialp.Value = v;
                        
                        TdParameter Fecha_Finalp = oSqlCmd.CreateParameter();
                        Fecha_Finalp.DbType = DbType.DateTime;
                        Fecha_Finalp.Direction = ParameterDirection.Input;
                        Fecha_Finalp.IsNullable = true;
                       
                        if (Fecha_Final != null)
                        {
                            v = Fecha_Final;
                        }
                        else
                        {
                            v = System.DBNull.Value;
                        }
                        oSqlCmd.Parameters.Add(Fecha_Finalp);
                        Fecha_Finalp.Value = v;

                        TdParameter Id_Periodicidadp = oSqlCmd.CreateParameter();
                        Id_Periodicidadp.DbType = DbType.String;
                        Id_Periodicidadp.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Periodicidadp);
                        Id_Periodicidadp.Value = Id_Periodicidad;



                        oSqlCmd.Prepare();
                        TdDataReader oReader = oSqlCmd.ExecuteReader();

                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {

                                    RC_ConsultaAgregacionNumerales item = new RC_ConsultaAgregacionNumerales();


                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
                                    item.Fecha_Consulta = DateTime.Parse(oReader["Fecha_Consulta"].ToString());
                                    item.Id_Fuente = int.Parse(oReader["Id_Fuente"].ToString());
                                    item.Fecha_Inicial = DateTime.Parse(oReader["Fecha_Inicial"].ToString());
                                    item.Fecha_Final = DateTime.Parse(oReader["Fecha_Final"].ToString());
                                    item.Id_Periodicidad = int.Parse(oReader["Id_Periodicidad"].ToString());

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
        public List<RC_ConsultaAgregacionNumerales> Get_SkConsulta(int Id_Estructura, string Fecha_Consulta, int Id_Fuente, string Fecha_Inicial, string Fecha_Final, int Id_Periodicidad)
        {
            List<RC_ConsultaAgregacionNumerales> list = new List<RC_ConsultaAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select Sk_Consulta, Id_Estructura from " + @instancia + ".V_RC_ConsultaAgregacionNumerales "
                                                       + " where Id_Estructura = ? and CAST(CAST(Fecha_Consulta AS DATE FORMAT 'yyyymmdd' ) AS VARCHAR(8)) = ?" +
                                                       " AND Id_Fuente= ? AND CAST(CAST(Fecha_Inicial AS DATE FORMAT 'yyyymmdd' ) AS VARCHAR(8))=? AND " +
                                                       "CAST(CAST(Fecha_Final AS DATE FORMAT 'yyyymmdd' ) AS VARCHAR(8))=? " +
                                                       " AND Id_Periodicidad=? ;";
                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter Id_EstructuraP = oSqlCmd.CreateParameter();
                        Id_EstructuraP.DbType = DbType.String;
                        Id_EstructuraP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_EstructuraP);
                        Id_EstructuraP.Value = Id_Estructura;

                        TdParameter Fecha_ConsultaP = oSqlCmd.CreateParameter();
                        Fecha_ConsultaP.DbType = DbType.String;
                        Fecha_ConsultaP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_ConsultaP);
                        Fecha_ConsultaP.Value = Fecha_Consulta;

                        TdParameter Id_FuenteP = oSqlCmd.CreateParameter();
                        Id_FuenteP.DbType = DbType.String;
                        Id_FuenteP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_FuenteP);
                        Id_FuenteP.Value = Id_Fuente;


                        TdParameter Fecha_Inicialp = oSqlCmd.CreateParameter();
                        Fecha_Inicialp.DbType = DbType.String;
                        Fecha_Inicialp.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Inicialp);
                        Fecha_Inicialp.Value = Fecha_Inicial;

                        TdParameter Fecha_Finalp = oSqlCmd.CreateParameter();
                        Fecha_Finalp.DbType = DbType.String;
                        Fecha_Finalp.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Fecha_Finalp);
                        Fecha_Finalp.Value = Fecha_Final;

                        TdParameter Id_Periodicidadp = oSqlCmd.CreateParameter();
                        Id_Periodicidadp.DbType = DbType.String;
                        Id_Periodicidadp.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(Id_Periodicidadp);
                        Id_Periodicidadp.Value = Id_Periodicidad;



                        oSqlCmd.Prepare();
                        TdDataReader oReader = oSqlCmd.ExecuteReader();

                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {

                                    RC_ConsultaAgregacionNumerales item = new RC_ConsultaAgregacionNumerales();

                                   item.Sk_Consulta = int.Parse(oReader["Sk_Consulta"].ToString());
                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
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
        public int Post_RC_ConsultaAgregacionNumeralesDAL(RC_ConsultaAgregacionNumerales consulta)
        {
            try
            {
                var resultaC = Get_RC_ConsultaAgregacionNumeralesDAL(consulta.Id_Estructura, consulta.Fecha_Consulta, consulta.Id_Fuente, consulta.Fecha_Inicial, consulta.Fecha_Final, consulta.Id_Periodicidad);
                if (resultaC.Count < 1)
                {
                    GuardarConsultaAgregacionNumerales(consulta);
                    int result = EjecutarConsultaAgregacionNumerales(consulta);

                    if (result == -1)
                    {
                        return -1;
                    }
                    else
                    {
                        return 0;
                    };
                }
                else
                {
                    return 99;
                }
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


        public List<RC_ConsultaAgregacionNumerales> Get_RC_ConsultaAgregacionNumeralesDAL()
        {
            List<RC_ConsultaAgregacionNumerales> list = new List<RC_ConsultaAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select EAN.Desc_Estructura Desc_Estructura, PAN.Desc_Periodicidad Desc_Periodicidad, FAN.Desc_Fuente Desc_Fuente, CAN.* from " + @instancia + ".V_RC_ConsultaAgregacionNumerales CAN " +
                                                                        "INNER JOIN " + @instancia + ".V_RC_EstructuraAgregacionNumerales EAN" +
                                                                        " ON (EAN.Id_Estructura=CAN.Id_Estructura)" +
                                                                        " INNER JOIN " + instancia + ".V_RC_PeriodicidadAgregacionNumerales PAN" +
                                                                        " ON (TRIM(CAN.Id_Periodicidad)=TRIM(PAN.Id_Periodicidad))" +
                                                                        " INNER JOIN "+ instancia + ".V_RC_FuenteAgregacionNumerales FAN" +
                                                                        " ON(TRIM(CAN.Id_Fuente)=TRIM(FAN.Id_Fuente))" +
                                                                        " ORDER BY CAN.Fecha_Creacion desc";
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {
                                    RC_ConsultaAgregacionNumerales item = new RC_ConsultaAgregacionNumerales();

                                    item.Sk_Consulta = int.Parse(oReader["Sk_Consulta"].ToString());
                                    item.Desc_Estructura = oReader["Desc_Estructura"].ToString();
                                    item.Desc_Periodicidad = oReader["Desc_Periodicidad"].ToString();
                                    item.Desc_Fuente = oReader["Desc_Fuente"].ToString();
                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
                                    item.Fecha_Consulta = DateTime.Parse(oReader["Fecha_Consulta"].ToString());
                                    item.Id_Fuente = int.Parse(oReader["Id_Fuente"].ToString());
                                    item.Fecha_Inicial = DateTime.Parse(oReader["Fecha_Inicial"].ToString());
                                    item.Fecha_Final = DateTime.Parse(oReader["Fecha_Final"].ToString());
                                    item.Id_Periodicidad = int.Parse(oReader["Id_Periodicidad"].ToString());
                                    item.Nombre_UsuarioCreacion = oReader["Nombre_UsuarioCreacion"].ToString();
                                    item.Fecha_Creacion = DateTime.Parse(oReader["Fecha_Creacion"].ToString());
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

        public List<RC_ConsultaAgregacionNumerales> Get_RC_ConsultaAgregacionNumeralesBySkDAL(int Id_Estructura, int Sk_Consulta)
        {
            List<RC_ConsultaAgregacionNumerales> list = new List<RC_ConsultaAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select EAN.Desc_Estructura Desc_Estructura, PAN.Desc_Periodicidad Desc_Periodicidad, FAN.Desc_Fuente Desc_Fuente, CAN.* from " + @instancia + ".V_RC_ConsultaAgregacionNumerales CAN " +
                                                                        "INNER JOIN " + @instancia + ".V_RC_EstructuraAgregacionNumerales EAN" +
                                                                        " ON (EAN.Id_Estructura=CAN.Id_Estructura)" +
                                                                        " INNER JOIN " + instancia + ".V_RC_PeriodicidadAgregacionNumerales PAN" +
                                                                        " ON (trim(CAN.Id_Periodicidad)=TRIM(PAN.Id_Periodicidad))" +
                                                                        " INNER JOIN " + instancia + ".V_RC_FuenteAgregacionNumerales FAN" +
                                                                        " ON(trim(CAN.Id_Fuente)=TRIM(FAN.Id_Fuente))" +
                                                                        " Where CAN.Sk_Consulta="+ Sk_Consulta + "" +
                                                                        "  AND CAN.Id_Estructura="+ Id_Estructura +"";
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {
                                    RC_ConsultaAgregacionNumerales item = new RC_ConsultaAgregacionNumerales();

                                    item.Sk_Consulta = int.Parse(oReader["Sk_Consulta"].ToString());
                                    item.Desc_Estructura = oReader["Desc_Estructura"].ToString();
                                    item.Desc_Periodicidad = oReader["Desc_Periodicidad"].ToString();
                                    item.Desc_Fuente = oReader["Desc_Fuente"].ToString();
                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
                                    item.Fecha_Consulta = DateTime.Parse(oReader["Fecha_Consulta"].ToString());
                                    item.Id_Fuente = int.Parse(oReader["Id_Fuente"].ToString());
                                    item.Fecha_Inicial = DateTime.Parse(oReader["Fecha_Inicial"].ToString());
                                    item.Fecha_Final = DateTime.Parse(oReader["Fecha_Final"].ToString());
                                    item.Id_Periodicidad = int.Parse(oReader["Id_Periodicidad"].ToString());
                                    item.Nombre_UsuarioCreacion = oReader["Nombre_UsuarioCreacion"].ToString();
                                    item.Fecha_Creacion = DateTime.Parse(oReader["Fecha_Creacion"].ToString());
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
