using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Hubs;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    public class OPE_ProcesoController : ApiController
    {
        readonly BI_OPERACIONEntities db = new BI_OPERACIONEntities();

        //GET: api/OPE_Proceso
        //[ResponseType(typeof(OPE_Proceso))]
        public IHttpActionResult GetOPE_Proceso(int id)
        {
            //OPE_Proceso oPE_Proceso = db.OPE_Proceso.Where(t => t.Id_Proceso == id).SingleOrDefault();

            var Proceso = (from x in db.OPE_Proceso
                           where x.Id_Proceso == id
                           select new OPE_ProcesosDTO
                           {
                               Id_Proceso = x.Id_Proceso,
                               Desc_Proceso = x.Desc_Proceso,
                               Cb_ActualAutomaParametros = x.Cb_ActualAutomaParametros,
                               Cb_UtilizaParametros = x.Cb_UtilizaParametros,
                               Id_AreaNegocio = x.Id_AreaNegocio,
                               Nombre_Proceso = x.Nombre_Proceso,
                               Num_TiempoEstimadoEjec = x.Num_TiempoEstimadoEjec,
                               Fecha_Eliminado = x.Fecha_Eliminado,
                               Cb_PermitirSolicitudOperador = x.Cb_PermitirSolicitudOperador,
                               Cb_RevisionAutomaticaOperador = x.Cb_RevisionAutomaticaOperador,
                               Cb_RevisionAutomaticaUsuario = x.Cb_RevisionAutomaticaUsuario                              
                           }).SingleOrDefault();
            if (Proceso == null)
            {
                return NotFound();
            }

            return Ok(Proceso);
        }


        //CAMBIO DE MEJORA 21/05/2021
        [HttpGet]
        [Route("api/OPE_Proceso/GetIdProceso2")]
        //GET: api/OPE_Proceso
        [ResponseType(typeof(OPE_Proceso))]
        public async Task<IHttpActionResult> GetOPE_Proceso3(int id)
        {
            OPE_SistemaFuenteDTO opeS = new OPE_SistemaFuenteDTO();
            OPE_PeriodicidadProcesoDTO ppObj = new OPE_PeriodicidadProcesoDTO();
            OPE_HorarioSistemaFuenteDTO HorarioObj = new OPE_HorarioSistemaFuenteDTO();
            OPE_ProcesosDTO obj = new OPE_ProcesosDTO();
            List<OPE_ProcesosDTO> lst = new List<OPE_ProcesosDTO>();
            var ProgramaPeProceso = (from p in db.OPE_Proceso
                                     from ds in db.OPE_SistemaFuente
                                     from peP in db.OPE_PeriodicidadProceso
                                     from HorarioS in db.OPE_HorarioSistemaFuente
                                     where p.Id_Proceso == id
                                     select p).GroupBy(p => p.Id_Proceso)
                                              .Select(g => g.FirstOrDefault())
                                              .ToList();

            foreach (var p in ProgramaPeProceso)
            {
                obj.Id_Proceso = p.Id_Proceso;
                obj.Desc_Proceso = p.Desc_Proceso;
                obj.Cb_ActualAutomaParametros = p.Cb_ActualAutomaParametros;
                obj.Id_AreaNegocio = p.Id_AreaNegocio;
                obj.Nombre_Proceso = p.Nombre_Proceso;
                obj.Cb_UtilizaParametros = p.Cb_UtilizaParametros;
                obj.Num_TiempoEstimadoEjec = p.Num_TiempoEstimadoEjec;
                obj.Cb_RevisionAutomaticaUsuario = p.Cb_RevisionAutomaticaUsuario;
                obj.Cb_RevisionAutomaticaOperador = p.Cb_RevisionAutomaticaOperador;
                obj.Cb_PermitirSolicitudOperador = p.Cb_PermitirSolicitudOperador;
                lst.Add(obj);
                //ppObj.Id_Periodicidad = p.OPE_ProgramacionPeriodicaProceso;
                //ppObj.Nombre_Periodicidad = obj.Nombre_Periodicidad;
                //obj.OPE_PeriodicidadProceso.Add(ppObj);
                //agregar sistema fuente
                foreach (var pp in p.OPE_SistemaFuente)
                {
                    obj.Id_SistemaFuente = pp.Id_SistemaFuente;
                    obj.Nombre_SistemaFuente = pp.Nombre_SistemaFuente;
                    obj.Id_TipoSistemaFuente = pp.Id_TipoSistemaFuente;
                    //obj.OPE_SistemaFuente.Add(opeSis);
                    foreach (var item in pp.OPE_HorarioSistemaFuente)
                    {
                        obj.Hora_Inicio = item.Hora_Inicio;
                        obj.Hora_Fin = item.Hora_Fin;
                        obj.Id_SistemaFuente = item.Id_SistemaFuente;
                        //obj.OPE_HorarioSistemaFuente.Add(HorarioObj);
                    }
                }
                lst.Add(obj);
                foreach (var pp in p.OPE_SistemaFuente)
                {
                    opeS.Id_SistemaFuente = pp.Id_SistemaFuente;
                    opeS.Nombre_SistemaFuente = pp.Nombre_SistemaFuente;
                    opeS.Id_TipoSistemaFuente = pp.Id_TipoSistemaFuente;
                    obj.OPE_SistemaFuente.Add(opeS);

                    foreach (var item in pp.OPE_HorarioSistemaFuente)
                    {
                        HorarioObj.Hora_Inicio = item.Hora_Inicio;
                        HorarioObj.Hora_Fin = item.Hora_Fin;
                        HorarioObj.Id_SistemaFuente = item.Id_SistemaFuente;
                        opeS.OPE_HorarioSistemaFuente.Add(HorarioObj);
                    }
                }
            }

            //var x = lst.Where(t => t.Id_Proceso == id).SingleOrDefault();
            if (lst == null)
            {
                return NotFound();
            }

            return Ok(lst.GroupBy(p => p.Id_Proceso)
                                              .Select(g => g.FirstOrDefault())
                                              .SingleOrDefault());
        }
        //CAMBIO DE MEJORA 21/05/2021
        //Carga de datos en vista en solicitud demanda
        [HttpGet]
        [Route("api/OPE_Proceso/SolicitudDemanda")]
        public IEnumerable<OPE_ProcesosDTO> GetOPE_ProcesoDemanda()
        {
            
            DateTime? value = null;
            var proceso = (from p in db.OPE_Proceso
                           join AreaNegocio in db.OPE_AreaNegocio
                           on p.Id_AreaNegocio equals AreaNegocio.Id_AreaNegocio
                           where p.Fecha_Eliminado == null
                           select new OPE_ProcesosDTO
                           {
                               Id_Proceso = p.Id_Proceso,
                               Desc_Proceso = p.Desc_Proceso,
                               Cb_ActualAutomaParametros = p.Cb_ActualAutomaParametros,
                               Cb_UtilizaParametros = p.Cb_UtilizaParametros,
                               Id_AreaNegocio = p.Id_AreaNegocio,
                               Nombre_Proceso = p.Nombre_Proceso,
                               Num_TiempoEstimadoEjec = p.Num_TiempoEstimadoEjec,
                               Cb_PermitirSolicitudOperador = p.Cb_PermitirSolicitudOperador,
                               Cb_RevisionAutomaticaOperador = p.Cb_RevisionAutomaticaOperador,
                               Cb_RevisionAutomaticaUsuario = p.Cb_RevisionAutomaticaUsuario,
                               Fecha_Eliminado = p.Fecha_Eliminado,
                               //Area Negocio
                               Nombre_AreaNegocio = AreaNegocio.Nombre_AreaNegocio
                              
                           }).ToList();
            return proceso.OrderBy(t=> t.Nombre_AreaNegocio);

        }

        //CAMBIO DE MEJORA 21/05/2021
        //Cargue tabla de la vista procesos
        [HttpGet]
        [Route("api/OPE_Proceso/GetAllProceso")]
        public IEnumerable<OPE_ProcesosDTO> GetProceso()
        {
            var proceso = (from p in db.OPE_Proceso                           
                           from p1 in db.OPE_ProgramacionPeriodicaProceso.Where(x => x.Id_Proceso == p.Id_Proceso).DefaultIfEmpty()
                                                .Where(x => x.Cb_Activo.Equals("S")).ToList().DefaultIfEmpty()
                           from p2 in db.OPE_ProgramacionPeriodicaProceso.Where(y => y.Id_Proceso== p.Id_Proceso).DefaultIfEmpty()
                           .GroupBy(p2 => p2.Id_Proceso).Select(g => g.FirstOrDefault()) //por si acaso
                               //.Where(x => x.Fecha_Eliminado == null).DefaultIfEmpty()//validacion de nulos

                          
                           //join ProgramP in db.OPE_ProgramacionPeriodicaProceso
                           //on p.Id_Proceso equals ProgramP.Id_Proceso
                           //into Ope_Program
                           //from p1 in Ope_Program.DefaultIfEmpty()
                           where p.Fecha_Eliminado == null 
                           select new OPE_ProcesosDTO
                           {
                               Id_Proceso = p.Id_Proceso,
                               Desc_Proceso = p.Desc_Proceso,
                               Cb_ActualAutomaParametros = p.Cb_ActualAutomaParametros,
                               Cb_UtilizaParametros = p.Cb_UtilizaParametros,
                               Id_AreaNegocio = p.Id_AreaNegocio,
                               Nombre_Proceso = p.Nombre_Proceso,
                               Num_TiempoEstimadoEjec = p.Num_TiempoEstimadoEjec,
                               Cb_PermitirSolicitudOperador = p.Cb_PermitirSolicitudOperador,
                               Cb_RevisionAutomaticaOperador = p.Cb_RevisionAutomaticaOperador,
                               Cb_RevisionAutomaticaUsuario = p.Cb_RevisionAutomaticaUsuario,
                               Fecha_Eliminado = p.Fecha_Eliminado,
                               //Area Negocio
                               Nombre_AreaNegocio = p.OPE_AreaNegocio.Nombre_AreaNegocio,
                               //OPE_Programacion PeriodicaProceso
                               //
                               Cb_Activo =
                                (
                                     p2.Cb_Activo == null ? "S" :p1.Cb_Activo
                                     )
                           }).GroupBy(p => p.Id_Proceso)
                              .Select(g => g.FirstOrDefault())
                              .ToList();
            return proceso.OrderBy(item => item.Nombre_Proceso);

        }
   
        //[HttpGet]
        //[Route("api/OPE_Proceso/Getall")]
        public IEnumerable<OPE_Proceso> GetOPE_Proceso()
        {

            var procesos = (from p in db.Set<OPE_Proceso>()
                            where p.Fecha_Eliminado == null
                            select p).ToList()
           .Select(x => new OPE_Proceso
           {
               Id_Proceso = x.Id_Proceso,
               Desc_Proceso = x.Desc_Proceso,
               Cb_ActualAutomaParametros = x.Cb_ActualAutomaParametros,
               Cb_UtilizaParametros = x.Cb_UtilizaParametros,
               Id_AreaNegocio = x.Id_AreaNegocio,
               Nombre_Proceso = x.Nombre_Proceso,
               Num_TiempoEstimadoEjec = x.Num_TiempoEstimadoEjec,
               Fecha_Eliminado = x.Fecha_Eliminado,
               //OPE_AreaNegocio = x.OPE_AreaNegocio,
               //Cb_PermitirSolicitudOperador = x.Cb_PermitirSolicitudOperador,
               //Cb_RevisionAutomaticaOperador = x.Cb_RevisionAutomaticaOperador,
               //Cb_RevisionAutomaticaUsuario = x.Cb_RevisionAutomaticaUsuario,
               //OPE_SistemaFuente = x.OPE_SistemaFuente,
               //OPE_ProgramacionPeriodicaProceso = x.OPE_ProgramacionPeriodicaProceso
               //                                 .Where(p => p.Id_Proceso == x.Id_Proceso && p.Cb_Activo != "S")
               //                                 .OrderByDescending(u => u.Id_ProgramacionPeriodica)

                                             //   .ToList(),
           });

            return procesos.OrderBy(item => item.Nombre_Proceso);
        }

        // GET: api/OPE_Proceso/5/1
        [ResponseType(typeof(OPE_Proceso))]
        public async Task<IHttpActionResult> GetOPE_ProcesoSistemaFuente(int id_proceso, int id_sistemafuente)
        {
            OPE_Proceso oPE_Proceso = await db.OPE_Proceso.FindAsync(id_proceso);
            if (oPE_Proceso == null)
            {
                return NotFound();
            }

            if (oPE_Proceso.Fecha_Eliminado == null)
            {
                var c = 0;
                foreach(var i in oPE_Proceso.OPE_SistemaFuente)
                {
                    if(i.Id_SistemaFuente == id_sistemafuente)
                    {
                        c++;
                    }
                }

                if(c > 0)
                {
                    return Ok(oPE_Proceso);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }
        }

        // GET: api/OPE_Proceso/5/nombreproceso
        public IEnumerable<OPE_Proceso> GetOPE_ProcesoByName(int Id_Proceso, string Nombre_Proceso)
        {
            return (from p in db.Set<OPE_Proceso>()
                    where p.Id_Proceso == Id_Proceso
                    where p.Nombre_Proceso == Nombre_Proceso
                    where p.Fecha_Eliminado == null
                    select p).ToList()
           .Select(x => new OPE_Proceso
           {
               Id_Proceso = x.Id_Proceso,
               Desc_Proceso = x.Desc_Proceso,
               Cb_ActualAutomaParametros = x.Cb_ActualAutomaParametros,
               Cb_UtilizaParametros = x.Cb_UtilizaParametros,
               Id_AreaNegocio = x.Id_AreaNegocio,
               Nombre_Proceso = x.Nombre_Proceso,
               Num_TiempoEstimadoEjec = x.Num_TiempoEstimadoEjec,
               Fecha_Eliminado = x.Fecha_Eliminado,
               Cb_PermitirSolicitudOperador = x.Cb_PermitirSolicitudOperador,
               Cb_RevisionAutomaticaOperador = x.Cb_RevisionAutomaticaOperador,
               Cb_RevisionAutomaticaUsuario = x.Cb_RevisionAutomaticaUsuario,
               OPE_AreaNegocio = x.OPE_AreaNegocio,
               OPE_ProcesoPrerequisito = x.OPE_ProcesoPrerequisito,
               OPE_ProgramacionPeriodicaProceso = x.OPE_ProgramacionPeriodicaProceso,
               OPE_Rel_Proceso_ProcesoGestor = x.OPE_Rel_Proceso_ProcesoGestor,
               OPE_RutaPrerequisitoProceso = x.OPE_RutaPrerequisitoProceso,
               OPE_SistemaFuente = x.OPE_SistemaFuente
           });
        }

        //Se cambia el parametro OPE_Proceso por la clase 
        //espejo OPE_ProcesoDTO
        //Fecha 25/05/2021
        // PUT: api/OPE_Proceso/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOPE_Proceso(int id, OPE_ProcesosDTO oPE_Proceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_Proceso.Id_Proceso)
            {
                return BadRequest();
            }
                    OPE_Proceso local = db.OPE_Proceso.Where(f => f.Id_Proceso == oPE_Proceso.Id_Proceso).AsQueryable().FirstOrDefault();
                    local.Fecha_Eliminado = oPE_Proceso.Fecha_Eliminado;
            local.Id_AreaNegocio = oPE_Proceso.Id_AreaNegocio;
            local.Nombre_Proceso = oPE_Proceso.Nombre_Proceso;
            local.Num_TiempoEstimadoEjec = oPE_Proceso.Num_TiempoEstimadoEjec;
            local.Cb_ActualAutomaParametros = oPE_Proceso.Cb_ActualAutomaParametros;
            local.Cb_PermitirSolicitudOperador = oPE_Proceso.Cb_PermitirSolicitudOperador;
            local.Cb_RevisionAutomaticaOperador = oPE_Proceso.Cb_RevisionAutomaticaOperador;
            local.Cb_RevisionAutomaticaUsuario = oPE_Proceso.Cb_RevisionAutomaticaUsuario;
            local.Cb_UtilizaParametros = oPE_Proceso.Cb_UtilizaParametros;
            local.Desc_Proceso = oPE_Proceso.Desc_Proceso;
            

                    if (local != null)
                    {
                        db.Entry(local).State = EntityState.Modified;
                    }
            
            try
            {
               
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException )
            {
                if (!OPE_ProcesoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            finally
            {
                if (oPE_Proceso.Fecha_Eliminado != null)
                {
                    //Se cambiar por el campo mapeado Nombre_AreaNegocio
                    var area = oPE_Proceso.Nombre_AreaNegocio;
                    var procesospre = db.OPE_ProcesoPrerequisito.Where(s => s.Id_ProcesoRequerido == oPE_Proceso.Id_Proceso);
                    var numpro = procesospre.Count();

                    if (numpro > 0)
                    {
                        List<string> procesos = new List<string>();
                        foreach(var item in procesospre)
                        {
                            var procesoP = db.OPE_Proceso.Where(p => p.Id_Proceso == item.Id_Proceso && p.Fecha_Eliminado == null).FirstOrDefault<OPE_Proceso>();
                            if(procesoP != null)
                            procesos.Add(procesoP.Nombre_Proceso);
                            
                        }

                        if (procesos.Count > 0) {
                            EmailModel envio = new EmailModel();
                            envio.area = area;
                            envio.listWf = procesos;
                            envio.process = oPE_Proceso.Nombre_Proceso;
                            envio.modelMail = EmailModel.MODEL_WF_ELIMINADO;

                            try
                            {                                
                                _ = Task.Run(() => new Utils.Email().SendEmail(envio));
                                Utils.Notifitaions.startTaskNotifications();
                            }
                            catch (SmtpException)
                            {
                                throw;
                            }
                        }
                        
                    }
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/OPE_Proceso
        [ResponseType(typeof(OPE_Proceso))]
        public async Task<IHttpActionResult> PostOPE_Proceso(OPE_Proceso oPE_Proceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
             foreach (var item in oPE_Proceso.OPE_SistemaFuente)
             {
                 db.Entry(item).State = EntityState.Modified;
               
             }
            /*foreach (var item2 in oPE_Proceso.OPE_ProgramacionPeriodicaProceso)
            {
                foreach (var item3 in item2.OPE_DiaSemana)
                {
                    db.Entry(item3).State = EntityState.Modified;
                }
                    db.Entry(item2.OPE_PeriodicidadProceso).State = EntityState.Modified;
            }*/

            db.OPE_Proceso.Add(oPE_Proceso);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = oPE_Proceso.Id_Proceso }, oPE_Proceso);
        }

        // DELETE: api/OPE_Proceso/5
        [ResponseType(typeof(OPE_Proceso))]
        public async Task<IHttpActionResult> DeleteOPE_Proceso(int id)
        {
            OPE_Proceso oPE_Proceso = await db.OPE_Proceso.FindAsync(id);
            if (oPE_Proceso == null)
            {
                return NotFound();
            }

            db.OPE_Proceso.Remove(oPE_Proceso);
            await db.SaveChangesAsync();

            return Ok(oPE_Proceso);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_ProcesoExists(int id)
        {
            return db.OPE_Proceso.Count(e => e.Id_Proceso == id) > 0;
        }



    }
}