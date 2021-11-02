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
    public class OPE_AreaNegocioController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_AreaNegocio
        public IEnumerable <OPE_AreaNegocio> GetOPE_AreaNegocio()
        {
            return (from p in db.Set<OPE_AreaNegocio>()
                    select p).ToList()
            .Select(x => new OPE_AreaNegocio
            {
                Id_AreaNegocio = x.Id_AreaNegocio,
                Desc_AreaNegocio = x.Desc_AreaNegocio,
                Nombre_AreaNegocio = x.Nombre_AreaNegocio,
                Nombre_CarpetaWorkflows = x.Nombre_CarpetaWorkflows,
                Num_InicioRangoCodProceso = x.Num_InicioRangoCodProceso,
                Num_FinRangoCodProceso = x.Num_FinRangoCodProceso
            });
           
           // return db.OPE_AreaNegocio;
        }

        // GET: api/OPE_AreaNegocio/5
        [ResponseType(typeof(OPE_AreaNegocio))]
        public async Task<IHttpActionResult> GetOPE_AreaNegocio(int id)
        {
            OPE_AreaNegocio oPE_AreaNegocio = await db.OPE_AreaNegocio.FindAsync(id);
            if (oPE_AreaNegocio == null)
            {
                return NotFound();
            }

            return Ok(oPE_AreaNegocio);
        }

        // PUT: api/OPE_AreaNegocio/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_AreaNegocio(int id, OPE_AreaNegocio oPE_AreaNegocio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_AreaNegocio.Id_AreaNegocio)
            {
                return BadRequest();
            }

            db.Entry(oPE_AreaNegocio).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_AreaNegocioExists(id))
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

        // POST: api/OPE_AreaNegocio
        [ResponseType(typeof(OPE_AreaNegocio))]
        public async Task<IHttpActionResult> PostOPE_AreaNegocio(OPE_AreaNegocio oPE_AreaNegocio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!OPE_AreaNegocioExistsByName(oPE_AreaNegocio.Nombre_AreaNegocio))
            {
                db.OPE_AreaNegocio.Add(oPE_AreaNegocio);
                await db.SaveChangesAsync();
                return CreatedAtRoute("DefaultApi", new { id = oPE_AreaNegocio.Id_AreaNegocio }, oPE_AreaNegocio);
            }
            else
            {
                var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(string.Format("Área de negocio ya existe = {0}", oPE_AreaNegocio.Nombre_AreaNegocio)),
                    ReasonPhrase = "Área de Negocio ya existe con ese nombre"
                };
                throw new HttpResponseException(resp);
            }
        }

        // DELETE: api/OPE_AreaNegocio/5
        [ResponseType(typeof(OPE_AreaNegocio))]
        public async Task<IHttpActionResult> DeleteOPE_AreaNegocio(int id)
        {
            OPE_AreaNegocio oPE_AreaNegocio = await db.OPE_AreaNegocio.FindAsync(id);
            if (oPE_AreaNegocio == null)
            {
                return NotFound();
            }

            db.OPE_AreaNegocio.Remove(oPE_AreaNegocio);
            await db.SaveChangesAsync();

            return Ok(oPE_AreaNegocio);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_AreaNegocioExists(int id)
        {
            return db.OPE_AreaNegocio.Count(e => e.Id_AreaNegocio == id) > 0;
        }

        private bool OPE_AreaNegocioExistsByName(String nombre)
        {
            return db.OPE_AreaNegocio.Count(e => e.Nombre_AreaNegocio == nombre) > 0;
        }
    }
}