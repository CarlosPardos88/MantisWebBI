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
    public class RC_ConsultaAgregacionNumeralesController : ApiController
    {
        private RC_ConsultaAgregacionNumeralesBll rc_ConsultaAgregacionNumeralesBll = new RC_ConsultaAgregacionNumeralesBll();

        public RC_ConsultaAgregacionNumeralesController()
        {

        }

        [HttpGet]
        public IEnumerable<RC_ConsultaAgregacionNumerales> Get_RC_ConsultaAgregacionNumerales()
        {
            try
            {
                var estructuras = rc_ConsultaAgregacionNumeralesBll.Get_RC_ConsultaAgregacionNumeralesBll();
                return estructuras;
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return null;
            }   
            
        }

        [HttpGet]
        public IEnumerable<RC_ConsultaAgregacionNumerales> Get_RC_ConsultasSK(int Id_Estructura, string Fecha_Consulta, int Id_Fuente, string Fecha_Inicial, string Fecha_Final, int Id_Periodicidad)
        {
            try
            {
                var estructuras = rc_ConsultaAgregacionNumeralesBll.Get_RC_ConsultasSK(Id_Estructura, Fecha_Consulta, Id_Fuente, Fecha_Inicial, Fecha_Final, Id_Periodicidad);
                return estructuras;
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }

        [HttpGet]
        public IEnumerable<RC_ConsultaAgregacionNumerales> Get_RC_ConsultaAgregacionNumeralesBySk(int Id_Estructura, int Sk_Consulta)
        {
            try
            {
                var estructura = rc_ConsultaAgregacionNumeralesBll.Get_RC_ConsultaAgregacionNumeralesBySkBll(Id_Estructura, Sk_Consulta);
                return estructura;
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }

        [HttpPost]
        public IHttpActionResult Post_Tp_Parametros(RC_ConsultaAgregacionNumerales consulta)
        {
            try
            {
                int r = rc_ConsultaAgregacionNumeralesBll.Post_RC_ConsultaAgregacionNumeralesBll(consulta);
                IHttpActionResult result = Ok(r);
                return result;
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
           
        }

    }
}
