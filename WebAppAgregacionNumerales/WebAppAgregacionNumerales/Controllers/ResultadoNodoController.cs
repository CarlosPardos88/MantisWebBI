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
    public class ResultadoNodoController : ApiController
    {

        private ResultadoNodoBll ResultadoNodoBll = new ResultadoNodoBll();

        public ResultadoNodoController() { }

        [HttpGet]
        public IEnumerable<ResultadoNodo> Get_RC_EstructuraAgregacionNumeralesByIdName(int Id_Estructura, string Desc_Estructura)
        {
            try
            {
                var estructura = ResultadoNodoBll.Get_NodosBll(Id_Estructura, Desc_Estructura);
                return estructura;
            }
            catch (Exception ex)
            {

                return null;
            }
           
        }
    }
}
