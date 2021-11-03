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
    public class RC_FuenteAgregacionNumeralesController : ApiController
    {
        private RC_FuenteAgregacionNumeralesBll rc_FuenteAgregacionNumeralesBll = new RC_FuenteAgregacionNumeralesBll();

        public RC_FuenteAgregacionNumeralesController()
        {

        }

        [HttpGet]
        public IEnumerable<RC_FuenteAgregacionNumerales> Get_RC_ConsultaAgregacionNumerales()
        {
            try
            {
                var estructuras = rc_FuenteAgregacionNumeralesBll.Get_RC_FuenteAgregacionNumeralesBll();
                return estructuras;
            }
            catch (Exception ex)
            {
                return null;
            }
           
        }
    }
}
