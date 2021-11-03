using BIDAL;
using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BllTD
{
    public class RC_FuenteAgregacionNumeralesBll
    {
        RC_FuenteAgregacionNumeralesDAL rc_FuenteAgregacionNumeralesDAL;
        public RC_FuenteAgregacionNumeralesBll()
        {
            rc_FuenteAgregacionNumeralesDAL = new RC_FuenteAgregacionNumeralesDAL();
        }
        public List<RC_FuenteAgregacionNumerales> Get_RC_FuenteAgregacionNumeralesBll()
        {
            try
            {
                return rc_FuenteAgregacionNumeralesDAL.Get_RC_FuenteAgregacionNumeralesDAL();

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}

