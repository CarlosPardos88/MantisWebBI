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
    public class OPE_ProcesoPrerequisitoController : ApiController
    {
        readonly BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_ProcesoPrerequisito

        public IEnumerable<OPE_ProcesoPrerequisitoDTO> GetProcesoPrerequisito()
        {
            var ProcesoP = (from p in db.OPE_ProcesoPrerequisito
                            select new OPE_ProcesoPrerequisitoDTO
                            {
                                Id_Proceso = p.Id_Proceso,
                                Id_ProcesoPrerequisito = p.Id_ProcesoPrerequisito,
                                Id_ProcesoRequerido = p.Id_ProcesoRequerido
                            }).ToList();
            return ProcesoP;
        }


       
        // GET: api/OPE_ProcesoPrerequisito/5
        [ResponseType(typeof(OPE_ProcesoPrerequisito))]
        public IHttpActionResult GetOPE_ProcesoPrerequisito(int id)
        {
            OPE_ProcesoPrerequisito oPE_ProcesoPrerequisito = db.OPE_ProcesoPrerequisito.Find(id);
            if (oPE_ProcesoPrerequisito == null)
            {
                return NotFound();
            }

            return Ok(oPE_ProcesoPrerequisito);
        }

        // PUT: api/OPE_ProcesoPrerequisito/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOPE_ProcesoPrerequisito(int id, OPE_ProcesoPrerequisito oPE_ProcesoPrerequisito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_ProcesoPrerequisito.Id_ProcesoPrerequisito)
            {
                return BadRequest();
            }

            db.Entry(oPE_ProcesoPrerequisito).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_ProcesoPrerequisitoExists(id))
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

        // POST: api/OPE_ProcesoPrerequisito
        [ResponseType(typeof(OPE_ProcesoPrerequisito))]
        public IHttpActionResult PostOPE_ProcesoPrerequisito(OPE_ProcesoPrerequisito oPE_ProcesoPrerequisito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OPE_ProcesoPrerequisito.Add(oPE_ProcesoPrerequisito);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OPE_ProcesoPrerequisitoExists(oPE_ProcesoPrerequisito.Id_ProcesoPrerequisito))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_ProcesoPrerequisito.Id_ProcesoPrerequisito }, oPE_ProcesoPrerequisito);
        }

        // DELETE: api/OPE_ProcesoPrerequisito/5
        [ResponseType(typeof(OPE_ProcesoPrerequisito))]
        public async Task<IHttpActionResult> DeleteOPE_ProcesoPrerequisito(int id)
        {
            OPE_ProcesoPrerequisito oPE_ProcesoPrerequisito = await db.OPE_ProcesoPrerequisito.FindAsync(id);
            if (oPE_ProcesoPrerequisito == null)
            {
                return NotFound();
            }
            try
            {
                db.OPE_ProcesoPrerequisito.Remove(oPE_ProcesoPrerequisito);
                await db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(string.Format("Error = {0}", e)),
                    ReasonPhrase = "Error Eliminando relación"+e
                };
                throw new HttpResponseException(resp);
            }
            return Ok(oPE_ProcesoPrerequisito);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_ProcesoPrerequisitoExists(int id)
        {
            return db.OPE_ProcesoPrerequisito.Count(e => e.Id_ProcesoPrerequisito == id) > 0;
        }
    }
}