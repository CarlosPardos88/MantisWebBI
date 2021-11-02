using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class OPE_HorarioSistemaFuenteController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_HorarioSistemaFuente
        public IQueryable<OPE_HorarioSistemaFuente> GetOPE_HorarioSistemaFuente()
        {
            return db.OPE_HorarioSistemaFuente;
        }

        // GET: api/OPE_HorarioSistemaFuente/5
        [ResponseType(typeof(OPE_HorarioSistemaFuente))]
        public async Task<IHttpActionResult> GetOPE_HorarioSistemaFuente(TimeSpan id)
        {
            OPE_HorarioSistemaFuente oPE_HorarioSistemaFuente = await db.OPE_HorarioSistemaFuente.FindAsync(id);
            if (oPE_HorarioSistemaFuente == null)
            {
                return NotFound();
            }

            return Ok(oPE_HorarioSistemaFuente);
        }

        // PUT: api/OPE_HorarioSistemaFuente/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_HorarioSistemaFuente(int Id_SistemaFuente, TimeSpan id, OPE_HorarioSistemaFuente oPE_HorarioSistemaFuente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_HorarioSistemaFuente.Hora_Inicio && Id_SistemaFuente != oPE_HorarioSistemaFuente.Id_SistemaFuente)
            {
                return BadRequest();
            }

            db.Entry(oPE_HorarioSistemaFuente).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_HorarioSistemaFuenteExists(id, Id_SistemaFuente))
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

        // POST: api/OPE_HorarioSistemaFuente
        [ResponseType(typeof(OPE_HorarioSistemaFuente))]
        public async Task<IHttpActionResult> PostOPE_HorarioSistemaFuente(OPE_HorarioSistemaFuente oPE_HorarioSistemaFuente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(oPE_HorarioSistemaFuente).State = EntityState.Modified;
            db.OPE_HorarioSistemaFuente.Add(oPE_HorarioSistemaFuente);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OPE_HorarioSistemaFuenteExists(oPE_HorarioSistemaFuente.Hora_Inicio, oPE_HorarioSistemaFuente.Id_SistemaFuente))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_HorarioSistemaFuente.Hora_Inicio }, oPE_HorarioSistemaFuente);
        }

        // DELETE: api/OPE_HorarioSistemaFuente/5
        [ResponseType(typeof(OPE_HorarioSistemaFuente))]
        public async Task<IHttpActionResult> DeleteOPE_HorarioSistemaFuente(int Id_SistemaFuente, TimeSpan id)
        {
            OPE_HorarioSistemaFuente oPE_HorarioSistemaFuente = await db.OPE_HorarioSistemaFuente.FindAsync(Id_SistemaFuente, id);
            if (oPE_HorarioSistemaFuente == null)
            {
                return NotFound();
            }

            db.OPE_HorarioSistemaFuente.Remove(oPE_HorarioSistemaFuente);
            await db.SaveChangesAsync();

            return Ok(oPE_HorarioSistemaFuente);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_HorarioSistemaFuenteExists(TimeSpan id, int Id_SistemaFuente)
        {
            return db.OPE_HorarioSistemaFuente.Count(e => (e.Hora_Inicio == id && e.Id_SistemaFuente == Id_SistemaFuente)) > 0;
        }
    }
}