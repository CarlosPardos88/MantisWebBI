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
    public class RC_ResultadoAgregacionNumeralesDAL
    {
        private static readonly string Cnn = ConfigurationManager.ConnectionStrings["EntitiesTD"].ConnectionString;
        private static readonly string instancia = ConfigurationManager.AppSettings["InstanciaView"].ToString();

        public List<RC_ResultadoAgregacionNumerales> Get_RC_ResultadoAgregacionNumeralesBySkDAL(int Id_Estructura, int Sk_Consulta, int Id_Periodicidad)
       {
            List<RC_ResultadoAgregacionNumerales> list = new List<RC_ResultadoAgregacionNumerales>();

            using (TdConnection oSqlConnection = new TdConnection(Cnn))
            {
                try
                {
                    oSqlConnection.Open();
                    using (TdCommand oSqlCmd = new TdCommand())
                    {
                        oSqlCmd.Parameters.Clear();
                        if (Id_Periodicidad == 1)
                        {
                            oSqlCmd.CommandText = " SEL NOD.Num_Orden , NOD.Id_NodoContable Id_NodoContable, RAN.Id_Estructura, RAN.Sk_NodoContable, RAN.Fecha_Consulta," +
                                " DG.Anio ||'-'|| CASE WHEN LENGTH (TRIM(DG.Id_Mes))=1 THEN '0' || TRIM(DG.Id_Mes) ELSE TRIM(DG.Id_Mes) END ||'-'|| CASE WHEN  LENGTH(TRIM(DG.DiaDelMes)) = 1 THEN '0' || TRIM(DG.DiaDelMes) ELSE TRIM(DG.DiaDelMes) end Fecha_DeclaracionInicial, " +
                                "NOD.desc_NodoContable desc_NodoContable, SUM(Cv_ValorUSD) Cv_ValorUSD " +
                            " from " + @instancia + ".V_RC_ResultadoAgregacionNumerales RAN " +
                            " INNER JOIN " + instancia +".V_DG_Fecha DG " +
                            " ON (DG.DiaDate=RAN.Fecha_DeclaracionInicial) " +
                            " INNER JOIN  " + instancia +".V_RC_ConsultaAgregacionNumerales CAN " +
                            " ON(CAN.Sk_Consulta=RAN.Sk_Consulta) " +
                            " INNER JOIN " + instancia +".V_RC_NodoContableAgregacionNumerales NOD  " +
                            " ON (NOD.Id_Estructura=RAN.Id_Estructura AND Nod.Sk_NodoContable = RAN.Sk_NodoContable)  " +
                            " WHERE NOD.Id_Estructura= " + Id_Estructura + "" +
                            " AND RAN.Sk_Consulta = " + Sk_Consulta + " " +
                            " GROUP BY 1,2,3,4,5,6,7 " +
                            "  ORDER BY 1, 6 desc";
                        } else if (Id_Periodicidad == 2)
                        {
                            oSqlCmd.CommandText = " SEL NOD.Num_Orden , NOD.Id_NodoContable Id_NodoContable, RAN.Id_Estructura, RAN.Sk_NodoContable, RAN.Fecha_Consulta," +
                          " DG.Anio ||'-'|| CASE WHEN LENGTH (TRIM(DG.id_semana))=1 THEN '0' || TRIM(DG.id_semana) else TRIM(DG.id_semana) END  Fecha_DeclaracionInicial, NOD.desc_NodoContable desc_NodoContable, SUM(Cv_ValorUSD) Cv_ValorUSD " +
                          " from " + @instancia + ".V_RC_ResultadoAgregacionNumerales RAN " +
                          " INNER JOIN " + instancia +".V_DG_Fecha DG " +
                          " ON (DG.DiaDate=RAN.Fecha_DeclaracionInicial) " +
                          " INNER JOIN  " + instancia +".V_RC_ConsultaAgregacionNumerales CAN " +
                          " ON(CAN.Sk_Consulta=RAN.Sk_Consulta) " +
                          " INNER JOIN " + instancia +".V_RC_NodoContableAgregacionNumerales NOD  " +
                          " ON (NOD.Id_Estructura=RAN.Id_Estructura AND Nod.Sk_NodoContable = RAN.Sk_NodoContable)  " +
                          " WHERE NOD.Id_Estructura= " + Id_Estructura + "" +
                          " AND RAN.Sk_Consulta = " + Sk_Consulta + " " +
                          " GROUP BY 1,2,3,4,5,6,7 " +
                          "  ORDER BY 1, 6 desc";
                        }else if (Id_Periodicidad == 3)
                        {
                            oSqlCmd.CommandText = " SEL NOD.Num_Orden , NOD.Id_NodoContable Id_NodoContable, RAN.Id_Estructura, RAN.Sk_NodoContable, RAN.Fecha_Consulta," +
                                " DG.Anio ||'-'|| CASE WHEN LENGTH (TRIM(DG.Id_Mes))=1 THEN '0' || TRIM(DG.Id_Mes) ELSE TRIM(DG.Id_Mes) end  Fecha_DeclaracionInicial, " +
                                "NOD.desc_NodoContable desc_NodoContable, SUM(Cv_ValorUSD) Cv_ValorUSD " +
                          " from " + @instancia + ".V_RC_ResultadoAgregacionNumerales RAN " +
                          " INNER JOIN " + instancia +".V_DG_Fecha DG " +
                          " ON (DG.DiaDate=RAN.Fecha_DeclaracionInicial) " +
                          " INNER JOIN  " + instancia +".V_RC_ConsultaAgregacionNumerales CAN " +
                          " ON(CAN.Sk_Consulta=RAN.Sk_Consulta) " +
                          " INNER JOIN " + instancia +".V_RC_NodoContableAgregacionNumerales NOD  " +
                          " ON (NOD.Id_Estructura=RAN.Id_Estructura AND Nod.Sk_NodoContable = RAN.Sk_NodoContable)  " +
                          " WHERE NOD.Id_Estructura= " + Id_Estructura + "" +
                          " AND RAN.Sk_Consulta = " + Sk_Consulta + " " +
                          " GROUP BY 1,2,3,4,5,6,7 " +
                          "  ORDER BY 1, 6 desc";
                        }else if (Id_Periodicidad == 4)
                        {
                            oSqlCmd.CommandText = " SEL NOD.Num_Orden , NOD.Id_NodoContable Id_NodoContable, RAN.Id_Estructura, RAN.Sk_NodoContable, RAN.Fecha_Consulta, " +
                                "DG.Anio || '-' || CASE WHEN trim(DG.Id_Trimestre) = '1' THEN 'I '  WHEN trim(DG.Id_Trimestre) = '2' THEN 'II '  WHEN trim(DG.Id_Trimestre) = '3' THEN 'III ' WHEN trim(DG.Id_Trimestre) = '4' THEN 'IV '  END Fecha_DeclaracionInicial," +
                          "NOD.desc_NodoContable desc_NodoContable, SUM(Cv_ValorUSD) Cv_ValorUSD " +
                          " from " + @instancia + ".V_RC_ResultadoAgregacionNumerales RAN " +
                          " INNER JOIN " + instancia +".V_DG_Fecha DG " +
                          " ON (DG.DiaDate=RAN.Fecha_DeclaracionInicial) " +
                          " INNER JOIN  " + instancia +".V_RC_ConsultaAgregacionNumerales CAN " +
                          " ON(CAN.Sk_Consulta=RAN.Sk_Consulta) " +
                          " INNER JOIN " + instancia +".V_RC_NodoContableAgregacionNumerales NOD  " +
                          " ON (NOD.Id_Estructura=RAN.Id_Estructura AND Nod.Sk_NodoContable = RAN.Sk_NodoContable)  " +
                          " WHERE NOD.Id_Estructura= " + Id_Estructura + "" +
                          " AND RAN.Sk_Consulta = " + Sk_Consulta + " " +
                          " GROUP BY 1,2,3,4,5,6,7 " +
                          "  ORDER BY 1, 6 desc";
                        }else if (Id_Periodicidad == 5)
                        {
                            oSqlCmd.CommandText = " SEL NOD.Num_Orden , NOD.Id_NodoContable Id_NodoContable, RAN.Id_Estructura, RAN.Sk_NodoContable, RAN.Fecha_Consulta, " +
                           "DG.ANIO || '-'||  CASE WHEN trim(DG.Id_Semestre)='1' THEN 'I'  WHEN trim(DG.Id_Semestre) = '2' THEN 'II'  END Fecha_DeclaracionInicial," +
                           " NOD.desc_NodoContable desc_NodoContable, SUM(Cv_ValorUSD) Cv_ValorUSD " +
                          " from " + @instancia + ".V_RC_ResultadoAgregacionNumerales RAN " +
                          " INNER JOIN " + instancia +".V_DG_Fecha DG " +
                          " ON (DG.DiaDate=RAN.Fecha_DeclaracionInicial) " +
                          " INNER JOIN  " + instancia +".V_RC_ConsultaAgregacionNumerales CAN " +
                          " ON(CAN.Sk_Consulta=RAN.Sk_Consulta) " +
                          " INNER JOIN " + instancia +".V_RC_NodoContableAgregacionNumerales NOD  " +
                          " ON (NOD.Id_Estructura=RAN.Id_Estructura AND Nod.Sk_NodoContable = RAN.Sk_NodoContable)  " +
                          " WHERE NOD.Id_Estructura= " + Id_Estructura + "" +
                          " AND RAN.Sk_Consulta = " + Sk_Consulta + " " +
                          " GROUP BY 1,2,3,4,5,6,7 " +
                          "  ORDER BY 1, 6 desc";
                        }else if (Id_Periodicidad == 6)
                        {
                            oSqlCmd.CommandText = " SEL NOD.Num_Orden , NOD.Id_NodoContable Id_NodoContable, RAN.Id_Estructura, RAN.Sk_NodoContable, RAN.Fecha_Consulta," +
                          " SUBSTR(CAST(Sk_Fecha  AS VARCHAR(4)),1,2 ) ||'-'|| SUBSTR(CAST(Sk_Fecha  AS VARCHAR(4)),3,4 )  Fecha_DeclaracionInicial, " +
                          " NOD.desc_NodoContable desc_NodoContable, SUM(Cv_ValorUSD) Cv_ValorUSD " +
                          " from " + @instancia + ".V_RC_ResultadoAgregacionNumerales RAN " +
                          " INNER JOIN " + instancia +".V_DG_Fecha DG " +
                          " ON (DG.DiaDate=RAN.Fecha_DeclaracionInicial) " +
                          " INNER JOIN  " + instancia +".V_RC_ConsultaAgregacionNumerales CAN " +
                          " ON(CAN.Sk_Consulta=RAN.Sk_Consulta) " +
                          " INNER JOIN " + instancia +".V_RC_NodoContableAgregacionNumerales NOD  " +
                          " ON (NOD.Id_Estructura=RAN.Id_Estructura AND Nod.Sk_NodoContable = RAN.Sk_NodoContable)  " +
                          " WHERE NOD.Id_Estructura= " + Id_Estructura + "" +
                          " AND RAN.Sk_Consulta = " + Sk_Consulta + " " +
                          " GROUP BY 1,2,3,4,5,6,7 " +
                          "  ORDER BY 1, 6 desc";
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
                                    RC_ResultadoAgregacionNumerales item = new RC_ResultadoAgregacionNumerales();

                                    item.Id_NodoContable = int.Parse(oReader["Id_NodoContable"].ToString());
                                    item.Id_Estructura = int.Parse(oReader["Id_Estructura"].ToString());
                                    item.Desc_NodoContable = oReader["Desc_NodoContable"].ToString();
                                    item.Fecha_Consulta = DateTime.Parse(oReader["Fecha_Consulta"].ToString());
                                    item.Fecha_DeclaracionInicial = oReader["Fecha_DeclaracionInicial"].ToString();
                                    item.Cv_ValorUSD = decimal.Parse(oReader["Cv_ValorUSD"].ToString());
                                
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
