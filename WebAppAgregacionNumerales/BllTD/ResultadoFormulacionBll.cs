using BIDAL;
using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BllTD
{
    public class ResultadoFormulacionBll
    {
        ResultadoFormulacionDAL resultadoFormulacionDAL;

        public ResultadoFormulacionBll()
        {
            resultadoFormulacionDAL = new ResultadoFormulacionDAL();
        }

        public List<ResultadoFormulacion> Get_FormulacionBll(int Id, string desc)
        {
            try
            {
                return resultadoFormulacionDAL.Get_RC_EstructuraAgregacionNumeralesByIdNameDAL(Id, desc);
            }
            catch (Exception ex)
            {

                throw ex;
            }
          
        }
    }
}
