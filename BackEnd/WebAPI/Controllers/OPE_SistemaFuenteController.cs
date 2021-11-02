using BllTD;
using EntitiesTD;
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
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Hubs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class OPE_SistemaFuenteController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();
        RelProSisBll relProSisBll= new RelProSisBll();
        // GET: api/OPE_SistemaFuente
        public IEnumerable<OPE_SistemaFuenteDTO> GetOPE_SistemaFuente()
        {
            var sistemasList = (from p in db.Set<OPE_SistemaFuente>()
                                join e in db.Set<OPE_TipoSistemaFuente>()
                                      on p.Id_TipoSistemaFuente equals e.Id_TipoSistemaFuente
                                join h in db.Set<OPE_HorarioSistemaFuente>()
                                      on p.Id_SistemaFuente equals h.Id_SistemaFuente
                                select new OPE_SistemaFuenteDTO
                                {
                                    Id_SistemaFuente = p.Id_SistemaFuente,
                                    Nombre_SistemaFuente = p.Nombre_SistemaFuente,
                                    Id_TipoSistemaFuente = p.Id_TipoSistemaFuente,
                                    Nombre_TipoSistemaFuente = e.Nombre_TipoSistemaFuente,
                                    Hora_Fin = h.Hora_Fin,
                                    Hora_Inicio = h.Hora_Inicio,
                                }).ToList();
            return sistemasList;
        }

        //[HttpGet]
        //[Route("api/OPE_SistemaFuente/GetId")]
        //// GET: api/OPE_SistemaFuente/5
        //[ResponseType(typeof(OPE_SistemaFuente))]
        public async Task<IHttpActionResult> GetOPE_SistemaFuente(int id)
        {
            var oPE_SistemaFuente = (from p in db.Set<OPE_SistemaFuente>()
                                join e in db.Set<OPE_TipoSistemaFuente>()
                                      on p.Id_TipoSistemaFuente equals e.Id_TipoSistemaFuente
                                join h in db.Set<OPE_HorarioSistemaFuente>()
                                      on p.Id_SistemaFuente equals h.Id_SistemaFuente
                                      where p.Id_SistemaFuente == id
                                select new OPE_SistemaFuenteDTO
                                {
                                    Id_SistemaFuente = p.Id_SistemaFuente,
                                    Nombre_SistemaFuente = p.Nombre_SistemaFuente,
                                    Id_TipoSistemaFuente = p.Id_TipoSistemaFuente,
                                    Nombre_TipoSistemaFuente = e.Nombre_TipoSistemaFuente,
                                    Hora_Fin = h.Hora_Fin,
                                    Hora_Inicio = h.Hora_Inicio,
                                }).SingleOrDefault();

            //OPE_SistemaFuente oPE_SistemaFuente = await db.OPE_SistemaFuente.FindAsync(id);
            if (oPE_SistemaFuente == null)
            {
                return NotFound();
            }

            return Ok(oPE_SistemaFuente);
        }


        [HttpGet]
        [Route("api/OPE_SistemaFuente/GetIdProceso")]
        public IEnumerable<OPE_SistemaFuente> GetOPE_SistemaFuenteIdProcesos(int idProceso)
        {
            var OPEs = db.OPE_Proceso.Find(idProceso);


            return OPEs.OPE_SistemaFuente.ToList();
        }

        // PUT: api/OPE_SistemaFuente/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_SistemaFuente(int id, OPE_SistemaFuente oPE_SistemaFuente)
        {
            string horario = "";
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_SistemaFuente.Id_SistemaFuente)
            {
                return BadRequest();
            }

            db.Entry(oPE_SistemaFuente).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_SistemaFuenteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            List<RelProcSist> listRel = relProSisBll.GetRelProcesoFuente(id);

            List<OPE_Proceso> listProcesos = new List<OPE_Proceso>();

            foreach (RelProcSist rel in listRel)
            {
                List<OPE_Proceso> listProcesosTmp = (from p in db.Set<OPE_ProgramacionPeriodicaProceso>()
                                                     join pp in db.Set<OPE_Proceso>()
                                                     on p.Id_Proceso equals pp.Id_Proceso
                                                     where p.Fecha_Eliminado == null
                                                     where p.Cb_Activo == "N"
                                                     where p.Id_Proceso == rel.Id_Proceso
                                                     select pp).ToList()
                        .Select(x => new OPE_Proceso
                        {
                            Nombre_Proceso = x.Nombre_Proceso,
                            Id_Proceso = x.Id_Proceso,
                            OPE_AreaNegocio = x.OPE_AreaNegocio

                        }).GroupBy(p => p.Nombre_Proceso).Select(p => p.First()).ToList();

                listProcesos.AddRange(listProcesosTmp);
            }

            if (listProcesos.Count > 0)
            {
                List<string> listAreasPorAproEnv = listProcesos.Select(x => x.OPE_AreaNegocio.Nombre_AreaNegocio).Distinct().ToList();


                if (listAreasPorAproEnv.Count > 0)
                {
                    if (oPE_SistemaFuente.OPE_HorarioSistemaFuente.Count > 0)
                    {
                        horario =
                               oPE_SistemaFuente.OPE_HorarioSistemaFuente.ToList()[0].Hora_Inicio + " - " + oPE_SistemaFuente.OPE_HorarioSistemaFuente.ToList()[0].Hora_Fin;
                        foreach (string area in listAreasPorAproEnv)
                        {
                            List<string> listPorAproEnvTmp = new List<string>();

                            listPorAproEnvTmp = listProcesos.Where(x => x.OPE_AreaNegocio.Nombre_AreaNegocio == area)
                            .Select(p => p.Nombre_Proceso).ToList();

                            if (listPorAproEnvTmp.Count > 0)
                            {


                                EmailModel envio = new EmailModel();
                                envio.modelMail = EmailModel.MODEL_WF_INACTIVO_FUENTE;
                                envio.listWf = listPorAproEnvTmp;
                                envio.area = area;
                                envio.fuente = oPE_SistemaFuente.Nombre_SistemaFuente;
                                envio.hora = horario;
                                try
                                {
                                    _ = Task.Run(() => new Utils.Email().SendEmail(envio));
                                    Utils.Notifitaions.startTaskNotifications();
                                }
                                catch (SmtpException)
                                {
                                    throw;
                                }
                            }
                        }
                    }

                }

                    foreach (OPE_Proceso c in listProcesos)
                    {

                        NotificacionModel notificacion = new NotificacionModel();
                        notificacion.area = c.OPE_AreaNegocio.Nombre_AreaNegocio;
                        notificacion.idProceso = c.Id_Proceso;
                        notificacion.nombreProceso = c.Nombre_Proceso;
                        notificacion.msj = "Un cambio de horario en el sistema fuente: " + oPE_SistemaFuente.Nombre_SistemaFuente + ", impactó la programación del proceso: " + c.Nombre_Proceso;
                        notificacion.titulo = "Proceso impactado";
                        notificacion.tipo = Constantes.TIPO_NOTIFICACION_PROCESO_IMPACTADO;

                        GlobalHost.ConnectionManager.GetHubContext<NotificacionHub>().Clients.All.addNotificacion(notificacion);
                    }
                }
                return StatusCode(HttpStatusCode.NoContent);
            
        }
        // POST: api/OPE_SistemaFuente
        [ResponseType(typeof(OPE_SistemaFuente))]
        public async Task<IHttpActionResult> PostOPE_SistemaFuente(OPE_SistemaFuente oPE_SistemaFuente)
        {

            db.Entry(oPE_SistemaFuente.OPE_TipoSistemaFuente).State = EntityState.Modified;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!OPE_SistemaFuenteExistsByname(oPE_SistemaFuente.Nombre_SistemaFuente))
            {
                db.OPE_SistemaFuente.Add(oPE_SistemaFuente);
                await db.SaveChangesAsync();

                return CreatedAtRoute("DefaultApi", new { id = oPE_SistemaFuente.Id_SistemaFuente }, oPE_SistemaFuente);
            }
            else
            {
                var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(string.Format("Sistema fuente ya existe = {0}", oPE_SistemaFuente.Nombre_SistemaFuente)),
                    ReasonPhrase = "Sistema fuente ya existe con ese nombre"
                };
                throw new HttpResponseException(resp);
            }

        }

        // DELETE: api/OPE_SistemaFuente/5
        [ResponseType(typeof(OPE_SistemaFuente))]
        public async Task<IHttpActionResult> DeleteOPE_SistemaFuente(int id)
        {
            OPE_SistemaFuente oPE_SistemaFuente = await db.OPE_SistemaFuente.FindAsync(id);
            if (oPE_SistemaFuente == null)
            {
                return NotFound();
            }
            try
            {
                db.OPE_SistemaFuente.Remove(oPE_SistemaFuente);

                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            return Ok(oPE_SistemaFuente);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_SistemaFuenteExists(int id)
        {
            return db.OPE_SistemaFuente.Count(e => e.Id_SistemaFuente == id) > 0;
        }

        private bool OPE_SistemaFuenteExistsByname(string nombre)
        {
            return db.OPE_SistemaFuente.Count(e => e.Nombre_SistemaFuente == nombre) > 0;
        }
    }
}