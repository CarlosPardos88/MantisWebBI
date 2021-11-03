using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BIDAL;
using EntitiesTD;

namespace BllTD
{
    public class RC_ConsultaAgregacionNumeralesBll
    {
        RC_ConsultaAgregacionNumeralesDAL rc_ConsultaAgregacionNumeralesDAL;

        public RC_ConsultaAgregacionNumeralesBll()
        {
            try
            {
                rc_ConsultaAgregacionNumeralesDAL = new RC_ConsultaAgregacionNumeralesDAL();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public List<RC_ConsultaAgregacionNumerales> Get_RC_ConsultaAgregacionNumeralesBll()
        {
            try
            {
                return rc_ConsultaAgregacionNumeralesDAL.Get_RC_ConsultaAgregacionNumeralesDAL();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }

        public List<RC_ConsultaAgregacionNumerales> Get_RC_ConsultasSK(int Id_Estructura, string Fecha_Consulta, int Id_Fuente, string Fecha_Inicial, string Fecha_Final, int Id_Periodicidad)
        {
            try
            {
                return rc_ConsultaAgregacionNumeralesDAL.Get_SkConsulta(Id_Estructura, Fecha_Consulta, Id_Fuente, Fecha_Inicial, Fecha_Final, Id_Periodicidad);
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }

        public int Post_RC_ConsultaAgregacionNumeralesBll(RC_ConsultaAgregacionNumerales consulta)
        {
            try
            {
                return rc_ConsultaAgregacionNumeralesDAL.Post_RC_ConsultaAgregacionNumeralesDAL(consulta);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<RC_ConsultaAgregacionNumerales> Get_RC_ConsultaAgregacionNumeralesBySkBll(int Id_Estructura, int Sk_Consulta)
        {
            try
            {
                return rc_ConsultaAgregacionNumeralesDAL.Get_RC_ConsultaAgregacionNumeralesBySkDAL(Id_Estructura, Sk_Consulta);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public List<NodeStructureQuery> GetNodeStructureQuery(string idStructure) 
        {

            try
            {
                return rc_ConsultaAgregacionNumeralesDAL.GetNodeStructue(idStructure);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
