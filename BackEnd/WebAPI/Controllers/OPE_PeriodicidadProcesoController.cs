using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class OPE_PeriodicidadProcesoController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_PeriodicidadProceso
        public IEnumerable<OPE_PeriodicidadProceso> GetOPE_PeriodicidadProceso()
        {
            return (from p in db.Set<OPE_PeriodicidadProceso>()
                    select p).ToList()
            .Select(x => new OPE_PeriodicidadProceso
            {
                Id_Periodicidad = x.Id_Periodicidad,
                Nombre_Periodicidad = x.Nombre_Periodicidad
            });
        }
        /*public IQueryable<OPE_PeriodicidadProceso> GetOPE_PeriodicidadProceso()
        {
            return db.OPE_PeriodicidadProceso;
        }*/

        // GET: api/OPE_PeriodicidadProceso/5
        [ResponseType(typeof(OPE_PeriodicidadProceso))]
        public IHttpActionResult GetOPE_PeriodicidadProceso(int id)
        {
            OPE_PeriodicidadProceso oPE_PeriodicidadProceso = db.OPE_PeriodicidadProceso.Find(id);
            if (oPE_PeriodicidadProceso == null)
            {
                return NotFound();
            }

            return Ok(oPE_PeriodicidadProceso);
        }

        // PUT: api/OPE_PeriodicidadProceso/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOPE_PeriodicidadProceso(int id, OPE_PeriodicidadProceso oPE_PeriodicidadProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_PeriodicidadProceso.Id_Periodicidad)
            {
                return BadRequest();
            }

            db.Entry(oPE_PeriodicidadProceso).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_PeriodicidadProcesoExists(id))
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

        // POST: api/OPE_PeriodicidadProceso
        [ResponseType(typeof(OPE_PeriodicidadProceso))]
        public IHttpActionResult PostOPE_PeriodicidadProceso(OPE_PeriodicidadProceso oPE_PeriodicidadProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(oPE_PeriodicidadProceso).State = EntityState.Modified;
            db.OPE_PeriodicidadProceso.Add(oPE_PeriodicidadProceso);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OPE_PeriodicidadProcesoExists(oPE_PeriodicidadProceso.Id_Periodicidad))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_PeriodicidadProceso.Id_Periodicidad }, oPE_PeriodicidadProceso);
        }

        // DELETE: api/OPE_PeriodicidadProceso/5
        [ResponseType(typeof(OPE_PeriodicidadProceso))]
        public IHttpActionResult DeleteOPE_PeriodicidadProceso(int id)
        {
            OPE_PeriodicidadProceso oPE_PeriodicidadProceso = db.OPE_PeriodicidadProceso.Find(id);
            if (oPE_PeriodicidadProceso == null)
            {
                return NotFound();
            }

            db.OPE_PeriodicidadProceso.Remove(oPE_PeriodicidadProceso);
            db.SaveChanges();

            return Ok(oPE_PeriodicidadProceso);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_PeriodicidadProcesoExists(int id)
        {
            return db.OPE_PeriodicidadProceso.Count(e => e.Id_Periodicidad == id) > 0;
        }
    }
}