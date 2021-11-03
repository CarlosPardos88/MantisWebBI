using BllTD;
using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebAppAgregacionNumerales.Controllers
{
    public class RC_EstructuraAgregacionNumeralesController : ApiController
    {
        private RC_EstructuraAgregacionNumeralesBll rc_EstructuraAgregacionNumeralesBll = new RC_EstructuraAgregacionNumeralesBll();

        public RC_EstructuraAgregacionNumeralesController()
        {
            
        }

        [HttpGet]
        public IEnumerable<RC_EstructuraAgregacionNumerales> Get_RC_EstructuraAgregacionNumerales()
        {
            try
            {
                var estructuras = rc_EstructuraAgregacionNumeralesBll.Get_RC_EstructuraAgregacionNumeralesBll();
                return estructuras;
            }
            catch (Exception)
            {
                return null;
            }
             
        }

        [HttpGet]
        public IEnumerable<RC_EstructuraAgregacionNumerales> Get_RC_EstructuraAgregacionNumeralesByIdName(int Id_Estructura, string Desc_Estructura)
        {
            try
            {
                var estructura = rc_EstructuraAgregacionNumeralesBll.Get_RC_EstructuraAgregacionNumeralesByIdNameBll(Id_Estructura, Desc_Estructura);
                return estructura;
            }
            catch (Exception ex)
            {
                throw null;
            }
            
        }

        [HttpPost]
        public IHttpActionResult Post_Tp_Parametros(RC_EstructuraAgregacionNumerales estructura)
        {
            try
            {
                int r = rc_EstructuraAgregacionNumeralesBll.Post_RC_EstructuraAgregacionNumeralesBll(estructura);
                IHttpActionResult result = Ok(r);
                return result;
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
            
        }

        [HttpPut]
        public IHttpActionResult Put_RC_EstructuraAgregacionNumerales(int id, [FromBody] RC_EstructuraAgregacionNumerales estructura)
        {
            try
            {
                return Ok(rc_EstructuraAgregacionNumeralesBll.Put_RC_EstructuraAgregacionNumeralesBll(id, estructura));
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
            
        }
    }
}
