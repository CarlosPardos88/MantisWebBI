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
    public class OPE_TipoEjecucionDemandaController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_TipoEjecucionDemanda
        public IQueryable<OPE_TipoEjecucionDemanda> GetOPE_TipoEjecucionDemanda()
        {
            return db.OPE_TipoEjecucionDemanda;
        }

        // GET: api/OPE_TipoEjecucionDemanda/5
        [ResponseType(typeof(OPE_TipoEjecucionDemanda))]
        public async Task<IHttpActionResult> GetOPE_TipoEjecucionDemanda(int id)
        {
            OPE_TipoEjecucionDemanda oPE_TipoEjecucionDemanda = await db.OPE_TipoEjecucionDemanda.FindAsync(id);
            if (oPE_TipoEjecucionDemanda == null)
            {
                return NotFound();
            }

            return Ok(oPE_TipoEjecucionDemanda);
        }

        // PUT: api/OPE_TipoEjecucionDemanda/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_TipoEjecucionDemanda(int id, OPE_TipoEjecucionDemanda oPE_TipoEjecucionDemanda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_TipoEjecucionDemanda.Id_TipoEjecucionDemanda)
            {
                return BadRequest();
            }

            db.Entry(oPE_TipoEjecucionDemanda).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_TipoEjecucionDemandaExists(id))
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

        // POST: api/OPE_TipoEjecucionDemanda
        [ResponseType(typeof(OPE_TipoEjecucionDemanda))]
        public async Task<IHttpActionResult> PostOPE_TipoEjecucionDemanda(OPE_TipoEjecucionDemanda oPE_TipoEjecucionDemanda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OPE_TipoEjecucionDemanda.Add(oPE_TipoEjecucionDemanda);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OPE_TipoEjecucionDemandaExists(oPE_TipoEjecucionDemanda.Id_TipoEjecucionDemanda))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_TipoEjecucionDemanda.Id_TipoEjecucionDemanda }, oPE_TipoEjecucionDemanda);
        }

        // DELETE: api/OPE_TipoEjecucionDemanda/5
        [ResponseType(typeof(OPE_TipoEjecucionDemanda))]
        public async Task<IHttpActionResult> DeleteOPE_TipoEjecucionDemanda(int id)
        {
            OPE_TipoEjecucionDemanda oPE_TipoEjecucionDemanda = await db.OPE_TipoEjecucionDemanda.FindAsync(id);
            if (oPE_TipoEjecucionDemanda == null)
            {
                return NotFound();
            }

            db.OPE_TipoEjecucionDemanda.Remove(oPE_TipoEjecucionDemanda);
            await db.SaveChangesAsync();

            return Ok(oPE_TipoEjecucionDemanda);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_TipoEjecucionDemandaExists(int id)
        {
            return db.OPE_TipoEjecucionDemanda.Count(e => e.Id_TipoEjecucionDemanda == id) > 0;
        }
    }
}