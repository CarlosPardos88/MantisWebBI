using EntitiesTD;
using System.Collections.Generic;
using System.Configuration;
using Teradata.Client.Provider;
using System.Data.SqlClient;
using System.Windows;
using System;
using System.Data;
using System.Threading.Tasks;

namespace BIDAL
{
    public class RC_EstructuraAgregacionNumeralesDAL
    {
        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instancia = ConfigurationManager.AppSettings["InstanciaView"].ToString();

        public List<RC_EstructuraAgregacionNumerales> Get_RC_EstructuraAgregacionNumeralesDAL()
        {
            List<RC_EstructuraAgregacionNumerales> list = new List<RC_EstructuraAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select * from " + @instancia + ".V_RC_EstructuraAgregacionNumerales where Cb_Eliminado <> 'S' order by Fecha_Creacion desc";
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {
                                    RC_EstructuraAgregacionNumerales item = new RC_EstructuraAgregacionNumerales();


                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
                                    item.Desc_Estructura = oReader["Desc_Estructura"].ToString();

                                    item.Cb_EsDefinitiva = oReader["Cb_EsDefinitiva"].ToString();
                                    item.Nombre_UsuarioCreacion = oReader["Nombre_UsuarioCreacion"].ToString();
                                    item.Fecha_Creacion = DateTime.Parse(oReader["Fecha_Creacion"].ToString());
                                    item.Cb_Eliminado = oReader["Cb_Eliminado"].ToString();
                                    item.Fecha_Eliminado = null;
                                    item.Nombre_UsuarioEliminacion = oReader["Nombre_UsuarioEliminacion"].ToString();
                                    item.Sk_Lote = int.Parse(oReader["Sk_Lote"].ToString());
                                    item.Sk_Lote_Upd = null;
                                    item.Cod_Severidad = int.Parse(oReader["Cod_Severidad"].ToString());

                                    string fechaIniStr = oReader["Fecha_InicioVigencia"].ToString();
                                    string fechaFinStr = oReader["Fecha_FinVigencia"].ToString();

                                    if (fechaIniStr != null && fechaIniStr.Trim().Length > 0)
                                    {
                                        item.Fecha_InicioVigencia = DateTime.Parse(fechaIniStr);
                                    }
                                    if (fechaFinStr != null && fechaFinStr.Trim().Length > 0)
                                    {
                                        item.Fecha_FinVigencia = DateTime.Parse(fechaFinStr);
                                    }

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

        public List<RC_EstructuraAgregacionNumerales> Get_RC_EstructuraAgregacionNumeralesDAL(string desc)
        {
            List<RC_EstructuraAgregacionNumerales> list = new List<RC_EstructuraAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select * from " + @instancia + ".V_RC_EstructuraAgregacionNumerales "
                                                       + " where Desc_Estructura = ? and Cb_Eliminado <> 'S' ;";
                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter descP = oSqlCmd.CreateParameter();
                        descP.DbType = DbType.String;
                        descP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(descP);
                        descP.Value = desc;

                        oSqlCmd.Prepare();
                        TdDataReader oReader = oSqlCmd.ExecuteReader();

                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {

                                    RC_EstructuraAgregacionNumerales item = new RC_EstructuraAgregacionNumerales();


                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
                                    item.Desc_Estructura = oReader["Desc_Estructura"].ToString();

                                    item.Cb_EsDefinitiva = oReader["Cb_EsDefinitiva"].ToString();
                                    item.Nombre_UsuarioCreacion = oReader["Nombre_UsuarioCreacion"].ToString();
                                    item.Fecha_Creacion = DateTime.Parse(oReader["Fecha_Creacion"].ToString());
                                    item.Cb_Eliminado = oReader["Cb_Eliminado"].ToString();
                                    item.Fecha_Eliminado = null;
                                    item.Nombre_UsuarioEliminacion = oReader["Nombre_UsuarioEliminacion"].ToString();
                                    item.Sk_Lote = int.Parse(oReader["Sk_Lote"].ToString());
                                    item.Sk_Lote_Upd = null;
                                    item.Cod_Severidad = int.Parse(oReader["Cod_Severidad"].ToString());

                                    string fechaIniStr = oReader["Fecha_InicioVigencia"].ToString();
                                    string fechaFinStr = oReader["Fecha_FinVigencia"].ToString();

                                    if (fechaIniStr != null && fechaIniStr.Trim().Length > 0)
                                    {
                                        item.Fecha_InicioVigencia = DateTime.Parse(fechaIniStr);
                                    }
                                    if (fechaFinStr != null && fechaFinStr.Trim().Length > 0)
                                    {
                                        item.Fecha_FinVigencia = DateTime.Parse(fechaFinStr);
                                    }

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

        public List<RC_EstructuraAgregacionNumerales> Get_RC_EstructuraAgregacionNumeralesByIdNameDAL(int Id, string desc)
        {
            List<RC_EstructuraAgregacionNumerales> list = new List<RC_EstructuraAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select * from " + @instancia + ".V_RC_EstructuraAgregacionNumerales EST"
                            + " JOIN " + @instancia + ".V_RC_NodoContableAgregacionNumerales NOD "
                            + " ON EST.Id_Estructura = NOD.Id_Estructura"
                            + " LEFT JOIN " + @instancia + ".V_RC_FormulacionVerticalNodoagrNumerales FORM "
                            + " ON FORM.Sk_NodoContable = NOD.Sk_NodoContable"
                            + " LEFT JOIN " + @instancia + ".V_RC_Rel_NodoAgrNumerales_NumeralCambiario AGR"
                            + " ON AGR.Sk_NodoContable = NOD.Sk_NodoContable "
                            + " where EST.Id_Estructura = ? and EST.Desc_Estructura = ? and EST.Cb_Eliminado <> 'S' ;";
                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter idP = oSqlCmd.CreateParameter();
                        idP.DbType = DbType.Int64;
                        idP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(idP);
                        idP.Value = Id;

                        TdParameter descP = oSqlCmd.CreateParameter();
                        descP.DbType = DbType.String;
                        descP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(descP);
                        descP.Value = desc;


                        oSqlCmd.Prepare();
                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {

                                    RC_EstructuraAgregacionNumerales item = new RC_EstructuraAgregacionNumerales();


                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
                                    item.Desc_Estructura = oReader["Desc_Estructura"].ToString();

                                    item.Cb_EsDefinitiva = oReader["Cb_EsDefinitiva"].ToString();
                                    item.Nombre_UsuarioCreacion = oReader["Nombre_UsuarioCreacion"].ToString();
                                    item.Fecha_Creacion = DateTime.Parse(oReader["Fecha_Creacion"].ToString());
                                    item.Cb_Eliminado = oReader["Cb_Eliminado"].ToString();
                                    item.Fecha_Eliminado = null;
                                    item.Nombre_UsuarioEliminacion = oReader["Nombre_UsuarioEliminacion"].ToString();
                                    item.Sk_Lote = int.Parse(oReader["Sk_Lote"].ToString());
                                    item.Sk_Lote_Upd = null;
                                    item.Cod_Severidad = int.Parse(oReader["Cod_Severidad"].ToString());

                                    string fechaIniStr = oReader["Fecha_InicioVigencia"].ToString();
                                    string fechaFinStr = oReader["Fecha_FinVigencia"].ToString();

                                    if (fechaIniStr != null && fechaIniStr.Trim().Length > 0)
                                    {
                                        item.Fecha_InicioVigencia = DateTime.Parse(fechaIniStr);
                                    }
                                    if (fechaFinStr != null && fechaFinStr.Trim().Length > 0)
                                    {
                                        item.Fecha_FinVigencia = DateTime.Parse(fechaFinStr);
                                    }

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
        public List<RC_EstructuraAgregacionNumerales> Get_RC_EstructuraAgregacionNumeralesByNameIdDAL(int Id, string desc)
        {
            List<RC_EstructuraAgregacionNumerales> list = new List<RC_EstructuraAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select * from " + @instancia + ".V_RC_EstructuraAgregacionNumerales EST" +
                            " where EST.Id_Estructura <> ? and EST.Desc_Estructura = ? and EST.Cb_Eliminado <> 'S' ;";
                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter idP = oSqlCmd.CreateParameter();
                        idP.DbType = DbType.Int64;
                        idP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(idP);
                        idP.Value = Id;

                        TdParameter descP = oSqlCmd.CreateParameter();
                        descP.DbType = DbType.String;
                        descP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(descP);
                        descP.Value = desc;


                        oSqlCmd.Prepare();
                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {

                                    RC_EstructuraAgregacionNumerales item = new RC_EstructuraAgregacionNumerales();


                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
                                    item.Desc_Estructura = oReader["Desc_Estructura"].ToString();

                                    item.Cb_EsDefinitiva = oReader["Cb_EsDefinitiva"].ToString();
                                    item.Nombre_UsuarioCreacion = oReader["Nombre_UsuarioCreacion"].ToString();
                                    item.Fecha_Creacion = DateTime.Parse(oReader["Fecha_Creacion"].ToString());
                                    item.Cb_Eliminado = oReader["Cb_Eliminado"].ToString();
                                    item.Fecha_Eliminado = null;
                                    item.Nombre_UsuarioEliminacion = oReader["Nombre_UsuarioEliminacion"].ToString();
                                    item.Sk_Lote = int.Parse(oReader["Sk_Lote"].ToString());
                                    item.Sk_Lote_Upd = null;
                                    item.Cod_Severidad = int.Parse(oReader["Cod_Severidad"].ToString());

                                    string fechaIniStr = oReader["Fecha_InicioVigencia"].ToString();
                                    string fechaFinStr = oReader["Fecha_FinVigencia"].ToString();

                                    if (fechaIniStr != null && fechaIniStr.Trim().Length > 0)
                                    {
                                        item.Fecha_InicioVigencia = DateTime.Parse(fechaIniStr);
                                    }
                                    if (fechaFinStr != null && fechaFinStr.Trim().Length > 0)
                                    {
                                        item.Fecha_FinVigencia = DateTime.Parse(fechaFinStr);
                                    }

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

        private int Delete_RC_ResultadoDetallaAgregacionNumeralesByNameIdDAL(int Id)
        {
            var result = 0;

        using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {

                    oSqlConnection.Open();

                    using (TdCommand oSqlCmd = new TdCommand())
                    {

                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "DELETE  from " + instancia + ".V_RC_ConsultaAgregacionNumerales where Id_Estructura= ? ;" +
                        "DELETE  from " + instancia + ".V_RC_ResultadoAgregacionNumerales where Id_Estructura= ? ;" +
                        "DELETE  from " + instancia + ".V_RC_DetalleResultadoAgregacionNumerales where Id_Estructura= ? ; ";

                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter idC = oSqlCmd.CreateParameter();
                        idC.DbType = DbType.Int64;
                        idC.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(idC);
                        idC.Value = Id;

                        TdParameter idR = oSqlCmd.CreateParameter();
                        idR.DbType = DbType.Int64;
                        idR.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(idR);
                        idR.Value = Id;

                        TdParameter idD = oSqlCmd.CreateParameter();
                        idD.DbType = DbType.Int64;
                        idD.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(idD);
                        idD.Value = Id;

                        result = oSqlCmd.ExecuteNonQuery();

                        oSqlCmd.Dispose();
                        oSqlConnection.Close();

                    }

                }
                catch (SqlException)
                {
                    result = -1;
                }
                catch (TdException)
                {
                    result = -1;
                }
                catch (FormatException)
                {
                    result = -1;
                }
                catch (OverflowException)
                {
                    result = -1;
                }
            }
            return result;

        }
        
        public List<RC_EstructuraAgregacionNumerales> Get_RC_EstructuraAgregacionNumeralesByUserdDAL(int Id, string user)
        {
            List<RC_EstructuraAgregacionNumerales> list = new List<RC_EstructuraAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "Select * from " + @instancia + ".V_RC_EstructuraAgregacionNumerales EST" +
                            " where EST.Id_Estructura = ? and EST.Nombre_UsuarioCreacion = ? and EST.Cb_Eliminado <> 'S' ;";
                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 30;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter idP = oSqlCmd.CreateParameter();
                        idP.DbType = DbType.Int64;
                        idP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(idP);
                        idP.Value = Id;

                    
                        TdParameter userc = oSqlCmd.CreateParameter();
                        userc.DbType = DbType.String;
                        userc.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(userc);
                        userc.Value = user;


                        oSqlCmd.Prepare();
                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {

                                    RC_EstructuraAgregacionNumerales item = new RC_EstructuraAgregacionNumerales();


                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
                                    item.Desc_Estructura = oReader["Desc_Estructura"].ToString();

                                    item.Cb_EsDefinitiva = oReader["Cb_EsDefinitiva"].ToString();
                                    item.Nombre_UsuarioCreacion = oReader["Nombre_UsuarioCreacion"].ToString();
                                    item.Fecha_Creacion = DateTime.Parse(oReader["Fecha_Creacion"].ToString());
                                    item.Cb_Eliminado = oReader["Cb_Eliminado"].ToString();
                                    item.Fecha_Eliminado = null;
                                    item.Nombre_UsuarioEliminacion = oReader["Nombre_UsuarioEliminacion"].ToString();
                                    item.Sk_Lote = int.Parse(oReader["Sk_Lote"].ToString());
                                    item.Sk_Lote_Upd = null;
                                    item.Cod_Severidad = int.Parse(oReader["Cod_Severidad"].ToString());

                                    string fechaIniStr = oReader["Fecha_InicioVigencia"].ToString();
                                    string fechaFinStr = oReader["Fecha_FinVigencia"].ToString();

                                    if (fechaIniStr != null && fechaIniStr.Trim().Length > 0)
                                    {
                                        item.Fecha_InicioVigencia = DateTime.Parse(fechaIniStr);
                                    }
                                    if (fechaFinStr != null && fechaFinStr.Trim().Length > 0)
                                    {
                                        item.Fecha_FinVigencia = DateTime.Parse(fechaFinStr);
                                    }

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
        public int Post_RC_EstructuraAgregacionNumeralesDAL(RC_EstructuraAgregacionNumerales estructura)
        {
            var result = 0;

            DateTime centuryBegin = new DateTime(2001, 1, 1);
            DateTime currentDate = DateTime.Now;

            long elapsedTicks = currentDate.Ticks - centuryBegin.Ticks;
            TimeSpan elapsedSpan = new TimeSpan(elapsedTicks);

            int lote = Convert.ToInt32(elapsedSpan.TotalSeconds);

            var resultaC = Get_RC_EstructuraAgregacionNumeralesDAL(estructura.Desc_Estructura);
            
            if (resultaC.Count < 1)
            {

                using (TdConnection oSqlConnection = new TdConnection(Cnn))
                {
                    try
                    {
                        oSqlConnection.Open();



                        using (TdCommand oSqlCmd = new TdCommand())
                        {

                            oSqlCmd.Parameters.Clear();
                            oSqlCmd.CommandText = "INSERT INTO " + instancia + ".V_RC_EstructuraAgregacionNumerales " +
                                                "(Id_Estructura, Desc_Estructura, Fecha_InicioVigencia, Fecha_FinVigencia, Cb_EsDefinitiva," +
                                                "Nombre_UsuarioCreacion, Fecha_Creacion, Cb_Eliminado, Fecha_Eliminado, Nombre_UsuarioEliminacion," +
                                                "Sk_Lote, Sk_Lote_Upd, Cod_Severidad )" +
                                                "  VALUES " +
                                                " ((SEL COALESCE(MAX(Id_Estructura), 0) + 1 FROM " + instancia + ".V_RC_EstructuraAgregacionNumerales)," +
                                                "?, ?, ?, ?, ?, CURRENT_DATE, 'N', null, null, ?, null, 1); ";
                            oSqlCmd.CommandType = CommandType.Text;
                            oSqlCmd.CommandTimeout = 30;
                            oSqlCmd.Connection = oSqlConnection;

                            TdParameter Desc_EstructuraP = oSqlCmd.CreateParameter();
                            Desc_EstructuraP.DbType = DbType.String;
                            Desc_EstructuraP.Direction = ParameterDirection.Input;
                            oSqlCmd.Parameters.Add(Desc_EstructuraP);
                            Desc_EstructuraP.Value = estructura.Desc_Estructura;

                            TdParameter Fecha_InicioVigenciaP = oSqlCmd.CreateParameter();
                            Fecha_InicioVigenciaP.DbType = DbType.DateTime;
                            Fecha_InicioVigenciaP.Direction = ParameterDirection.Input;
                            Fecha_InicioVigenciaP.IsNullable = true;
                            object v;
                            if (estructura.Fecha_InicioVigencia != null)
                            {
                                v = estructura.Fecha_InicioVigencia;
                            }
                            else
                            {
                                v = System.DBNull.Value;
                            }

                            oSqlCmd.Parameters.Add(Fecha_InicioVigenciaP);
                            Fecha_InicioVigenciaP.Value = v;


                            TdParameter Fecha_FinVigenciaP = oSqlCmd.CreateParameter();
                            Fecha_FinVigenciaP.DbType = DbType.DateTime;
                            Fecha_FinVigenciaP.Direction = ParameterDirection.Input;
                            Fecha_FinVigenciaP.IsNullable = true;
                            if (estructura.Fecha_FinVigencia != null)
                            {
                                v = estructura.Fecha_FinVigencia;
                            }
                            else
                            {
                                v = System.DBNull.Value;
                            }
                            oSqlCmd.Parameters.Add(Fecha_FinVigenciaP);
                            Fecha_FinVigenciaP.Value = v;

                            TdParameter Cb_EsDefinitivaP = oSqlCmd.CreateParameter();
                            Cb_EsDefinitivaP.DbType = DbType.String;
                            Cb_EsDefinitivaP.Direction = ParameterDirection.Input;

                            oSqlCmd.Parameters.Add(Cb_EsDefinitivaP);
                            Cb_EsDefinitivaP.Value = estructura.Cb_EsDefinitiva;

                            TdParameter Nombre_UsuarioCreacionP = oSqlCmd.CreateParameter();
                            Nombre_UsuarioCreacionP.DbType = DbType.String;
                            Nombre_UsuarioCreacionP.Direction = ParameterDirection.Input;
                            oSqlCmd.Parameters.Add(Nombre_UsuarioCreacionP);
                            Nombre_UsuarioCreacionP.Value = estructura.Nombre_UsuarioCreacion;

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
                    catch (SqlException)
                    {
                        result = -1;
                    }
                    catch (TdException)
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

                if (result > 0)
                {

                    foreach (Nodo nodo in estructura.Nodos)
                    {
                        if (nodo.level > 0)
                        {

                            
                            using (TdConnection oSqlConnection = new TdConnection(Cnn))
                            {

                                oSqlConnection.Open();

                                using (TdCommand oSqlCmd = new TdCommand())
                                {
                                    string cco="";
                                    if (nodo.idnumeralcco >= 0)
                                    {
                                         cco = "INSERT INTO " + instancia + ".V_RC_Rel_NodoAgrNumerales_NumeralCambiario " +
                                                                "(Sk_NodoContable, Id_Fuente, Sk_RCNumeralCambiario, Sk_Lote, Sk_Lote_Upd, Cod_Severidad)" +
                                                                "Values" +
                                                                "((SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales where Desc_NodoContable = ? AND Id_NodoContable = ? AND  Id_Estructura = (SEL Id_Estructura  FROM " + instancia + ".V_RC_EstructuraAgregacionNumerales where Desc_Estructura=?))," +
                                                                "2, ?, ?, NULL, 1)";
                                    }
                                    oSqlCmd.Parameters.Clear();
                                    oSqlCmd.CommandText = "INSERT INTO " + instancia + ".V_RC_NodoContableAgregacionNumerales " +
                                                        "(Sk_NodoContable,Id_Estructura,Id_NodoContable,Desc_NodoContable, Sk_NodoContablePadre, Num_Nivel, Num_Orden," +
                                                        "Nombre_UsuarioCreacion, Fecha_Creacion, Cb_Eliminado, Fecha_Eliminado, Nombre_UsuarioEliminacion," +
                                                        "Sk_Lote, Sk_Lote_Upd, Cod_Severidad )" +
                                                        "  SELECT " +
                                                        " (SEL COALESCE(MAX(Sk_NodoContable), 0) + 1 FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales)," +
                                                        " (SEL Id_Estructura  FROM " + instancia + ".V_RC_EstructuraAgregacionNumerales where Desc_Estructura=?)," +
                                                        "?, ?, COALESCE((SEL Sk_NodoContable FROM  " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Desc_NodoContable = ? AND Id_NodoContable = ? AND Id_Estructura = (SEL Id_Estructura  FROM " + instancia + ".V_RC_EstructuraAgregacionNumerales where Desc_Estructura=?)),'-1') , ?, ?, ?, CURRENT_DATE, 'N', null, null, ?, null, 1; " +
                                                        "INSERT INTO " + instancia + ".V_RC_Rel_NodoAgrNumerales_NumeralCambiario " +
                                                        "(Sk_NodoContable, Id_Fuente, Sk_RCNumeralCambiario, Sk_Lote, Sk_Lote_Upd, Cod_Severidad)" +
                                                        "Values" +
                                                        "((SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales where Desc_NodoContable = ? AND Id_NodoContable = ? AND  Id_Estructura = (SEL Id_Estructura  FROM " + instancia + ".V_RC_EstructuraAgregacionNumerales where Desc_Estructura=?))," +
                                                        "1, ?, ?, NULL, 1);" + cco;
                                    oSqlCmd.CommandType = CommandType.Text;
                                    oSqlCmd.CommandTimeout = 30;
                                    oSqlCmd.Connection = oSqlConnection;


                                    TdParameter Desc_Estructura = oSqlCmd.CreateParameter();
                                    Desc_Estructura.DbType = DbType.String;
                                    Desc_Estructura.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Desc_Estructura);
                                    Desc_Estructura.Value = estructura.Desc_Estructura;

                                    TdParameter Id_NodoContable = oSqlCmd.CreateParameter();
                                    Id_NodoContable.DbType = DbType.String;
                                    Id_NodoContable.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Id_NodoContable);
                                    Id_NodoContable.Value = nodo.Id_NodoContable;


                                    TdParameter Desc_NodoContable = oSqlCmd.CreateParameter();
                                    Desc_NodoContable.DbType = DbType.String;
                                    Desc_NodoContable.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Desc_NodoContable);
                                    Desc_NodoContable.Value = nodo.name;

                                    TdParameter Desc_NodoContable4 = oSqlCmd.CreateParameter();
                                    Desc_NodoContable4.DbType = DbType.String;
                                    Desc_NodoContable4.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Desc_NodoContable4);
                                    Desc_NodoContable4.Value = nodo.Desc_NodoContablePadre;


                                    TdParameter Id_NodoContable2 = oSqlCmd.CreateParameter();
                                    Id_NodoContable2.DbType = DbType.String;
                                    Id_NodoContable2.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Id_NodoContable2);
                                    Id_NodoContable2.Value = nodo.Id_NodoContablePadre;

                                    TdParameter Desc_Estructura2 = oSqlCmd.CreateParameter();
                                    Desc_Estructura2.DbType = DbType.String;
                                    Desc_Estructura2.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Desc_Estructura2);
                                    Desc_Estructura2.Value = estructura.Desc_Estructura;


                                    TdParameter Num_Nivel = oSqlCmd.CreateParameter();
                                    Num_Nivel.DbType = DbType.String;
                                    Num_Nivel.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Num_Nivel);
                                    Num_Nivel.Value = nodo.level;

                                    TdParameter Num_Orden = oSqlCmd.CreateParameter();
                                    Num_Orden.DbType = DbType.String;
                                    Num_Orden.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Num_Orden);
                                    Num_Orden.Value = nodo.orden;

                                    TdParameter Nombre_UsuarioCreacionN = oSqlCmd.CreateParameter();
                                    Nombre_UsuarioCreacionN.DbType = DbType.String;
                                    Nombre_UsuarioCreacionN.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Nombre_UsuarioCreacionN);
                                    Nombre_UsuarioCreacionN.Value = estructura.Nombre_UsuarioCreacion;

                                    TdParameter loteN = oSqlCmd.CreateParameter();
                                    loteN.DbType = DbType.Int32;
                                    loteN.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(loteN);
                                    loteN.Value = lote;

                                    TdParameter Desc_NodoContableh = oSqlCmd.CreateParameter();
                                    Desc_NodoContableh.DbType = DbType.String;
                                    Desc_NodoContableh.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Desc_NodoContableh);
                                    Desc_NodoContableh.Value = nodo.name;

                                    TdParameter Id_NodoContable3 = oSqlCmd.CreateParameter();
                                    Id_NodoContable3.DbType = DbType.String;
                                    Id_NodoContable3.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Id_NodoContable3);
                                    Id_NodoContable3.Value = nodo.Id_NodoContable;

                                    TdParameter Desc_Estructura3 = oSqlCmd.CreateParameter();
                                    Desc_Estructura3.DbType = DbType.String;
                                    Desc_Estructura3.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Desc_Estructura3);
                                    Desc_Estructura3.Value = estructura.Desc_Estructura;

                                    TdParameter Sk_RCNumeralCambiario = oSqlCmd.CreateParameter();
                                    Sk_RCNumeralCambiario.DbType = DbType.Int32;
                                    Sk_RCNumeralCambiario.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(Sk_RCNumeralCambiario);
                                    Sk_RCNumeralCambiario.Value = nodo.Sk_RCNumeralCambiario;

                                    TdParameter loteM = oSqlCmd.CreateParameter();
                                    loteM.DbType = DbType.Int32;
                                    loteM.Direction = ParameterDirection.Input;
                                    oSqlCmd.Parameters.Add(loteM);
                                    loteM.Value = lote;

                                    if (nodo.idnumeralcco>=0)
                                    {
                                        TdParameter Desc_NodoContablecco = oSqlCmd.CreateParameter();
                                        Desc_NodoContablecco.DbType = DbType.String;
                                        Desc_NodoContablecco.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_NodoContablecco);
                                        Desc_NodoContablecco.Value = nodo.name;

                                        TdParameter Id_NodoContablecco = oSqlCmd.CreateParameter();
                                        Id_NodoContablecco.DbType = DbType.String;
                                        Id_NodoContablecco.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_NodoContablecco);
                                        Id_NodoContablecco.Value = nodo.Id_NodoContable;

                                        TdParameter Desc_Estructuracco = oSqlCmd.CreateParameter();
                                        Desc_Estructuracco.DbType = DbType.String;
                                        Desc_Estructuracco.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_Estructuracco);
                                        Desc_Estructuracco.Value = estructura.Desc_Estructura;

                                        TdParameter idnumeralcco = oSqlCmd.CreateParameter();
                                        idnumeralcco.DbType = DbType.Int32;
                                        idnumeralcco.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(idnumeralcco);
                                        idnumeralcco.Value = nodo.idnumeralcco;

                                        TdParameter lotecco = oSqlCmd.CreateParameter();
                                        lotecco.DbType = DbType.Int32;
                                        lotecco.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(lotecco);
                                        lotecco.Value = lote;

                                    }

                                    result = oSqlCmd.ExecuteNonQuery();

                                    oSqlCmd.Dispose();
                                    oSqlConnection.Close();
                                }
                            }
                        }


                    }
                    foreach (Nodo nodo2 in estructura.Nodos)
                    {
                        if (nodo2.formulacion != null)
                        {
                            foreach (Formulacion formulacion in nodo2.formulacion)
                            {
                                using (TdConnection oSqlConnection = new TdConnection(Cnn))
                                {

                                    oSqlConnection.Open();

                                    using (TdCommand oSqlCmd = new TdCommand())
                                    {

                                        oSqlCmd.Parameters.Clear();
                                        oSqlCmd.CommandText = "INSERT INTO " + instancia + ".V_RC_FormulacionVerticalNodoagrNumerales " +
                                                            "(Sk_NodoContable,Sk_NodoContableRelacionado,Desc_Signo," +
                                                            "Sk_Lote, Sk_Lote_Upd, Cod_Severidad )" +
                                                            "  VALUES " +
                                                            " ((SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales where Id_Estructura = (SEL Id_Estructura  FROM " + instancia + ".V_RC_EstructuraAgregacionNumerales where Desc_Estructura=?) AND Id_NodoContable = ? AND Desc_NodoContable = ?)," +
                                                            " (SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales where Id_Estructura = (SEL Id_Estructura  FROM " + instancia + ".V_RC_EstructuraAgregacionNumerales where Desc_Estructura=?) AND Desc_NodoContable = ? AND Sk_NodoContablePadre=(SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales where Id_Estructura = (SEL Id_Estructura  FROM " + instancia + ".V_RC_EstructuraAgregacionNumerales where Desc_Estructura=?) AND Id_NodoContable = ? AND Desc_NodoContable = ?))," +
                                                            " ?,?, null, 1); ";
                                        oSqlCmd.CommandType = CommandType.Text;
                                        oSqlCmd.CommandTimeout = 30;
                                        oSqlCmd.Connection = oSqlConnection;


                                        TdParameter Desc_Estructura = oSqlCmd.CreateParameter();
                                        Desc_Estructura.DbType = DbType.String;
                                        Desc_Estructura.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_Estructura);
                                        Desc_Estructura.Value = estructura.Desc_Estructura;

                                        TdParameter Id_NodoContable = oSqlCmd.CreateParameter();
                                        Id_NodoContable.DbType = DbType.String;
                                        Id_NodoContable.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_NodoContable);
                                        Id_NodoContable.Value = nodo2.Id_NodoContable;

                                        TdParameter Desc_NodoContable = oSqlCmd.CreateParameter();
                                        Desc_NodoContable.DbType = DbType.String;
                                        Desc_NodoContable.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_NodoContable);
                                        Desc_NodoContable.Value = nodo2.name;

                                        TdParameter Desc_Estructura2 = oSqlCmd.CreateParameter();
                                        Desc_Estructura2.DbType = DbType.String;
                                        Desc_Estructura2.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_Estructura2);
                                        Desc_Estructura2.Value = estructura.Desc_Estructura;


                                        TdParameter Desc_NodoContable2 = oSqlCmd.CreateParameter();
                                        Desc_NodoContable2.DbType = DbType.String;
                                        Desc_NodoContable2.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_NodoContable2);
                                        Desc_NodoContable2.Value = formulacion.name;

                                        TdParameter Desc_Estructura3 = oSqlCmd.CreateParameter();
                                        Desc_Estructura3.DbType = DbType.String;
                                        Desc_Estructura3.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_Estructura3);
                                        Desc_Estructura3.Value = estructura.Desc_Estructura;

                                        TdParameter Id_NodoContable2 = oSqlCmd.CreateParameter();
                                        Id_NodoContable2.DbType = DbType.String;
                                        Id_NodoContable2.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_NodoContable2);
                                        Id_NodoContable2.Value = nodo2.Id_NodoContable;

                                        TdParameter Desc_NodoContable3 = oSqlCmd.CreateParameter();
                                        Desc_NodoContable3.DbType = DbType.String;
                                        Desc_NodoContable3.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_NodoContable3);
                                        Desc_NodoContable3.Value = nodo2.name;

                                        TdParameter Desc_Signo = oSqlCmd.CreateParameter();
                                        Desc_Signo.DbType = DbType.String;
                                        Desc_Signo.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_Signo);
                                        Desc_Signo.Value = formulacion.Signo;

                                        TdParameter loteN = oSqlCmd.CreateParameter();
                                        loteN.DbType = DbType.Int32;
                                        loteN.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(loteN);
                                        loteN.Value = lote;

                                        result = oSqlCmd.ExecuteNonQuery();

                                        oSqlCmd.Dispose();
                                        oSqlConnection.Close();
                                    }
                                }
                            }
                        }

                    }
                }
                return result;
            }
            else
            {
                return 99;
            }



        }

        public int Put_RC_EstructuraAgregacionNumeralesDAL(int Id_Estructuta, RC_EstructuraAgregacionNumerales estructura)
        {
            var result = 0;

            DateTime centuryBegin = new DateTime(2001, 1, 1);
            DateTime currentDate = DateTime.Now;
            long elapsedTicks = currentDate.Ticks - centuryBegin.Ticks;
            TimeSpan elapsedSpan = new TimeSpan(elapsedTicks);
            int loteupd = Convert.ToInt32(elapsedSpan.TotalSeconds);

            var estructuraU = this.Get_RC_EstructuraAgregacionNumeralesByUserdDAL(Id_Estructuta, estructura.Nombre_UsuarioCreacion);
            var estructuraP = this.Get_RC_EstructuraAgregacionNumeralesByNameIdDAL(Id_Estructuta, estructura.Desc_Estructura);

            if ((estructuraU.Count == 1) || (estructura.perfil=="Administrador"))
            {
                if (estructuraP.Count < 1)
            {


                using (TdConnection oSqlConnection = new TdConnection(Cnn))
                {
                    try
                    {


                        oSqlConnection.Open();

                        using (TdCommand oSqlCmd = new TdCommand())
                        {
                            oSqlCmd.Parameters.Clear();
                            oSqlCmd.CommandText = "UPDATE " + instancia + ".V_RC_EstructuraAgregacionNumerales " +
                                                    "SET Desc_Estructura = ? " +
                                                    ",Fecha_InicioVigencia = ?" +
                                                    ",Fecha_FinVigencia = ?" +
                                                    ",Cb_EsDefinitiva = ?" +
                                                    ",Cb_Eliminado = ?" +
                                                    ",Fecha_Eliminado = ?" +
                                                    ",Nombre_UsuarioEliminacion = ?" +
                                                    ",Sk_Lote_Upd = ?" +
                                                    "WHERE Id_Estructura = ?;";

                            oSqlCmd.CommandType = CommandType.Text;
                            oSqlCmd.CommandTimeout = 30;
                            oSqlCmd.Connection = oSqlConnection;

                            TdParameter Desc_EstructuraP = oSqlCmd.CreateParameter();
                            Desc_EstructuraP.DbType = DbType.String;
                            Desc_EstructuraP.Direction = ParameterDirection.Input;
                            oSqlCmd.Parameters.Add(Desc_EstructuraP);
                            Desc_EstructuraP.Value = estructura.Desc_Estructura;

                            TdParameter Fecha_InicioVigenciaP = oSqlCmd.CreateParameter();
                            Fecha_InicioVigenciaP.DbType = DbType.DateTime;
                            Fecha_InicioVigenciaP.Direction = ParameterDirection.Input;
                            Fecha_InicioVigenciaP.IsNullable = true;
                            object v;
                            if (estructura.Fecha_InicioVigencia != null)
                            {
                                v = estructura.Fecha_InicioVigencia;
                            }
                            else
                            {
                                v = System.DBNull.Value;
                            }
                            oSqlCmd.Parameters.Add(Fecha_InicioVigenciaP);
                            Fecha_InicioVigenciaP.Value = v;

                            TdParameter Fecha_FinVigenciaP = oSqlCmd.CreateParameter();
                            Fecha_FinVigenciaP.DbType = DbType.DateTime;
                            Fecha_FinVigenciaP.Direction = ParameterDirection.Input;
                            Fecha_FinVigenciaP.IsNullable = true;
                            if (estructura.Fecha_FinVigencia != null)
                            {
                                v = estructura.Fecha_FinVigencia;
                            }
                            else
                            {
                                v = System.DBNull.Value;
                            }
                            oSqlCmd.Parameters.Add(Fecha_FinVigenciaP);
                            Fecha_FinVigenciaP.Value = v;

                            TdParameter Cb_EsDefinitivaP = oSqlCmd.CreateParameter();
                            Cb_EsDefinitivaP.DbType = DbType.String;
                            Cb_EsDefinitivaP.Direction = ParameterDirection.Input;
                            oSqlCmd.Parameters.Add(Cb_EsDefinitivaP);
                            Cb_EsDefinitivaP.Value = estructura.Cb_EsDefinitiva;

                            TdParameter Cb_EliminadoP = oSqlCmd.CreateParameter();
                            Cb_EliminadoP.DbType = DbType.String;
                            Cb_EliminadoP.Direction = ParameterDirection.Input;
                            oSqlCmd.Parameters.Add(Cb_EliminadoP);
                            Cb_EliminadoP.Value = estructura.Cb_Eliminado;


                                if (estructura.Cb_Eliminado == "S")
                                {
                                  
                                        TdParameter Fecha_EliminadoP = oSqlCmd.CreateParameter();
                                        Fecha_EliminadoP.DbType = DbType.DateTime;
                                        Fecha_EliminadoP.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Fecha_EliminadoP);
                                        Fecha_EliminadoP.Value = currentDate;
                                    
                                   
                                }
                                else {

                                    TdParameter Fecha_EliminadoP = oSqlCmd.CreateParameter();
                                    Fecha_EliminadoP.DbType = DbType.DateTime;
                                    Fecha_EliminadoP.Direction = ParameterDirection.Input;
                                    Fecha_EliminadoP.IsNullable = true;
                                 
                                        v = System.DBNull.Value;
                                 
                                    oSqlCmd.Parameters.Add(Fecha_EliminadoP);
                                    Fecha_EliminadoP.Value = v;

                                }

                          

                            TdParameter Nombre_UsuarioEliminacionP = oSqlCmd.CreateParameter();
                            Nombre_UsuarioEliminacionP.DbType = DbType.String;
                            Nombre_UsuarioEliminacionP.Direction = ParameterDirection.Input;
                            oSqlCmd.Parameters.Add(Nombre_UsuarioEliminacionP);
                            Nombre_UsuarioEliminacionP.Value = estructura.Nombre_UsuarioEliminacion;

                            TdParameter loteUpdP = oSqlCmd.CreateParameter();
                            loteUpdP.DbType = DbType.Int32;
                            loteUpdP.Direction = ParameterDirection.Input;
                            oSqlCmd.Parameters.Add(loteUpdP);
                            loteUpdP.Value = loteupd;

                            TdParameter Id_EstructutaP = oSqlCmd.CreateParameter();
                            Id_EstructutaP.DbType = DbType.Int32;
                            Id_EstructutaP.Direction = ParameterDirection.Input;
                            oSqlCmd.Parameters.Add(Id_EstructutaP);
                            Id_EstructutaP.Value = Id_Estructuta;

                            result = oSqlCmd.ExecuteNonQuery();

                            oSqlCmd.Dispose();
                            oSqlConnection.Close();
                        }

                    }
                    catch (SqlException)
                    {
                        result = -1;
                    }
                    catch (TdException )
                    {
                        result = -1;
                    }
                    catch (FormatException)
                    {
                        result = -1;
                    }
                    catch (OverflowException)
                    {
                        result = -1;
                    }
                }
                if (estructura.NodosEliminados != null)
                {
                    foreach (Nodo nodoeliminado in estructura.NodosEliminados)
                    {

                        using (TdConnection oSqlConnection = new TdConnection(Cnn))
                        {

                            oSqlConnection.Open();

                            using (TdCommand oSqlCmd = new TdCommand())
                            {

                                oSqlCmd.Parameters.Clear();
                                oSqlCmd.CommandText =
                                " UPDATE " + instancia + ".V_RC_NodoContableAgregacionNumerales" +
                                " SET Cb_Eliminado = 'S'," +
                                " Fecha_Eliminado = CURRENT_DATE, " +
                                " Nombre_UsuarioEliminacion = ? " +
                                " where Sk_NodoContable = ? ";

                                oSqlCmd.CommandType = CommandType.Text;
                                oSqlCmd.CommandTimeout = 30;
                                oSqlCmd.Connection = oSqlConnection;

                                TdParameter Nombre_UsuarioEliminacion = oSqlCmd.CreateParameter();
                                Nombre_UsuarioEliminacion.DbType = DbType.String;
                                Nombre_UsuarioEliminacion.Direction = ParameterDirection.Input;
                                oSqlCmd.Parameters.Add(Nombre_UsuarioEliminacion);
                                Nombre_UsuarioEliminacion.Value = estructura.Nombre_UsuarioCreacion;

                                TdParameter Sk_NodoContable = oSqlCmd.CreateParameter();
                                Sk_NodoContable.DbType = DbType.String;
                                Sk_NodoContable.Direction = ParameterDirection.Input;
                                oSqlCmd.Parameters.Add(Sk_NodoContable);
                                Sk_NodoContable.Value = nodoeliminado.Sk_NodoContable;

                                result = oSqlCmd.ExecuteNonQuery();

                                oSqlCmd.Dispose();
                                oSqlConnection.Close();
                            }
                        }


                    }

                }
                if (estructura.Nodos != null)
                {

                    foreach (Nodo nodo in estructura.Nodos)
                    {
                        if (nodo.Id_NodoContable != 0)
                        {
                            if (nodo.level > 0)
                            {
                                using (TdConnection oSqlConnection = new TdConnection(Cnn))
                                {

                                    oSqlConnection.Open();

                                    using (TdCommand oSqlCmd = new TdCommand())
                                    {

                                            string cco = "";
                                            if (nodo.idnumeralcco >= 0)
                                            {
                                                cco = "INSERT INTO " + instancia + ".V_RC_Rel_NodoAgrNumerales_NumeralCambiario " +
                                                                       "(Sk_NodoContable, Id_Fuente, Sk_RCNumeralCambiario, Sk_Lote, Sk_Lote_Upd, Cod_Severidad)" +
                                                                       "Values" +
                                                                       "((SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales where Id_NodoContable = ? AND  Id_Estructura = (SEL Id_Estructura  FROM " + instancia + ".V_RC_EstructuraAgregacionNumerales where Desc_Estructura=?))," +
                                                                       "2, ?, ?, NULL, 1)";
                                            }
                                            oSqlCmd.Parameters.Clear();
                                        oSqlCmd.CommandText =
                                        "MERGE INTO " + instancia + ".V_RC_NodoContableAgregacionNumerales AS T1 " +
                                        " USING( " +
                                        "SELECT " +
                                        " COALESCE(ACt.SK_NodoContable,T.Sk_NodoContable)Sk_NodoContable,  " +
                                        " T.Id_estructura," +
                                        " T.id_nodocontable," +
                                        " T.desc_nodocontable," +
                                        " T.Sk_NodoContablePadre," +
                                        " T.Num_Nivel," +
                                        " T.Num_Orden,T.Nombre_UsuarioCreacion, T.Fecha_Creacion,T.Cb_Eliminado, T.Fecha_Eliminado, " +
                                        " T.Nombre_UsuarioEliminacion, T.Sk_Lote, T.Sk_Lote_Upd, T.Cod_Severidad " +
                                        " FROM ( " +
                                        " SELECT (SEL COALESCE(MAX(Sk_NodoContable), 0) + 1 FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales) Sk_NodoContable, " +
                                        " ? Id_estructura, ? id_nodocontable, ? desc_nodocontable, " +
                                        " COALESCE((SEL Sk_NodoContable FROM  " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE " +
                                        //"Desc_NodoContable = ? AND" +
                                        " Id_NodoContable = ? AND Id_Estructura = ?),'-1') Sk_NodoContablePadre , " +
                                        " ? Num_Nivel, ? Num_Orden, ? Nombre_UsuarioCreacion, CURRENT_DATE Fecha_Creacion, 'N' Cb_Eliminado,  NULL Fecha_Eliminado, NULL Nombre_UsuarioEliminacion," +
                                        " ? Sk_Lote, NULL Sk_Lote_Upd, 1 Cod_Severidad " +
                                        " ) AS T " +
                                        " LEFT JOIN " + instancia + ".V_RC_NodoContableAgregacionNumerales ACT " +
                                        "   ON ACT.Cb_Eliminado='N' AND  ACT.Id_NodoContable=? AND ACT.Id_Estructura=? " +
                                        " ) AS T2 " +
                                        " ON (T1.Sk_nodoContable = T2.Sk_nodoContable) " +
                                        " WHEN MATCHED THEN " +
                                        " UPDATE " +
                                        " SET Desc_NodoContable = ? " +
                                        " ,Num_Nivel = ? " +
                                        " ,Sk_NodoContablePadre = T2.Sk_NodoContablePadre " +
                                        " ,Num_Orden = T2.Num_Orden " +
                                        " ,Nombre_UsuarioCreacion = ?" +
                                        " ,Sk_Lote_Upd = ? " +
                                        "WHEN NOT MATCHED THEN " +
                                        " INSERT (Sk_NodoContable,Id_Estructura,Id_NodoContable,Desc_NodoContable, Sk_NodoContablePadre,Num_Nivel, Num_Orden,  Nombre_UsuarioCreacion, Fecha_Creacion," +
                                        " Cb_Eliminado, Fecha_Eliminado, Nombre_UsuarioEliminacion, Sk_Lote, Sk_Lote_Upd, Cod_Severidad ) " +
                                        " VALUES (" +
                                        "  T2.Sk_NodoContable, T2.Id_Estructura, T2.Id_NodoContable, T2.Desc_NodoContable, trim(T2.Sk_NodoContablePadre), T2.Num_Nivel, T2.Num_Orden,  T2.Nombre_UsuarioCreacion, " +
                                        "  T2.Fecha_Creacion, T2.Cb_Eliminado, T2.Fecha_Eliminado, T2.Nombre_UsuarioEliminacion, T2.Sk_Lote, T2.Sk_Lote_Upd, T2.Cod_Severidad );" +
                                        " DELETE FROM " + instancia + ".V_RC_Rel_NodoAgrNumerales_NumeralCambiario " +
                                        " WHERE Sk_NodoContable = (SEL Sk_NodoContable FROM  " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Id_NodoContable = ? AND Id_Estructura =?);" +
                                         " INSERT INTO " + instancia + ".V_RC_Rel_NodoAgrNumerales_NumeralCambiario " +
                                                        " (Sk_NodoContable, Id_Fuente, Sk_RCNumeralCambiario, Sk_Lote, Sk_Lote_Upd, Cod_Severidad)" +
                                                        " Values" +
                                                        " ((SEL Sk_NodoContable FROM  " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Desc_NodoContable = ? AND Id_NodoContable = ? AND Id_Estructura =?)," +
                                                        " 1, ?, ?, NULL, 1);" + cco;

                                        oSqlCmd.CommandType = CommandType.Text;
                                        oSqlCmd.CommandTimeout = 30;
                                        oSqlCmd.Connection = oSqlConnection;

                                        TdParameter Id_Estructura = oSqlCmd.CreateParameter();
                                        Id_Estructura.DbType = DbType.String;
                                        Id_Estructura.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_Estructura);
                                        Id_Estructura.Value = estructura.Id_Estructura;

                                        TdParameter Id_NodoContable = oSqlCmd.CreateParameter();
                                        Id_NodoContable.DbType = DbType.String;
                                        Id_NodoContable.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_NodoContable);
                                        Id_NodoContable.Value = nodo.Id_NodoContable;

                                        TdParameter Desc_NodoContable = oSqlCmd.CreateParameter();
                                        Desc_NodoContable.DbType = DbType.String;
                                        Desc_NodoContable.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_NodoContable);
                                        Desc_NodoContable.Value = nodo.name;


                                        TdParameter Id_NodoContable2 = oSqlCmd.CreateParameter();
                                        Id_NodoContable2.DbType = DbType.String;
                                        Id_NodoContable2.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_NodoContable2);
                                        Id_NodoContable2.Value = nodo.Id_NodoContablePadre;

                                        TdParameter Id_Estructura2 = oSqlCmd.CreateParameter();
                                        Id_Estructura2.DbType = DbType.String;
                                        Id_Estructura2.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_Estructura2);
                                        Id_Estructura2.Value = estructura.Id_Estructura;

                                        TdParameter Num_Nivel = oSqlCmd.CreateParameter();
                                        Num_Nivel.DbType = DbType.String;
                                        Num_Nivel.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Num_Nivel);
                                        Num_Nivel.Value = nodo.level;

                                        TdParameter Num_Orden = oSqlCmd.CreateParameter();
                                        Num_Orden.DbType = DbType.String;
                                        Num_Orden.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Num_Orden);
                                        Num_Orden.Value = nodo.orden;

                                        TdParameter Nombre_UsuarioCreacionN = oSqlCmd.CreateParameter();
                                        Nombre_UsuarioCreacionN.DbType = DbType.String;
                                        Nombre_UsuarioCreacionN.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Nombre_UsuarioCreacionN);
                                        Nombre_UsuarioCreacionN.Value = estructura.Nombre_UsuarioCreacion;

                                        TdParameter loteN = oSqlCmd.CreateParameter();
                                        loteN.DbType = DbType.Int32;
                                        loteN.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(loteN);
                                        loteN.Value = loteupd;

                                        TdParameter Id_NodoContable3 = oSqlCmd.CreateParameter();
                                        Id_NodoContable3.DbType = DbType.String;
                                        Id_NodoContable3.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_NodoContable3);
                                        Id_NodoContable3.Value = nodo.Id_NodoContable;

                                        TdParameter Id_Estructura3 = oSqlCmd.CreateParameter();
                                        Id_Estructura3.DbType = DbType.String;
                                        Id_Estructura3.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_Estructura3);
                                        Id_Estructura3.Value = estructura.Id_Estructura;

                                        TdParameter Desc_NodoContable1 = oSqlCmd.CreateParameter();
                                        Desc_NodoContable1.DbType = DbType.String;
                                        Desc_NodoContable1.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_NodoContable1);
                                        Desc_NodoContable1.Value = nodo.name;

                                        TdParameter Num_Nivel2 = oSqlCmd.CreateParameter();
                                        Num_Nivel2.DbType = DbType.String;
                                        Num_Nivel2.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Num_Nivel2);
                                        Num_Nivel2.Value = nodo.level;

                                        TdParameter Nombre_UsuarioCreacion = oSqlCmd.CreateParameter();
                                        Nombre_UsuarioCreacion.DbType = DbType.String;
                                        Nombre_UsuarioCreacion.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Nombre_UsuarioCreacion);
                                        Nombre_UsuarioCreacion.Value = estructura.Nombre_UsuarioCreacion;

                                        TdParameter lote = oSqlCmd.CreateParameter();
                                        lote.DbType = DbType.Int32;
                                        lote.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(lote);
                                        lote.Value = loteupd;

                                        TdParameter Id_NodoContable4 = oSqlCmd.CreateParameter();
                                        Id_NodoContable4.DbType = DbType.String;
                                        Id_NodoContable4.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_NodoContable4);
                                        Id_NodoContable4.Value = nodo.Id_NodoContable;

                                        TdParameter Id_Estructura4 = oSqlCmd.CreateParameter();
                                        Id_Estructura4.DbType = DbType.String;
                                        Id_Estructura4.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_Estructura4);
                                        Id_Estructura4.Value = estructura.Id_Estructura;

                                        TdParameter Desc_NodoContable4 = oSqlCmd.CreateParameter();
                                        Desc_NodoContable4.DbType = DbType.String;
                                        Desc_NodoContable4.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Desc_NodoContable4);
                                        Desc_NodoContable4.Value = nodo.name;

                                        TdParameter Id_NodoContable5 = oSqlCmd.CreateParameter();
                                        Id_NodoContable5.DbType = DbType.String;
                                        Id_NodoContable5.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_NodoContable5);
                                        Id_NodoContable5.Value = nodo.Id_NodoContable;

                                        TdParameter Id_Estructura5 = oSqlCmd.CreateParameter();
                                        Id_Estructura5.DbType = DbType.String;
                                        Id_Estructura5.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Id_Estructura5);
                                        Id_Estructura5.Value = estructura.Id_Estructura;

                                        TdParameter Sk_RCNumeralCambiario = oSqlCmd.CreateParameter();
                                        Sk_RCNumeralCambiario.DbType = DbType.Int32;
                                        Sk_RCNumeralCambiario.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(Sk_RCNumeralCambiario);
                                        Sk_RCNumeralCambiario.Value = nodo.Sk_RCNumeralCambiario;

                                        TdParameter loteM = oSqlCmd.CreateParameter();
                                        loteM.DbType = DbType.Int32;
                                        loteM.Direction = ParameterDirection.Input;
                                        oSqlCmd.Parameters.Add(loteM);
                                        loteM.Value = loteupd;

                                            if (nodo.idnumeralcco >= 0)
                                            {
                                            

                                                TdParameter Id_NodoContablecco = oSqlCmd.CreateParameter();
                                                Id_NodoContablecco.DbType = DbType.String;
                                                Id_NodoContablecco.Direction = ParameterDirection.Input;
                                                oSqlCmd.Parameters.Add(Id_NodoContablecco);
                                                Id_NodoContablecco.Value = nodo.Id_NodoContable;

                                                TdParameter Desc_Estructuracco = oSqlCmd.CreateParameter();
                                                Desc_Estructuracco.DbType = DbType.String;
                                                Desc_Estructuracco.Direction = ParameterDirection.Input;
                                                oSqlCmd.Parameters.Add(Desc_Estructuracco);
                                                Desc_Estructuracco.Value = estructura.Desc_Estructura;

                                                TdParameter idnumeralcco = oSqlCmd.CreateParameter();
                                                idnumeralcco.DbType = DbType.Int32;
                                                idnumeralcco.Direction = ParameterDirection.Input;
                                                oSqlCmd.Parameters.Add(idnumeralcco);
                                                idnumeralcco.Value = nodo.idnumeralcco;

                                                TdParameter lotecco = oSqlCmd.CreateParameter();
                                                lotecco.DbType = DbType.Int32;
                                                lotecco.Direction = ParameterDirection.Input;
                                                oSqlCmd.Parameters.Add(lotecco);
                                                lotecco.Value = loteupd;

                                            }



                                            var con = "MERGE INTO " + instancia + ".V_RC_NodoContableAgregacionNumerales AS T1 " +
                                    " USING( " +
                                    "SELECT " +
                                    " COALESCE(ACt.SK_NodoContable,T.Sk_NodoContable)Sk_NodoContable,  " +
                                    " T.Id_estructura," +
                                    " T.id_nodocontable," +
                                    " T.desc_nodocontable," +
                                    " T.Sk_NodoContablePadre," +
                                    " T.Num_Nivel," +
                                    " T.Num_Orden,T.Nombre_UsuarioCreacion, T.Fecha_Creacion,T.Cb_Eliminado, T.Fecha_Eliminado, " +
                                    " T.Nombre_UsuarioEliminacion, T.Sk_Lote, T.Sk_Lote_Upd, T.Cod_Severidad " +
                                    " FROM ( " +
                                    " SELECT (SEL COALESCE(MAX(Sk_NodoContable), 0) + 1 FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales) Sk_NodoContable, " +
                                    " " + estructura.Id_Estructura + " Id_estructura, " + nodo.Id_NodoContable + " id_nodocontable, " + nodo.name + " desc_nodocontable, " +
                                    " COALESCE((SEL Sk_NodoContable FROM  " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Desc_NodoContable = " + nodo.Desc_NodoContablePadre + " AND Id_NodoContable = " + nodo.Id_NodoContablePadre + " AND Id_Estructura = " + estructura.Id_Estructura + "),'-1') Sk_NodoContablePadre , " +
                                    " " + nodo.level + " Num_Nivel, " + nodo.orden + " Num_Orden, " + estructura.Nombre_UsuarioCreacion + " Nombre_UsuarioCreacion, CURRENT_DATE Fecha_Creacion, 'N' Cb_Eliminado,  NULL Fecha_Eliminado, NULL Nombre_UsuarioEliminacion," +
                                    " " + loteupd + " Sk_Lote, NULL Sk_Lote_Upd, 1 Cod_Severidad " +
                                    " ) AS T " +
                                    " LEFT JOIN " + instancia + ".V_RC_NodoContableAgregacionNumerales ACT " +
                                    "   ON ACT.Cb_Eliminado ='N'  AND  ACT.Id_NodoContable=" + nodo.Id_NodoContable + " AND ACT.Id_Estructura=" + estructura.Id_Estructura + " " +
                                    " ) AS T2 " +
                                    " ON (T1.Sk_nodoContable = T2.Sk_nodoContable) " +
                                    " WHEN MATCHED THEN " +
                                    " UPDATE " +
                                    " SET Desc_NodoContable = ? " +
                                    " ,Num_Nivel = ? " +
                                    " ,Sk_NodoContablePadre = T2.Sk_NodoContablePadre " +
                                    " ,Num_Orden = T2.Num_Orden " +
                                    " ,Nombre_UsuarioCreacion = ?" +
                                    " ,Sk_Lote_Upd = ? " +
                                    "WHEN NOT MATCHED THEN " +
                                    " INSERT (Sk_NodoContable,Id_Estructura,Id_NodoContable,Desc_NodoContable, Sk_NodoContablePadre,Num_Nivel, Num_Orden,  Nombre_UsuarioCreacion, Fecha_Creacion," +
                                    " Cb_Eliminado, Fecha_Eliminado, Nombre_UsuarioEliminacion, Sk_Lote, Sk_Lote_Upd, Cod_Severidad ) " +
                                    " VALUES (" +
                                    "  T2.Sk_NodoContable, T2.Id_Estructura, T2.Id_NodoContable, T2.Desc_NodoContable, trim(T2.Sk_NodoContablePadre), T2.Num_Nivel, T2.Num_Orden,  T2.Nombre_UsuarioCreacion, " +
                                    "  T2.Fecha_Creacion, T2.Cb_Eliminado, T2.Fecha_Eliminado, T2.Nombre_UsuarioEliminacion, T2.Sk_Lote, T2.Sk_Lote_Upd, T2.Cod_Severidad );";
                                        result = oSqlCmd.ExecuteNonQuery();

                                        oSqlCmd.Dispose();
                                        oSqlConnection.Close();
                                    }
                                }
                            }
                        }

                    }
                    foreach (Nodo nodo2 in estructura.Nodos)
                    {
                        if (nodo2.Id_NodoContable != 0)
                        {
                            if (nodo2.formulacion != null)
                            {
                                foreach (Formulacion formulacion in nodo2.formulacion)
                                {
                                    using (TdConnection oSqlConnection = new TdConnection(Cnn))
                                    {

                                        oSqlConnection.Open();

                                        using (TdCommand oSqlCmd = new TdCommand())
                                        {

                                            oSqlCmd.Parameters.Clear();
                                            oSqlCmd.CommandText =
                                                 "MERGE INTO " + instancia + ".V_RC_FormulacionVerticalNodoagrNumerales AS T1  USING(" +
                                                 "  SEL T.sk_nodocontable, t.sk_nodocontablerelacionado, t.desc_signo, T.Sk_lote, T.Sk_Lote_Upd, T.Cod_Severidad" +
                                                 " FROM( " +
                                                 " SELECT (SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Id_Estructura = ? AND Id_NodoContable = ? " +
                                                 // " AND Desc_NodoContable = ? " +
                                                 ") sk_nodocontable, " +
                                                 " (SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Id_NodoContable = ? AND Id_Estructura = ?" +
                                                 // " AND Desc_NodoContable = ? " +
                                                 "  AND Sk_NodoContablePadre=(SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Id_Estructura = ? AND Id_NodoContable = ? " +
                                                 //"AND Desc_NodoContable = ?" +
                                                 ") )sk_nodocontablerelacionado ," +
                                                 " ? Desc_Signo, ? Sk_Lote, NULL Sk_Lote_Upd, 1 Cod_Severidad) T ) AS T2 " +
                                                 " ON (T1.Sk_NodoContable = T2.Sk_NodoContable" +
                                                 " AND T1.sk_nodocontablerelacionado=T2.sk_nodocontablerelacionado) " +
                                                 " WHEN MATCHED THEN  UPDATE" +
                                                 " SET Desc_Signo = ?  , Sk_Lote_Upd = ? " +
                                                 " WHEN NOT MATCHED THEN " +
                                                 " INSERT(sk_nodocontable, sk_nodocontableRelacionado, Desc_Signo, Sk_lote, Sk_Lote_Upd,Cod_Severidad )" +
                                                 "VALUES(" +
                                                 " T2.sk_nodocontable,  T2.sk_nodocontableRelacionado, T2.Desc_Signo, T2.Sk_lote, T2.Sk_Lote_Upd, T2.Cod_Severidad" +
                                                 ")";

                                            oSqlCmd.CommandType = CommandType.Text;
                                            oSqlCmd.CommandTimeout = 30;
                                            oSqlCmd.Connection = oSqlConnection;

                                            TdParameter Id_Estructura = oSqlCmd.CreateParameter();
                                            Id_Estructura.DbType = DbType.String;
                                            Id_Estructura.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(Id_Estructura);
                                            Id_Estructura.Value = estructura.Id_Estructura;

                                            TdParameter Id_NodoContable = oSqlCmd.CreateParameter();
                                            Id_NodoContable.DbType = DbType.String;
                                            Id_NodoContable.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(Id_NodoContable);
                                            Id_NodoContable.Value = nodo2.Id_NodoContable;

                                            TdParameter Id_NodoContable6 = oSqlCmd.CreateParameter();
                                            Id_NodoContable6.DbType = DbType.String;
                                            Id_NodoContable6.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(Id_NodoContable6);
                                            Id_NodoContable6.Value = formulacion.Id_NodoContable;
                                            // Id_NodoContable6.Value = ;


                                            TdParameter Id_Estructura2 = oSqlCmd.CreateParameter();
                                            Id_Estructura2.DbType = DbType.String;
                                            Id_Estructura2.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(Id_Estructura2);
                                            Id_Estructura2.Value = estructura.Id_Estructura;

                                          
                                            TdParameter Id_Estructura3 = oSqlCmd.CreateParameter();
                                            Id_Estructura3.DbType = DbType.String;
                                            Id_Estructura3.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(Id_Estructura3);
                                            Id_Estructura3.Value = estructura.Id_Estructura;

                                            TdParameter Id_NodoContable2 = oSqlCmd.CreateParameter();
                                            Id_NodoContable2.DbType = DbType.String;
                                            Id_NodoContable2.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(Id_NodoContable2);
                                            Id_NodoContable2.Value = nodo2.Id_NodoContable;

                                            TdParameter Desc_Signo = oSqlCmd.CreateParameter();
                                            Desc_Signo.DbType = DbType.String;
                                            Desc_Signo.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(Desc_Signo);
                                            Desc_Signo.Value = formulacion.Signo;

                                            TdParameter loteN = oSqlCmd.CreateParameter();
                                            loteN.DbType = DbType.Int32;
                                            loteN.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(loteN);
                                            loteN.Value = loteupd;

                                            TdParameter Desc_Signo2 = oSqlCmd.CreateParameter();
                                            Desc_Signo2.DbType = DbType.String;
                                            Desc_Signo2.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(Desc_Signo2);
                                            Desc_Signo2.Value = formulacion.Signo;

                                            TdParameter lote2 = oSqlCmd.CreateParameter();
                                            lote2.DbType = DbType.Int32;
                                            lote2.Direction = ParameterDirection.Input;
                                            oSqlCmd.Parameters.Add(lote2);
                                            lote2.Value = loteupd;

                                            var con = "MERGE INTO " + instancia + ".V_RC_FormulacionVerticalNodoagrNumerales AS T1  USING(" +
                                        "  SEL T.sk_nodocontable, t.sk_nodocontablerelacionado, t.desc_signo, T.Sk_lote, T.Sk_Lote_Upd, T.Cod_Severidad" +
                                        " FROM( " +
                                        " SELECT (SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Id_Estructura = " + estructura.Id_Estructura + " AND Id_NodoContable = " + nodo2.Id_NodoContable + " AND Desc_NodoContable = " + nodo2.name + " ) sk_nodocontable, " +
                                        " (SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Id_NodoContable = " + formulacion.Id_NodoContable + " AND Id_Estructura = " + estructura.Id_Estructura + " AND Desc_NodoContable = " + formulacion.name + " " +
                                        "  AND Sk_NodoContablePadre=(SEL Sk_NodoContable FROM " + instancia + ".V_RC_NodoContableAgregacionNumerales WHERE Id_Estructura = " + estructura.Id_Estructura + " AND Id_NodoContable = " + nodo2.Id_NodoContable + " AND Desc_NodoContable = " + nodo2.name + ") )sk_nodocontablerelacionado ," +
                                        " " + formulacion.Signo + " Desc_Signo, " + loteupd + " Sk_Lote, NULL Sk_Lote_Upd, 1 Cod_Severidad) T ) AS T2 " +
                                        " ON (T1.Sk_NodoContable = T2.Sk_NodoContable" +
                                        " AND T1.sk_nodocontablerelacionado=T2.sk_nodocontablerelacionado) " +
                                        " WHEN MATCHED THEN  UPDATE" +
                                        " SET Desc_Signo = " + formulacion.Signo + ", Sk_Lote_Upd = " + loteupd + " " +
                                        " WHEN NOT MATCHED THEN " +
                                        " INSERT(sk_nodocontable, sk_nodocontableRelacionado, Desc_Signo, Sk_lote, Sk_Lote_Upd,Cod_Severidad )" +
                                        "VALUES(" +
                                        " T2.sk_nodocontable,  T2.sk_nodocontableRelacionado, T2.Desc_Signo, T2.Sk_lote, T2.Sk_Lote_Upd, T2.Cod_Severidad" +
                                        ")";
                                            result = oSqlCmd.ExecuteNonQuery();

                                            oSqlCmd.Dispose();
                                            oSqlConnection.Close();
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                Delete_RC_ResultadoDetallaAgregacionNumeralesByNameIdDAL(Id_Estructuta);
                return result;
                
                }
            else
            {
                return result = 99;
            }

        }else{
         return result = 98;
        }
        }
    }
}
