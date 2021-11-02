using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Hubs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class OPE_SolicitudEjecucionPorDemandaProcesoController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_SolicitudEjecucionPorDemandaProceso
        public IQueryable<OPE_SolicitudEjecucionPorDemandaProceso> GetOPE_SolicitudEjecucionPorDemandaProceso()
        {
            return db.OPE_SolicitudEjecucionPorDemandaProceso;
        }

        // GET: api/OPE_SolicitudEjecucionPorDemandaProceso/5
        [ResponseType(typeof(OPE_SolicitudEjecucionPorDemandaProceso))]
        public async Task<IHttpActionResult> GetOPE_SolicitudEjecucionPorDemandaProceso(int id)
        {
            OPE_SolicitudEjecucionPorDemandaProceso oPE_SolicitudEjecucionPorDemandaProceso = await db.OPE_SolicitudEjecucionPorDemandaProceso.FindAsync(id);
            if (oPE_SolicitudEjecucionPorDemandaProceso == null)
            {
                return NotFound();
            }

            return Ok(oPE_SolicitudEjecucionPorDemandaProceso);
        }

        // GET: api/OPE_SolicitudEjecucionPorDemandaByProceso/5
        public IEnumerable<OPE_SolicitudEjecucionPorDemandaProceso> GetOPE_SolicitudEjecucionPorDemandaByProcesoFuente(int id_proceso)
        {
            var solicitudes = (from s in db.Set<OPE_SolicitudEjecucionPorDemandaProceso>()
                     from r in db.Set<OPE_ResultadoEjecucionProgramada>().Where(x => x.Id_SolicitudEjecucionPorDemanda == s.Id_SolicitudEjecucionPorDemanda).DefaultIfEmpty()
                               where s.Id_Proceso == id_proceso
                               select s).ToList()
                               .Select(x => new OPE_SolicitudEjecucionPorDemandaProceso
                               {
                                   Id_SolicitudEjecucionPorDemanda = x.Id_SolicitudEjecucionPorDemanda,
                                   Cb_Activo = x.Cb_Activo,
                                   Desc_JustificacionSolicitud = x.Desc_JustificacionSolicitud,
                                   FechaHora_EjecucionAprobada = x.FechaHora_EjecucionAprobada,
                                   FechaHora_FinVentanaSugerida = x.FechaHora_FinVentanaSugerida,
                                   FechaHora_InicioVentanaSugerida = x.FechaHora_InicioVentanaSugerida,
                                   FechaHora_RevisionOperador = x.FechaHora_RevisionOperador,
                                   FechaHora_RevisionUsuario = x.FechaHora_RevisionUsuario,
                                   FechaHora_Sugerida = x.FechaHora_Sugerida,
                                   Id_Proceso = x.Id_Proceso,
                                   Id_TipoEjecucionDemanda = x.Id_TipoEjecucionDemanda,
                                   Nombre_OperadorRevisor = x.Nombre_OperadorRevisor,
                                   Nombre_RolOperadorRevisor = x.Nombre_RolOperadorRevisor,
                                   Nombre_RolUsuarioSolicitante = x.Nombre_RolUsuarioSolicitante,
                                   Nombre_UsuarioSolicitante = x.Nombre_UsuarioSolicitante
                               });

            return solicitudes.OrderBy(item => item.Id_SolicitudEjecucionPorDemanda);
        }

        // PUT: api/OPE_SolicitudEjecucionPorDemandaProceso/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_SolicitudEjecucionPorDemandaProceso(int id, OPE_SolicitudEjecucionPorDemandaProceso oPE_SolicitudEjecucionPorDemandaProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_SolicitudEjecucionPorDemandaProceso.Id_SolicitudEjecucionPorDemanda)
            {
                return BadRequest();
            }
            try
            {
                /* db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).State = EntityState.Modified;*/
                 db.OPE_SolicitudEjecucionPorDemandaProceso.Attach(oPE_SolicitudEjecucionPorDemandaProceso);
                // db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.Id_SolicitudEjecucionPorDemanda).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.FechaHora_FinVentanaSugerida).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.FechaHora_EjecucionAprobada).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.FechaHora_InicioVentanaSugerida).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.FechaHora_Sugerida).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.FechaHora_RevisionUsuario).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.FechaHora_RevisionOperador).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.Nombre_OperadorRevisor).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.Nombre_RolOperadorRevisor).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.Nombre_UsuarioSolicitante).IsModified = true;
                db.Entry(oPE_SolicitudEjecucionPorDemandaProceso).Property(x => x.Nombre_RolUsuarioSolicitante).IsModified = true;

                await db.SaveChangesAsync();
                //var newpost = db.OPE_SolicitudEjecucionPorDemandaProceso.Find(oPE_SolicitudEjecucionPorDemandaProceso.Id_SolicitudEjecucionPorDemanda);
                //db.Entry(newpost).CurrentValues.SetValues(oPE_SolicitudEjecucionPorDemandaProceso);
                //await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                if (!OPE_SolicitudEjecucionPorDemandaProcesoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new StringContent(string.Format("Este proceso ya fue aprobado para ejecutarse a la hora asignada")),
                             ReasonPhrase = "Este proceso ya fue aprobado para ejecutarse a la hora asignada"
                    };
                    throw new HttpResponseException(resp);
                }
            }
            finally
            {
                if (oPE_SolicitudEjecucionPorDemandaProceso.Cb_Activo == "N")
                {
                    var proceso = db.OPE_Proceso.Where(s => s.Id_Proceso == oPE_SolicitudEjecucionPorDemandaProceso.Id_Proceso).FirstOrDefault<OPE_Proceso>();
                    var area = proceso.OPE_AreaNegocio.Nombre_AreaNegocio;
                    var procesospre = db.OPE_ProcesoPrerequisito.Where(s => s.Id_ProcesoRequerido == proceso.Id_Proceso);
                    var numpro = procesospre.Count();

                    if (numpro > 0)
                    {
                        List<string> procesos = new List<string>();
                        foreach (var item in procesospre)
                        {
                            var procesoP = db.OPE_Proceso.Where(p => p.Id_Proceso == item.Id_ProcesoPrerequisito && p.Fecha_Eliminado != null).FirstOrDefault<OPE_Proceso>();
                            procesos.Add(procesoP.Nombre_Proceso);
                        }

                        EmailModel envio = new EmailModel();
                        envio.area = area;
                        envio.listWf = procesos;
                        envio.process = proceso.Nombre_Proceso;
                        envio.modelMail = EmailModel.MODEL_WF_INACTIVO;

                        try
                        {
                           _ = Task.Run(()=> new Utils.Email().SendEmail(envio));
                            Utils.Notifitaions.startTaskNotifications();
                        }
                        catch (Exception)
                        {
                            var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
                            {
                                Content = new StringContent(string.Format("No se pudo enviar el correo")),
                                ReasonPhrase = "No se pudo enviar el correo"
                            };
                            throw new HttpResponseException(resp);
                        }

                    }
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/OPE_SolicitudEjecucionPorDemandaProceso
        [ResponseType(typeof(OPE_SolicitudEjecucionPorDemandaProceso))]
        public async Task<IHttpActionResult> PostOPE_SolicitudEjecucionPorDemandaProceso(OPE_SolicitudEjecucionPorDemandaProceso oPE_SolicitudEjecucionPorDemandaProceso)
        {
            if (!ModelState.IsValid)
            {   
                return BadRequest(ModelState);
            }

            db.OPE_SolicitudEjecucionPorDemandaProceso.Add(oPE_SolicitudEjecucionPorDemandaProceso);
            await db.SaveChangesAsync();
            
            C_ProcesoProgramado c= (from p in db.Set<C_ProcesoProgramado>()
                                    where p.Id_SolicitudEjecucionPorDemanda == oPE_SolicitudEjecucionPorDemandaProceso.Id_SolicitudEjecucionPorDemanda
                                    select p).ToList()
           .Select(x => new C_ProcesoProgramado
           {
               Fecha = x.Fecha,
               Id_ProgramacionPeriodica = x.Id_ProgramacionPeriodica,
               Id_AprobacionProgramacionPeriodica = x.Id_AprobacionProgramacionPeriodica,
               Id_SolicitudEjecucionPorDemanda = x.Id_SolicitudEjecucionPorDemanda,
               Id_Proceso = x.Id_Proceso,
               Nombre_Proceso = x.Nombre_Proceso,
               Hora_EjecucionProgramada = x.Hora_EjecucionProgramada,
               Id_AreaNegocio = x.Id_AreaNegocio,
               Nombre_AreaNegocio = x.Nombre_AreaNegocio,
               Nombre_CarpetaWorkflows = x.Nombre_CarpetaWorkflows,
               Cb_Vencido = x.Cb_Vencido,
               Cb_ProgramacionAprobada = x.Cb_ProgramacionAprobada,
               Cb_ProcesoEjecutado = x.Cb_ProcesoEjecutado,
               FechaHora_InicioEjecucion = x.FechaHora_InicioEjecucion,
               FechaHora_FinEjecucion = x.FechaHora_FinEjecucion,
               Id_EstadoEjecucionInformatica = x.Id_EstadoEjecucionInformatica,
               Nombre_EstadoEjecucionInformatica = x.Nombre_EstadoEjecucionInformatica,
               Id_EstadoOperadorEjecucionProceso = x.Id_EstadoOperadorEjecucionProceso,
               Nombre_EstadoOperadorEjecucionProceso = x.Nombre_EstadoOperadorEjecucionProceso,
               Id_EstadoUsuarioEjecucionProceso = x.Id_EstadoUsuarioEjecucionProceso,
               Nombre_EstadoUsuarioEjecucionProceso = x.Nombre_EstadoUsuarioEjecucionProceso,
               Cb_Activo = x.Cb_Activo
           }).First();

            if (c != null) {
                NotificacionModel notificacion = new NotificacionModel();
                notificacion.area = c.Nombre_AreaNegocio;
                notificacion.idProceso = c.Id_Proceso;
                notificacion.nombreProceso = c.Nombre_Proceso;
                notificacion.idSolicitud = c.Id_SolicitudEjecucionPorDemanda;
                notificacion.msj = "Solicitud ejecución por demanda del proceso: " + c.Nombre_Proceso + ", pendiente de aprobación";
                notificacion.titulo = "Solicitud demanda";
                notificacion.tipo = Constantes.TIPO_NOTIFICACION_SOLICITUD_DEMANDA;

                GlobalHost.ConnectionManager.GetHubContext<NotificacionHub>().Clients.All.addNotificacion(notificacion);

                EmailModel envio = new EmailModel();
                envio.area = c.Nombre_AreaNegocio;
                envio.process = c.Nombre_Proceso;
                envio.modelMail = EmailModel.MODEL_SOLICITUD_POR_DEMANDA;
                envio.estado = c.Nombre_EstadoEjecucionInformatica;

                try
                {
                    _ = Task.Run(() => new Utils.Email().SendEmail(envio));
                    Utils.Notifitaions.startTaskNotifications();
                }
                catch (SmtpException e) { 
                
                }
                
                

            }
            
            return CreatedAtRoute("DefaultApi", new { id = oPE_SolicitudEjecucionPorDemandaProceso.Id_SolicitudEjecucionPorDemanda }, oPE_SolicitudEjecucionPorDemandaProceso);
        }

        // DELETE: api/OPE_SolicitudEjecucionPorDemandaProceso/5
        [ResponseType(typeof(OPE_SolicitudEjecucionPorDemandaProceso))]
        public async Task<IHttpActionResult> DeleteOPE_SolicitudEjecucionPorDemandaProceso(int id)
        {
            OPE_SolicitudEjecucionPorDemandaProceso oPE_SolicitudEjecucionPorDemandaProceso = await db.OPE_SolicitudEjecucionPorDemandaProceso.FindAsync(id);
            if (oPE_SolicitudEjecucionPorDemandaProceso == null)
            {
                return NotFound();
            }

            db.OPE_SolicitudEjecucionPorDemandaProceso.Remove(oPE_SolicitudEjecucionPorDemandaProceso);
            await db.SaveChangesAsync();

            return Ok(oPE_SolicitudEjecucionPorDemandaProceso);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_SolicitudEjecucionPorDemandaProcesoExists(int id)
        {
            return db.OPE_SolicitudEjecucionPorDemandaProceso.Count(e => e.Id_SolicitudEjecucionPorDemanda == id) > 0;
        }
    }
}