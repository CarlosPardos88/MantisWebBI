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
    public class ResultadoFormulacionDAL
    {
        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instancia = ConfigurationManager.AppSettings["InstanciaView"].ToString();

        public List<ResultadoFormulacion> Get_RC_EstructuraAgregacionNumeralesByIdNameDAL(int Id, string desc)
        {
            List<ResultadoFormulacion> list = new List<ResultadoFormulacion>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "SEL NOD.Id_NodoContable, COALESCE(PAD.Id_NodoContable, 0) Id_NodoContablePadre, NOD.Desc_NodoContable, FORM.Desc_Signo FROM " + @instancia + ".V_RC_EstructuraAgregacionNumerales EST"
                            + " JOIN " + @instancia + ".V_RC_NodoContableAgregacionNumerales NOD "
                            + " ON EST.Id_Estructura = NOD.Id_Estructura"
                            + " LEFT JOIN " + @instancia + ".V_RC_NodoContableAgregacionNumerales PAD"
                            + " ON NOD.sk_NodoContablePadre = PAD.sk_NodoContable"
                            + " JOIN  " + @instancia + ".V_RC_FormulacionVerticalNodoagrNumerales FORM"
                            + " ON FORM.Sk_NodoContable = NOD.Sk_NodoContable"
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
                                    list.Add(new ResultadoFormulacion()
                                    {

                                        name = oReader["Desc_NodoContable"].ToString(),
                                        Id_NodoContable = int.Parse(oReader["Id_NodoContable"].ToString()),
                                        Id_NodoContablePadre = int.Parse(oReader["Id_NodoContablePadre"].ToString()),
                                        Signo = oReader["Desc_Signo"].ToString()
                                       

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


        public List<ResultadoFormulacion> Get_RC_EstructuraAgregacionNumeralesByIdNameDAL(int Sk_NodoContable)
        {
            List<ResultadoFormulacion> list = new List<ResultadoFormulacion>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "SEL PAD.Id_NodoContable, PAD.Desc_NodoContable, FORM.Desc_Signo FROM " + @instancia + ".V_RC_NodoContableAgregacionNumerales NOD"
                              + " JOIN  " + @instancia + ".V_RC_FormulacionVerticalNodoagrNumerales FORM"
                            + " ON FORM.Sk_NodoContable = NOD.Sk_NodoContable"
                            + " LEFT JOIN " + @instancia + ".V_RC_NodoContableAgregacionNumerales PAD"
                            + " ON FORM.Sk_NodoContableRelacionado = PAD.sk_NodoContable"
                            + " where NOD.Sk_NodoContable = ? and NOD.Cb_Eliminado <> 'S' ;";
                        oSqlCmd.CommandType = CommandType.Text;
                        oSqlCmd.CommandTimeout = 60;
                        oSqlCmd.Connection = oSqlConnection;

                        TdParameter idP = oSqlCmd.CreateParameter();
                        idP.DbType = DbType.Int64;
                        idP.Direction = ParameterDirection.Input;
                        oSqlCmd.Parameters.Add(idP);
                        idP.Value = Sk_NodoContable;

                        oSqlCmd.Prepare();
                        TdDataReader oReader = oSqlCmd.ExecuteReader();
                        if (oReader != null)
                        {
                            if (oReader.HasRows)
                            {

                                while (oReader.Read())
                                {
                                    list.Add(new ResultadoFormulacion()
                                    {
                                        name = oReader["Desc_NodoContable"].ToString(),
                                        Id_NodoContable = int.Parse(oReader["Id_NodoContable"].ToString()),
                                        Signo = oReader["Desc_Signo"].ToString()


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
