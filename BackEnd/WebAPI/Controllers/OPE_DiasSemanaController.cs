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
    public class OPE_DiasSemanaController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_DiasSemana
        public IQueryable<OPE_DiasSemana> GetOPE_DiasSemana()
        {
            return db.OPE_DiasSemana;
        }

        // GET: api/OPE_DiasSemana/5
        [ResponseType(typeof(OPE_DiasSemana))]
        public IHttpActionResult GetOPE_DiasSemana(int id)
        {
            OPE_DiasSemana oPE_DiasSemana = db.OPE_DiasSemana.Find(id);
            if (oPE_DiasSemana == null)
            {
                return NotFound();
            }

            return Ok(oPE_DiasSemana);
        }

        // PUT: api/OPE_DiasSemana/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOPE_DiasSemana(int id, OPE_DiasSemana oPE_DiasSemana)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_DiasSemana.Id_DiaSemana)
            {
                return BadRequest();
            }

            db.Entry(oPE_DiasSemana).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_DiasSemanaExists(id))
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

        // POST: api/OPE_DiasSemana
        [ResponseType(typeof(OPE_DiasSemana))]
        public IHttpActionResult PostOPE_DiasSemana(OPE_DiasSemana oPE_DiasSemana)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OPE_DiasSemana.Add(oPE_DiasSemana);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OPE_DiasSemanaExists(oPE_DiasSemana.Id_DiaSemana))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_DiasSemana.Id_DiaSemana }, oPE_DiasSemana);
        }

        // DELETE: api/OPE_DiasSemana/5
        [ResponseType(typeof(OPE_DiasSemana))]
        public IHttpActionResult DeleteOPE_DiasSemana(int id)
        {
            OPE_DiasSemana oPE_DiasSemana = db.OPE_DiasSemana.Find(id);
            if (oPE_DiasSemana == null)
            {
                return NotFound();
            }

            db.OPE_DiasSemana.Remove(oPE_DiasSemana);
            db.SaveChanges();

            return Ok(oPE_DiasSemana);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_DiasSemanaExists(int id)
        {
            return db.OPE_DiasSemana.Count(e => e.Id_DiaSemana == id) > 0;
        }
    }
}