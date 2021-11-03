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
    public class ResultadoFormulacionController : ApiController
    {

        private ResultadoFormulacionBll resultadoFormulacion = new ResultadoFormulacionBll();

        public ResultadoFormulacionController() { }

        [HttpGet]
        public IEnumerable<ResultadoFormulacion> Get_RC_EstructuraAgregacionNumeralesByIdName(int Id_Estructura, string Desc_Estructura)
        {
            try
            {
                var estructura = resultadoFormulacion.Get_FormulacionBll(Id_Estructura, Desc_Estructura);
                return estructura;
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
    }
}
