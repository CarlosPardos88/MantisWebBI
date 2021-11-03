using BIDAL;
using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BllTD
{
   public class RC_ResultadoAgregacionNumeralesBll
    {
        RC_ResultadoAgregacionNumeralesDAL rc_ResultadoAgregacionNumeralesDAL;

        public RC_ResultadoAgregacionNumeralesBll()
        {
            rc_ResultadoAgregacionNumeralesDAL = new RC_ResultadoAgregacionNumeralesDAL();
        }
        public List<RC_ResultadoAgregacionNumerales> Get_RC_ResultadoAgregacionNumeralesBySkBll(int Id_Estructura, int Sk_Consulta, int Id_Periodicidad)
        {
            try
            {
                return rc_ResultadoAgregacionNumeralesDAL.Get_RC_ResultadoAgregacionNumeralesBySkDAL(Id_Estructura, Sk_Consulta, Id_Periodicidad);
            }
            catch (Exception ex)
            {

                throw;
            }
           
        }
    }
}
