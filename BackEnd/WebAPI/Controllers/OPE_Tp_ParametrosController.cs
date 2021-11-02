using BllTD;
using EntitiesTD;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Hubs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class OPE_Tp_ParametrosController : ApiController
    {
        Tp_ParametrosBll tpParametrosBll;

        public OPE_Tp_ParametrosController() {
            tpParametrosBll = new Tp_ParametrosBll();
        }

        [HttpGet]
        public List<Tp_Parametros> GetTp_Parametros() {
            return tpParametrosBll.GetTp_Parametros();
        }

        [HttpGet]
        public List<Tp_Parametros> GetTp_ParametrosByArea(string area)
        {
            return tpParametrosBll.GetTp_ParametrosByArea(area);
        }

        [HttpGet]
        public Tp_Parametros GetTp_Parametro(int id)
        {
            return tpParametrosBll.GetTp_Parametro(id);
        }

        [HttpPost]
        public IHttpActionResult Post_Tp_Parametros(Tp_Parametros parametro) {
            return Ok(tpParametrosBll.PostTp_Parametro(parametro));
        }

        [HttpPut]
        public IHttpActionResult Put_Tp_Parametros(Tp_Parametros parametro)
        {
          int result=  tpParametrosBll.PutTp_Parametro(parametro);
            NotificacionModel notificacion = new NotificacionModel();
            notificacion.msj = "Se ha editado el parámetro: " + parametro.NombreParametro;
            notificacion.titulo = "Parámetro editado";
            notificacion.area = parametro.NombreGrupoParametro;
            notificacion.tipo = Constantes.TIPO_NOTIFICACION_PARAMETRO_EDITADO;

            GlobalHost.ConnectionManager.GetHubContext<NotificacionHub>().Clients.All.addNotificacion(notificacion);

            return Ok(result);
        }
    }
}
