using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using EntitiesTD;
using Teradata.Client.Provider;

namespace BIDAL
{
    public class ResultadoNodoDAL
    {
        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instancia = ConfigurationManager.AppSettings["InstanciaView"].ToString();
        ResultadoFormulacionDAL formulacionDAL = new ResultadoFormulacionDAL();
        public List<ResultadoNodo> Get_RC_EstructuraAgregacionNumeralesByIdNameDAL(int Id, string desc)
        {
            List<ResultadoNodo> list = new List<ResultadoNodo>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        oSqlCmd.CommandText = "SEL NOD.Sk_NodoContable Sk_NodoContable, NOD.Desc_NodoContable, NOD.Id_NodoContable, COALESCE(PAD.Id_NodoContable, 0) Id_NodoContablePadre, PAD.Desc_NodoContable Desc_NodoContablePadre ," +
                            " MAX(CASE WHEN TRIM(AGR.Id_Fuente)='1' THEN agr.Sk_RCNumeralCambiario ELSE 0 END ) Sk_RCNumeralCambiario,   NOD.Num_Nivel,NOD.Num_Orden," +
                            "  MAX(CASE WHEN TRIM(AGR.Id_Fuente)='2' THEN AGR.Sk_RCNumeralCambiario ELSE 0 END) idnumeralcco FROM " + @instancia + ".V_RC_EstructuraAgregacionNumerales EST"
                            + " JOIN " + @instancia + ".V_RC_NodoContableAgregacionNumerales NOD "
                            + " ON EST.Id_Estructura = NOD.Id_Estructura"
                            + " LEFT JOIN " + @instancia + ".V_RC_NodoContableAgregacionNumerales PAD"
                            + " ON NOD.sk_NodoContablePadre = PAD.sk_NodoContable"
                            + " LEFT JOIN  " + @instancia + ".V_RC_Rel_NodoAgrNumerales_NumeralCambiario AGR"
                            + " ON AGR.Sk_NodoContable = NOD.Sk_NodoContable"
                            + " where EST.Id_Estructura = ? and EST.Desc_Estructura = ? and EST.Cb_Eliminado <> 'S' and NOD.Cb_eliminado <> 'S' order by NOD.Num_Nivel,NOD.Num_Orden" +
                            "  GROUP BY 1,2,3,4,5,7,8;";
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
                                    ResultadoNodo nodo = new ResultadoNodo();
                                    nodo.Sk_NodoContable = int.Parse(oReader["Sk_NodoContable"].ToString());
                                    nodo.name = oReader["Desc_NodoContable"].ToString();
                                    nodo.Id_NodoContable = int.Parse(oReader["Id_NodoContable"].ToString());
                                    nodo.Id_NodoContablePadre = int.Parse(oReader["Id_NodoContablePadre"].ToString());
                                    nodo.Desc_NodoContablePadre = oReader["Desc_NodoContablePadre"].ToString();
                                    nodo.Sk_RCNumeralCambiario = int.Parse(oReader["Sk_RCNumeralCambiario"].ToString());
                                    nodo.level = int.Parse(oReader["Num_Nivel"].ToString());
                                    nodo.idnumeralcco = int.Parse(oReader["idnumeralcco"].ToString());
                                    nodo.Sk_NodoContable = int.Parse(oReader["Sk_NodoContable"].ToString());
                                    nodo.orden = int.Parse(oReader["Num_Orden"].ToString());
                                    nodo.formulacion = formulacionDAL.Get_RC_EstructuraAgregacionNumeralesByIdNameDAL(nodo.Sk_NodoContable);
                                    list.Add(nodo);
                                   


                                }
                                oReader.Close();
                            }
                            oReader.Dispose();
                        }
                    }
                    oSqlConnection.Close();
                    return list;
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
           
        }
    }
}
