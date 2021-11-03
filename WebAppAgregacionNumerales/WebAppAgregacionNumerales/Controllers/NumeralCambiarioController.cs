using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BllTD;
using EntitiesTD;

namespace WebAppAgregacionNumerales.Controllers
{
    public class NumeralCambiarioController : ApiController
    {
        private NumeralCambiarioBll numeralCambiarioBll = new NumeralCambiarioBll();

        public NumeralCambiarioController()
        {
        }

        [HttpGet]
        public IEnumerable<NumeralCambiario> Get_NumeralCambiario()
        {
            
            try
            {
                var estructuras = numeralCambiarioBll.Get_NumeralCambiarioBll();
                return estructuras;
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }

    }
}
