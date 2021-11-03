using BllTD;
using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAppAgregacionNumerales.Controllers
{
    public class RC_ResultadoAgregacionNumeralesController : ApiController
    {
        private RC_ResultadoAgregacionNumeralesBll rc_ResultadoAgregacionNumeralesBll = new RC_ResultadoAgregacionNumeralesBll();

        public RC_ResultadoAgregacionNumeralesController()
        {

        }

        [HttpGet]
        public IEnumerable<RC_ResultadoAgregacionNumerales> Get_RC_ResultadoAgregacionNumeralesBySk(int Id_Estructura, int Sk_Consulta, int Id_Periodicidad)
        {
            try
            {
                var estructura = rc_ResultadoAgregacionNumeralesBll.Get_RC_ResultadoAgregacionNumeralesBySkBll(Id_Estructura, Sk_Consulta, Id_Periodicidad);
                return estructura;
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
    }
}
