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
    public class RC_PeriodicidadAgregacionNumeralesController : ApiController
    {
        private RC_PeriodicidadAgregacionNumeralesBll rc_PeriodicidadAgregacionNumeralesBll = new RC_PeriodicidadAgregacionNumeralesBll();

        public RC_PeriodicidadAgregacionNumeralesController()
        {

        }

        [HttpGet]
        public IEnumerable<RC_PeriodicidadAgregacionNumerales> Get_RC_PeriodicidadAgregacionNumerales(int id_fuente)
        {
            try
            {
                var estructuras = rc_PeriodicidadAgregacionNumeralesBll.Get_RC_PeriodicidadAgregacionNumeralesBll(id_fuente);
                return estructuras;
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
    }
}
