using BIDAL;
using EntitiesTD;
using System.Collections.Generic;

namespace BllTD
{
   public class ResultadoNodoBll
    {
        ResultadoNodoDAL ResultadoNodoDAL;

        public ResultadoNodoBll()
        {
            ResultadoNodoDAL = new ResultadoNodoDAL();
        }

        public List<ResultadoNodo> Get_NodosBll(int Id, string desc)
        {
            try
            {
                return ResultadoNodoDAL.Get_RC_EstructuraAgregacionNumeralesByIdNameDAL(Id, desc);
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
            
        }

    }
}
