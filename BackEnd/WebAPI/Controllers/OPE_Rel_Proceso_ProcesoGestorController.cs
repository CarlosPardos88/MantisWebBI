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
    public class OPE_Rel_Proceso_ProcesoGestorController : ApiController
    {
        readonly BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        public IEnumerable<OPE_Rel_Proceso_ProcesoGestorDTO> GetProcesoPrerequisito()
        {
            var oPE_rProcesoP = (from p in db.OPE_Rel_Proceso_ProcesoGestor
                                     //join ProceG in db.OPE_Rel_Proceso_ProcesoGestor
                                     //on p.Id_Proceso equals ProceG.Id_Proceso
                                 select new OPE_Rel_Proceso_ProcesoGestorDTO
                                 {
                                     Id_Proceso = p.Id_Proceso,
                                     Id_ProcesoGestor = p.Id_ProcesoGestor
                                 }).ToList();
            return oPE_rProcesoP;
        }

        // GET: api/OPE_Rel_Proceso_ProcesoGestor/5
        [ResponseType(typeof(OPE_Rel_Proceso_ProcesoGestor))]
        public IHttpActionResult GetOPE_Rel_Proceso_ProcesoGestor(string id)
        {
            OPE_Rel_Proceso_ProcesoGestor oPE_Rel_Proceso_ProcesoGestor = db.OPE_Rel_Proceso_ProcesoGestor.Find(id);
            if (oPE_Rel_Proceso_ProcesoGestor == null)
            {
                return NotFound();
            }

            return Ok(oPE_Rel_Proceso_ProcesoGestor);
        }

        // PUT: api/OPE_Rel_Proceso_ProcesoGestor/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOPE_Rel_Proceso_ProcesoGestor(string id, OPE_Rel_Proceso_ProcesoGestor oPE_Rel_Proceso_ProcesoGestor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_Rel_Proceso_ProcesoGestor.Id_ProcesoGestor)
            {
                return BadRequest();
            }

            db.Entry(oPE_Rel_Proceso_ProcesoGestor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_Rel_Proceso_ProcesoGestorExists(id))
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

        // POST: api/OPE_Rel_Proceso_ProcesoGestor
        [ResponseType(typeof(OPE_Rel_Proceso_ProcesoGestor))]
        public IHttpActionResult PostOPE_Rel_Proceso_ProcesoGestor(OPE_Rel_Proceso_ProcesoGestor oPE_Rel_Proceso_ProcesoGestor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OPE_Rel_Proceso_ProcesoGestor.Add(oPE_Rel_Proceso_ProcesoGestor);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OPE_Rel_Proceso_ProcesoGestorExists(oPE_Rel_Proceso_ProcesoGestor.Id_ProcesoGestor))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_Rel_Proceso_ProcesoGestor.Id_ProcesoGestor }, oPE_Rel_Proceso_ProcesoGestor);
        }

        // DELETE: api/OPE_Rel_Proceso_ProcesoGestor/5
        [ResponseType(typeof(OPE_Rel_Proceso_ProcesoGestor))]
        public IHttpActionResult DeleteOPE_Rel_Proceso_ProcesoGestor(string id, int idp)
        {
            OPE_Rel_Proceso_ProcesoGestor oPE_Rel_Proceso_ProcesoGestor = db.OPE_Rel_Proceso_ProcesoGestor.Find(id, idp);
           
            if (oPE_Rel_Proceso_ProcesoGestor == null)
            {
                return NotFound();
            }

            db.OPE_Rel_Proceso_ProcesoGestor.Remove(oPE_Rel_Proceso_ProcesoGestor);
            db.SaveChanges();

            return Ok(oPE_Rel_Proceso_ProcesoGestor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_Rel_Proceso_ProcesoGestorExists(string id)
        {
            return db.OPE_Rel_Proceso_ProcesoGestor.Count(e => e.Id_ProcesoGestor == id) > 0;
        }
    }
}