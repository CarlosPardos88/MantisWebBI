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
    public class OPE_EstadoEjecucionProcesoController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_EstadoEjecucionProceso
        public IQueryable<OPE_EstadoEjecucionProceso> GetOPE_EstadoEjecucionProceso()
        {
            return db.OPE_EstadoEjecucionProceso;
        }

        // GET: api/OPE_EstadoEjecucionProceso/5
        [ResponseType(typeof(OPE_EstadoEjecucionProceso))]
        public IHttpActionResult GetOPE_EstadoEjecucionProceso(int id)
        {
            OPE_EstadoEjecucionProceso oPE_EstadoEjecucionProceso = db.OPE_EstadoEjecucionProceso.Find(id);
            if (oPE_EstadoEjecucionProceso == null)
            {
                return NotFound();
            }

            return Ok(oPE_EstadoEjecucionProceso);
        }

        // PUT: api/OPE_EstadoEjecucionProceso/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOPE_EstadoEjecucionProceso(int id, OPE_EstadoEjecucionProceso oPE_EstadoEjecucionProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_EstadoEjecucionProceso.Id_EstadoEjecucion)
            {
                return BadRequest();
            }

            db.Entry(oPE_EstadoEjecucionProceso).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_EstadoEjecucionProcesoExists(id))
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

        // POST: api/OPE_EstadoEjecucionProceso
        [ResponseType(typeof(OPE_EstadoEjecucionProceso))]
        public IHttpActionResult PostOPE_EstadoEjecucionProceso(OPE_EstadoEjecucionProceso oPE_EstadoEjecucionProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OPE_EstadoEjecucionProceso.Add(oPE_EstadoEjecucionProceso);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OPE_EstadoEjecucionProcesoExists(oPE_EstadoEjecucionProceso.Id_EstadoEjecucion))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_EstadoEjecucionProceso.Id_EstadoEjecucion }, oPE_EstadoEjecucionProceso);
        }

        // DELETE: api/OPE_EstadoEjecucionProceso/5
        [ResponseType(typeof(OPE_EstadoEjecucionProceso))]
        public IHttpActionResult DeleteOPE_EstadoEjecucionProceso(int id)
        {
            OPE_EstadoEjecucionProceso oPE_EstadoEjecucionProceso = db.OPE_EstadoEjecucionProceso.Find(id);
            if (oPE_EstadoEjecucionProceso == null)
            {
                return NotFound();
            }

            db.OPE_EstadoEjecucionProceso.Remove(oPE_EstadoEjecucionProceso);
            db.SaveChanges();

            Utils.Notifitaions.startTaskNotifications();
            return Ok(oPE_EstadoEjecucionProceso);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_EstadoEjecucionProcesoExists(int id)
        {
            return db.OPE_EstadoEjecucionProceso.Count(e => e.Id_EstadoEjecucion == id) > 0;
        }
    }
}