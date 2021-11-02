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
    public class OPE_AprobacionProgramacionPeriodicaProcesoController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_AprobacionProgramacionPeriodicaProceso
        public IQueryable<OPE_AprobacionProgramacionPeriodicaProceso> GetOPE_AprobacionProgramacionPeriodicaProceso()
        {
            return db.OPE_AprobacionProgramacionPeriodicaProceso;
        }

        // GET: api/OPE_AprobacionProgramacionPeriodicaProceso/5
        [ResponseType(typeof(OPE_AprobacionProgramacionPeriodicaProceso))]
        public IHttpActionResult GetOPE_AprobacionProgramacionPeriodicaProceso(int id)
        {
            OPE_AprobacionProgramacionPeriodicaProceso oPE_AprobacionProgramacionPeriodicaProceso = db.OPE_AprobacionProgramacionPeriodicaProceso.Find(id);
            if (oPE_AprobacionProgramacionPeriodicaProceso == null)
            {
                return NotFound();
            }

            return Ok(oPE_AprobacionProgramacionPeriodicaProceso);
        }

        // PUT: api/OPE_AprobacionProgramacionPeriodicaProceso/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOPE_AprobacionProgramacionPeriodicaProceso(int id, OPE_AprobacionProgramacionPeriodicaProceso oPE_AprobacionProgramacionPeriodicaProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_AprobacionProgramacionPeriodicaProceso.Id_AprobacionProgramacionPeriodica)
            {
                return BadRequest();
            }

            db.Entry(oPE_AprobacionProgramacionPeriodicaProceso).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_AprobacionProgramacionPeriodicaProcesoExists(id))
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

        // POST: api/OPE_AprobacionProgramacionPeriodicaProceso
        [ResponseType(typeof(OPE_AprobacionProgramacionPeriodicaProceso))]
        public IHttpActionResult PostOPE_AprobacionProgramacionPeriodicaProceso(OPE_AprobacionProgramacionPeriodicaProceso oPE_AprobacionProgramacionPeriodicaProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OPE_AprobacionProgramacionPeriodicaProceso.Add(oPE_AprobacionProgramacionPeriodicaProceso);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OPE_AprobacionProgramacionPeriodicaProcesoExists(oPE_AprobacionProgramacionPeriodicaProceso.Id_AprobacionProgramacionPeriodica))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_AprobacionProgramacionPeriodicaProceso.Id_AprobacionProgramacionPeriodica }, oPE_AprobacionProgramacionPeriodicaProceso);
        }

        // DELETE: api/OPE_AprobacionProgramacionPeriodicaProceso/5
        [ResponseType(typeof(OPE_AprobacionProgramacionPeriodicaProceso))]
        public IHttpActionResult DeleteOPE_AprobacionProgramacionPeriodicaProceso(int id)
        {
            OPE_AprobacionProgramacionPeriodicaProceso oPE_AprobacionProgramacionPeriodicaProceso = db.OPE_AprobacionProgramacionPeriodicaProceso.Find(id);
            if (oPE_AprobacionProgramacionPeriodicaProceso == null)
            {
                return NotFound();
            }

            db.OPE_AprobacionProgramacionPeriodicaProceso.Remove(oPE_AprobacionProgramacionPeriodicaProceso);
            db.SaveChanges();

            return Ok(oPE_AprobacionProgramacionPeriodicaProceso);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_AprobacionProgramacionPeriodicaProcesoExists(int id)
        {
            return db.OPE_AprobacionProgramacionPeriodicaProceso.Count(e => e.Id_AprobacionProgramacionPeriodica == id) > 0;
        }
    }
}