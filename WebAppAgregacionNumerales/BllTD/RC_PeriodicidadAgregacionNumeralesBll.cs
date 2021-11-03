using BIDAL;
using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BllTD
{
   public class RC_PeriodicidadAgregacionNumeralesBll
    {
        RC_PeriodicidadAgregacionNumeralesDAL rc_PeriodicidadAgregacionNumeralesDAL;
        public RC_PeriodicidadAgregacionNumeralesBll()
        {
            rc_PeriodicidadAgregacionNumeralesDAL = new RC_PeriodicidadAgregacionNumeralesDAL();
        }
        public List<RC_PeriodicidadAgregacionNumerales> Get_RC_PeriodicidadAgregacionNumeralesBll(int id_fuente)
        {
            try
            {
                return rc_PeriodicidadAgregacionNumeralesDAL.Get_RC_PeriodicidadAgregacionNumeralesDAL(id_fuente);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }
    }
}
