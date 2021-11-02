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
    public class OPE_DiaSemanaController : ApiController
    {
        readonly BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        // GET: api/OPE_DiaSemana
        /*public IQueryable<OPE_DiaSemana> GetOPE_DiaSemana()
        {
            return db.OPE_DiaSemana;
        }*/
        //CAMBIO DE MEJORA 21/05/2021
        //carga los dia semana segun el proceso y el nombre
        [HttpGet]
        [Route("api/OPE_DiaSemana/GetIdProce")]
        public IEnumerable<OPE_DiaSemanaDTO> GetOPE_ProgramacionPeriodicaPr(int Id_Proceso, string Nombre_Proceso)
        {

            var oPE_ProgramacionPeriodicaProceso =
                    (from p in db.Set<OPE_ProgramacionPeriodicaProceso>()
                     join pp in db.Set<OPE_Proceso>()
                     on p.Id_Proceso equals pp.Id_Proceso
                     where pp.Id_Proceso == Id_Proceso
                     where pp.Nombre_Proceso == Nombre_Proceso
                     where p.Fecha_Eliminado == null
                     select p).ToList()
                    .Select(x => new OPE_ProgramacionPeriodicaProceso
                    {
                        Id_ProgramacionPeriodica = x.Id_ProgramacionPeriodica,
                        Id_Periodicidad = x.Id_Periodicidad,
                        Num_DiaMes = x.Num_DiaMes,
                        Num_MesPeriodo = x.Num_MesPeriodo,
                        Num_Semana = x.Num_Semana,
                        Hora_Ejecucion = x.Hora_Ejecucion,
                        Id_Proceso = x.Id_Proceso,
                        Fecha_Eliminado = x.Fecha_Eliminado,
                        Cb_Activo = x.Cb_Activo,
                        OPE_DiaSemana = x.OPE_DiaSemana,                       
                    });
            OPE_DiaSemanaDTO opeS = new OPE_DiaSemanaDTO();
            List<OPE_DiaSemanaDTO> lstD = new List<OPE_DiaSemanaDTO>();
            
            foreach (var item in oPE_ProgramacionPeriodicaProceso)
            {
                int r = item.OPE_DiaSemana.Count();
                foreach (var item1 in item.OPE_DiaSemana)
                {
                    lstD.Add(new OPE_DiaSemanaDTO { Id = item.Id_ProgramacionPeriodica, Id_DiaSemana = item1.Id_DiaSemana, Nombre_DiaSemana = item1.Nombre_DiaSemana });
                }
                
            }

            return lstD;
        }
        //CAMBIO DE MEJORA 21/05/2021
        //carga los dia semana segun la programacion periodica
        [HttpGet]
        [Route("api/OPE_DiaSemana/GetIdEdit")]
        public IEnumerable<OPE_DiaSemanaDTO> GetOPE_ProgramacionPeriodicaEdit(int Id_ProgramacionPeriodica)
        {

            var oPE_ProgramacionPeriodicaProceso =
                    (from p in db.OPE_ProgramacionPeriodicaProceso
                     from ds in db.OPE_DiaSemana
                     join pp in db.OPE_PeriodicidadProceso
                     on p.Id_Periodicidad equals pp.Id_Periodicidad
                     where p.Fecha_Eliminado == null
                     && p.Id_ProgramacionPeriodica == Id_ProgramacionPeriodica
                     select p).ToList();
            OPE_DiaSemanaDTO opeS = new OPE_DiaSemanaDTO();
            List<OPE_DiaSemanaDTO> lstD = new List<OPE_DiaSemanaDTO>();
      
            int r = 1;
            foreach (var item in oPE_ProgramacionPeriodicaProceso)
            {
                int p1 = r + 1;
                foreach (var item1 in item.OPE_DiaSemana)
                {
                    if (lstD.Where(t=> t.Id_DiaSemana == item1.Id_DiaSemana).Count() == 0)
                    {
                        lstD.Add(new OPE_DiaSemanaDTO { Id = p1, Id_DiaSemana = item1.Id_DiaSemana, Nombre_DiaSemana = item1.Nombre_DiaSemana });
                    }
                }
            }
            return lstD;
        }

        public IEnumerable<OPE_DiaSemanaDTO> GetOPE_DiaSemana()
        {
            var x1 = (from p in db.Set<OPE_DiaSemana>()
                    select p).ToList()
            .Select(x => new OPE_DiaSemanaDTO
            {
                Id_DiaSemana = x.Id_DiaSemana,
                Nombre_DiaSemana = x.Nombre_DiaSemana
            });
            return x1;
        }

        // GET: api/OPE_DiaSemana/5
        [ResponseType(typeof(OPE_DiaSemana))]
        public async Task<IHttpActionResult> GetOPE_DiaSemana(int id)
        {
            OPE_DiaSemana oPE_DiaSemana = await db.OPE_DiaSemana.FindAsync(id);
            if (oPE_DiaSemana == null)
            {
                return NotFound();
            }

            return Ok(oPE_DiaSemana);
        }

        // PUT: api/OPE_DiaSemana/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_DiaSemana(int id, OPE_DiaSemana oPE_DiaSemana)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_DiaSemana.Id_DiaSemana)
            {
                return BadRequest();
            }

            db.Entry(oPE_DiaSemana).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_DiaSemanaExists(id))
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

        // POST: api/OPE_DiaSemana
        [ResponseType(typeof(OPE_DiaSemana))]
        public async Task<IHttpActionResult> PostOPE_DiaSemana(OPE_DiaSemana oPE_DiaSemana)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(oPE_DiaSemana).State = EntityState.Modified;
            db.OPE_DiaSemana.Add(oPE_DiaSemana);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OPE_DiaSemanaExists(oPE_DiaSemana.Id_DiaSemana))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_DiaSemana.Id_DiaSemana }, oPE_DiaSemana);
        }

        // DELETE: api/OPE_DiaSemana/5
        [ResponseType(typeof(OPE_DiaSemana))]
        public async Task<IHttpActionResult> DeleteOPE_DiaSemana(int id)
        {
            OPE_DiaSemana oPE_DiaSemana = await db.OPE_DiaSemana.FindAsync(id);
            if (oPE_DiaSemana == null)
            {
                return NotFound();
            }

            db.OPE_DiaSemana.Remove(oPE_DiaSemana);
            await db.SaveChangesAsync();

            return Ok(oPE_DiaSemana);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_DiaSemanaExists(int id)
        {
            return db.OPE_DiaSemana.Count(e => e.Id_DiaSemana == id) > 0;
        }
    }
}