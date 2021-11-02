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
    public class OPE_TipoSistemaFuenteController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_TipoSistemaFuente
        public IEnumerable<OPE_TipoSistemaFuente> GetOPE_TipoSistemaFuente()
        {
            return (from p in db.Set<OPE_TipoSistemaFuente>()
                    select p).ToList()
             .Select(x => new OPE_TipoSistemaFuente
             {
                 Id_TipoSistemaFuente = x.Id_TipoSistemaFuente,
                 Nombre_TipoSistemaFuente = x.Nombre_TipoSistemaFuente
             });
        }

        // GET: api/OPE_TipoSistemaFuente/5
        [ResponseType(typeof(OPE_TipoSistemaFuente))]
        public async Task<IHttpActionResult> GetOPE_TipoSistemaFuente(int id)
        {
            OPE_TipoSistemaFuente oPE_TipoSistemaFuente = await db.OPE_TipoSistemaFuente.FindAsync(id);
            if (oPE_TipoSistemaFuente == null)
            {
                return NotFound();
            }

            return Ok(oPE_TipoSistemaFuente);
        }

        // PUT: api/OPE_TipoSistemaFuente/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_TipoSistemaFuente(int id, OPE_TipoSistemaFuente oPE_TipoSistemaFuente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_TipoSistemaFuente.Id_TipoSistemaFuente)
            {
                return BadRequest();
            }

            db.Entry(oPE_TipoSistemaFuente).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_TipoSistemaFuenteExists(id))
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

        // POST: api/OPE_TipoSistemaFuente
        [ResponseType(typeof(OPE_TipoSistemaFuente))]
        public async Task<IHttpActionResult> PostOPE_TipoSistemaFuente(OPE_TipoSistemaFuente oPE_TipoSistemaFuente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OPE_TipoSistemaFuente.Add(oPE_TipoSistemaFuente);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = oPE_TipoSistemaFuente.Id_TipoSistemaFuente }, oPE_TipoSistemaFuente);
        }

        // DELETE: api/OPE_TipoSistemaFuente/5
        [ResponseType(typeof(OPE_TipoSistemaFuente))]
        public async Task<IHttpActionResult> DeleteOPE_TipoSistemaFuente(int id)
        {
            OPE_TipoSistemaFuente oPE_TipoSistemaFuente = await db.OPE_TipoSistemaFuente.FindAsync(id);
            if (oPE_TipoSistemaFuente == null)
            {
                return NotFound();
            }

            db.OPE_TipoSistemaFuente.Remove(oPE_TipoSistemaFuente);
            await db.SaveChangesAsync();

            return Ok(oPE_TipoSistemaFuente);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_TipoSistemaFuenteExists(int id)
        {
            return db.OPE_TipoSistemaFuente.Count(e => e.Id_TipoSistemaFuente == id) > 0;
        }
    }
}