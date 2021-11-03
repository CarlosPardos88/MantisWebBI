using BIDAL;
using EntitiesTD;
using System.Collections.Generic;

namespace BllTD
{
   public class NumeralCambiarioBll
    {
        NumeralCambiarioDAL numeralCambiarioSAFDAL;

        public NumeralCambiarioBll()
        {
            numeralCambiarioSAFDAL = new NumeralCambiarioDAL();
        }

        public List<NumeralCambiario> Get_NumeralCambiarioBll()
        {
            try
            {
                return numeralCambiarioSAFDAL.Get_NumeralCambiarioDAL();
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
            
        }
    }
}
