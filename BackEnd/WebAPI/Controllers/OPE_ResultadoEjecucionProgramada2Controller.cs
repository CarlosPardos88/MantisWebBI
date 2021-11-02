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
    public class OPE_ResultadoEjecucionProgramada2Controller : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_ResultadoEjecucionProgramada
        public IQueryable<OPE_ResultadoEjecucionProgramada> GetOPE_ResultadoEjecucionProgramada()
        {
            return db.OPE_ResultadoEjecucionProgramada;
        }

        // GET: api/OPE_ResultadoEjecucionProgramada/5
        [ResponseType(typeof(OPE_ResultadoEjecucionProgramada))]
        public async Task<IHttpActionResult> GetOPE_ResultadoEjecucionProgramada(int id)
        {
            var oPE_ResultadoEjecucionProgramada = (from t in db.OPE_ResultadoEjecucionProgramada
                     where t.Id_ResultadoEjecucionProgramada == id
                     select new OPE_ResultadoEjecucionProgramadaDTO
                     {
                         FechaHora_InicioEjecucion = t.FechaHora_InicioEjecucion,
                         FechaHora_RevisionOperador = t.FechaHora_RevisionOperador,
                         FechaHora_FinEjecucion = t.FechaHora_FinEjecucion,
                         FechaHora_RevisionUsuario = t.FechaHora_RevisionUsuario,
                         Id_Proceso = t.Id_Proceso,
                         Id_ResultadoEjecucionProgramada= t.Id_ResultadoEjecucionProgramada,
                         Id_AprobacionProgramacionPeriodica= t.Id_AprobacionProgramacionPeriodica,
                         Id_EstadoEjecucionInformatica = t.Id_EstadoEjecucionInformatica,
                         Id_EstadoOperadorEjecucionProceso = t.Id_EstadoOperadorEjecucionProceso,
                         Id_EstadoUsuarioEjecucionProceso= t.Id_EstadoUsuarioEjecucionProceso,
                         Id_ProgramacionPeriodica = t.Id_ProgramacionPeriodica,
                         Id_SolicitudEjecucionPorDemanda = t.Id_SolicitudEjecucionPorDemanda,
                         Nombre_OperadorRevisor= t.Nombre_OperadorRevisor,
                         Nombre_RolOperadorRevisor = t.Nombre_RolOperadorRevisor,
                         Nombre_RolUsuarioRevisor = t.Nombre_RolUsuarioRevisor,
                         Nombre_UsuarioRevisor = t.Nombre_UsuarioRevisor
                     }).SingleOrDefault();
                     //   Console.WriteLine(oPE_ResultadoEjecucionProgramada['FechaHora_RevisionUsuario']);

            //OPE_ResultadoEjecucionProgramada oPE_ResultadoEjecucionProgramada = await db.OPE_ResultadoEjecucionProgramada.FindAsync(id);
            if (oPE_ResultadoEjecucionProgramada == null)
            {
                return NotFound();
            }

            return Ok(oPE_ResultadoEjecucionProgramada);
        }

        // PUT: api/OPE_ResultadoEjecucionProgramada/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_ResultadoEjecucionProgramada(int id, OPE_ResultadoEjecucionProgramada oPE_ResultadoEjecucionProgramada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_ResultadoEjecucionProgramada.Id_ResultadoEjecucionProgramada)
            {
                return BadRequest();
            }

            //db.Entry(oPE_ResultadoEjecucionProgramada).State = EntityState.Modified;

           
            try
            {
                db.OPE_ResultadoEjecucionProgramada.Attach(oPE_ResultadoEjecucionProgramada);
                db.Entry(oPE_ResultadoEjecucionProgramada).Property(x => x.Id_EstadoUsuarioEjecucionProceso).IsModified = true;
                db.Entry(oPE_ResultadoEjecucionProgramada).Property(x => x.Id_EstadoOperadorEjecucionProceso).IsModified = true;

                //update segun perfil

                if (oPE_ResultadoEjecucionProgramada.FechaHora_RevisionUsuario != null)
                {
                    oPE_ResultadoEjecucionProgramada.FechaHora_RevisionUsuario = DateTime.Now;
                    db.Entry(oPE_ResultadoEjecucionProgramada).Property(x => x.Nombre_RolUsuarioRevisor).IsModified = true;
                    db.Entry(oPE_ResultadoEjecucionProgramada).Property(x => x.Nombre_UsuarioRevisor).IsModified = true;
                    db.Entry(oPE_ResultadoEjecucionProgramada).Property(x => x.FechaHora_RevisionUsuario).IsModified = true;
                }
                if (oPE_ResultadoEjecucionProgramada.FechaHora_RevisionOperador != null)
                {
                    oPE_ResultadoEjecucionProgramada.FechaHora_RevisionOperador = DateTime.Now;               
                    db.Entry(oPE_ResultadoEjecucionProgramada).Property(x => x.Nombre_OperadorRevisor).IsModified = true;
                    db.Entry(oPE_ResultadoEjecucionProgramada).Property(x => x.Nombre_RolOperadorRevisor).IsModified = true;
                    db.Entry(oPE_ResultadoEjecucionProgramada).Property(x => x.FechaHora_RevisionOperador).IsModified = true;
                }                
                
                
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_ResultadoEjecucionProgramadaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/OPE_ResultadoEjecucionProgramada
        [ResponseType(typeof(OPE_ResultadoEjecucionProgramada))]
        public async Task<IHttpActionResult> PostOPE_ResultadoEjecucionProgramada(OPE_ResultadoEjecucionProgramada oPE_ResultadoEjecucionProgramada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OPE_ResultadoEjecucionProgramada.Add(oPE_ResultadoEjecucionProgramada);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = oPE_ResultadoEjecucionProgramada.Id_ResultadoEjecucionProgramada }, oPE_ResultadoEjecucionProgramada);
        }

        // DELETE: api/OPE_ResultadoEjecucionProgramada/5
        [ResponseType(typeof(OPE_ResultadoEjecucionProgramada))]
        public async Task<IHttpActionResult> DeleteOPE_ResultadoEjecucionProgramada(int id)
        {
            OPE_ResultadoEjecucionProgramada oPE_ResultadoEjecucionProgramada = await db.OPE_ResultadoEjecucionProgramada.FindAsync(id);
            if (oPE_ResultadoEjecucionProgramada == null)
            {
                return NotFound();
            }

            db.OPE_ResultadoEjecucionProgramada.Remove(oPE_ResultadoEjecucionProgramada);
            await db.SaveChangesAsync();

            return Ok(oPE_ResultadoEjecucionProgramada);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_ResultadoEjecucionProgramadaExists(int id)
        {
            return db.OPE_ResultadoEjecucionProgramada.Count(e => e.Id_ResultadoEjecucionProgramada == id) > 0;
        }
    }
}