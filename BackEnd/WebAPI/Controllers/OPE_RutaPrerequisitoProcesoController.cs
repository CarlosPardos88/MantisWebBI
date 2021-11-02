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
    public class OPE_RutaPrerequisitoProcesoController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_RutaPrerequisitoProceso
        public IEnumerable<OPE_RutaPrerequisitoProceso> GetOPE_RutaPrerequisitoProceso()
        {
            return (from p in db.Set<OPE_RutaPrerequisitoProceso>()
                    select p).ToList()
            .Select(x => new OPE_RutaPrerequisitoProceso   
            {
                Desc_RutaArchivo = x.Desc_RutaArchivo,
                Id_Proceso = x.Id_Proceso,
                Id_RutaPrerequisito = x.Id_RutaPrerequisito
            });

            // return db.OPE_AreaNegocio;
        }
        [HttpGet]
        

        // GET: api/OPE_RutaPrerequisitoProceso/5
        [ResponseType(typeof(OPE_RutaPrerequisitoProceso))]
        public async Task<IHttpActionResult> GetOPE_RutaPrerequisitoProceso1(int id)
        {
            OPE_RutaPrerequisitoProceso oPE_RutaPrerequisitoProceso = await db.OPE_RutaPrerequisitoProceso.FindAsync(id);
            if (oPE_RutaPrerequisitoProceso == null)
            {
                return NotFound();
            }

            return Ok(oPE_RutaPrerequisitoProceso);
        }

        // GET: api/OPE_Proceso
        public IEnumerable<OPE_RutaPrerequisitoProceso> GetOPE_RutaPrerequisitoProcesoByProceso(int Id_Proceso)
        {
            return (from p in db.Set<OPE_RutaPrerequisitoProceso>()
                    where p.Id_Proceso == Id_Proceso
                    select p).ToList()
           .Select(x => new OPE_RutaPrerequisitoProceso
           {
               Id_Proceso = x.Id_Proceso,
               Id_RutaPrerequisito = x.Id_RutaPrerequisito,
               Desc_RutaArchivo = x.Desc_RutaArchivo
           });
        }

        // PUT: api/OPE_RutaPrerequisitoProceso/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_RutaPrerequisitoProceso(int id, OPE_RutaPrerequisitoProceso oPE_RutaPrerequisitoProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_RutaPrerequisitoProceso.Id_RutaPrerequisito)
            {
                return BadRequest();
            }

            db.Entry(oPE_RutaPrerequisitoProceso).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_RutaPrerequisitoProcesoExists(id))
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

        // POST: api/OPE_RutaPrerequisitoProceso
        [ResponseType(typeof(OPE_RutaPrerequisitoProceso))]
        public async Task<IHttpActionResult> PostOPE_RutaPrerequisitoProceso(OPE_RutaPrerequisitoProceso oPE_RutaPrerequisitoProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OPE_RutaPrerequisitoProceso.Add(oPE_RutaPrerequisitoProceso);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = oPE_RutaPrerequisitoProceso.Id_RutaPrerequisito }, oPE_RutaPrerequisitoProceso);
        }

        // DELETE: api/OPE_RutaPrerequisitoProceso/5
        [ResponseType(typeof(OPE_RutaPrerequisitoProceso))]
        public async Task<IHttpActionResult> DeleteOPE_RutaPrerequisitoProceso(int id)
        {
            OPE_RutaPrerequisitoProceso oPE_RutaPrerequisitoProceso = await db.OPE_RutaPrerequisitoProceso.FindAsync(id);
            if (oPE_RutaPrerequisitoProceso == null)
            {
                return NotFound();
            }

            db.OPE_RutaPrerequisitoProceso.Remove(oPE_RutaPrerequisitoProceso);
            await db.SaveChangesAsync();

            return Ok(oPE_RutaPrerequisitoProceso);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_RutaPrerequisitoProcesoExists(int id)
        {
            return db.OPE_RutaPrerequisitoProceso.Count(e => e.Id_RutaPrerequisito == id) > 0;
        }
    }
}