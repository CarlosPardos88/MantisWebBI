using BIDAL;
using BllTD;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Hubs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class OPE_ProgramacionPeriodicaProcesoController : ApiController
    {
        readonly BI_OPERACIONEntities db = new BI_OPERACIONEntities();
        Rel_ProgramacionPeriodica_DiaSemanaBll rel_ProgramacionPeriodica_DiaSemanaBll;

        //CAMBIO DE MEJORA 21/05/2021
        //carga la progrmacion periodica segun el proceso
        [HttpGet]
        [Route("api/OPE_ProgramacionPeriodicaProceso/GetbyId")]
        public IEnumerable<OPE_ProgramacionPeriodicaProcesoDTO> GetProgramaProceso(int id_Proceso)
        {

            var x = retornarProgramacion(id_Proceso);


            return x;
        }

        public OPE_ProgramacionPeriodicaProcesoController()
        {
            rel_ProgramacionPeriodica_DiaSemanaBll = new Rel_ProgramacionPeriodica_DiaSemanaBll();
        }

        

        // GET: api/OPE_ProgramacionPeriodicaProceso/5
        [ResponseType(typeof(OPE_ProgramacionPeriodicaProceso))]
        public IHttpActionResult GetOPE_ProgramacionPeriodicaProceso(int id)
        {
            //return Ok(oPE_ProgramacionPeriodicaProceso);
            OPE_PeriodicidadProcesoDTO ppObj = new OPE_PeriodicidadProcesoDTO();
            OPE_DiaSemanaDTO opeS = new OPE_DiaSemanaDTO();
            OPE_ProgramacionPeriodicaProcesoDTO obj = new OPE_ProgramacionPeriodicaProcesoDTO();
            List<OPE_ProgramacionPeriodicaProcesoDTO> lst = new List<OPE_ProgramacionPeriodicaProcesoDTO>();
            var oPE_ProgramacionPeriodicaProceso = (from p in db.OPE_ProgramacionPeriodicaProceso
                                                    from ds in db.OPE_DiaSemana
                                                    join pp in db.OPE_PeriodicidadProceso
                                                    on p.Id_Periodicidad equals pp.Id_Periodicidad
                                                    where p.Fecha_Eliminado == null
                                                    && p.Id_ProgramacionPeriodica == id
                                                    select p).ToList();


            foreach (var p in oPE_ProgramacionPeriodicaProceso)
            {
                obj.Cb_Activo = p.Cb_Activo;
                obj.Fecha_Creacion = p.Fecha_Creacion;
                obj.Fecha_Eliminado = p.Fecha_Eliminado;
                obj.Hora_Ejecucion = p.Hora_Ejecucion;
                obj.Id_Periodicidad = p.Id_Periodicidad;
                obj.Id_Proceso = p.Id_Proceso;
                obj.Id_ProgramacionPeriodica = p.Id_ProgramacionPeriodica;
                obj.Num_DiaMes = p.Num_DiaMes;
                obj.Num_MesPeriodo = p.Num_MesPeriodo;
                obj.Num_Semana = p.Num_Semana;
                obj.Nombre_Periodicidad = p.OPE_PeriodicidadProceso.Nombre_Periodicidad;
                lst.Add(obj);
                ppObj.Id_Periodicidad = obj.Id_Periodicidad;
                ppObj.Nombre_Periodicidad = obj.Nombre_Periodicidad;
                obj.OPE_PeriodicidadProceso.Add(ppObj);
                
            }
            if (oPE_ProgramacionPeriodicaProceso == null)
            {
                return NotFound();
            }
            var x1 = lst.GroupBy(p => p.Id_ProgramacionPeriodica)
                                              .Select(g => g.FirstOrDefault())
                                              .SingleOrDefault();
            return Ok(x1);
        }

        [HttpGet]
        // GET: api/OPE_ProgramacionPeriodicaProceso/5
        [ResponseType(typeof(OPE_ProgramacionPeriodicaProceso))]
        public IHttpActionResult GetOPE_ProgramacionPeriodicaProceso2(int idproceso)
        {
            int id = 0;
            foreach (var item in db.OPE_ProgramacionPeriodicaProceso)
            {
                if(item.Id_Proceso == idproceso)
                {
                    id = item.Id_ProgramacionPeriodica;
                    break;
                }
                else { id = 0; }            
            }
            if (id != 0)
            {
                OPE_ProgramacionPeriodicaProceso oPE_ProgramacionPeriodicaProceso = db.OPE_ProgramacionPeriodicaProceso.Find(id);
                if (oPE_ProgramacionPeriodicaProceso == null)
                {
                    return NotFound();
                }
                return Ok(oPE_ProgramacionPeriodicaProceso.Id_ProgramacionPeriodica);
            }
            else
            {
                return NotFound();
            }
            
        }

       

        // GET: api/OPE_ProgramacionPeriodicaProceso/5/nombreproceso
        [ResponseType(typeof(OPE_ProgramacionPeriodicaProceso))]
        public IHttpActionResult GetOPE_ProgramacionPeriodicaProceso2(int Id_Proceso, string Nombre_Proceso)
        {
            //OPE_DiaSemanaDTO opeS = new OPE_DiaSemanaDTO();
            //OPE_SistemaFuenteDTO opeSis = new OPE_SistemaFuenteDTO();
            //OPE_PeriodicidadProcesoDTO ppObj = new OPE_PeriodicidadProcesoDTO();
            //OPE_HorarioSistemaFuenteDTO HorarioObj = new OPE_HorarioSistemaFuenteDTO();
            //OPE_ProgramacionPeriodicaProcesoDTO obj = new OPE_ProgramacionPeriodicaProcesoDTO();
            //List<OPE_ProgramacionPeriodicaProcesoDTO> lst = new List<OPE_ProgramacionPeriodicaProcesoDTO>();
            //List<OPE_DiaSemanaDTO> lstD = new List<OPE_DiaSemanaDTO>();
            //List<OPE_PeriodicidadProcesoDTO> lstP = new List<OPE_PeriodicidadProcesoDTO>();
            int id = 0;
            foreach (var item in db.OPE_ProgramacionPeriodicaProceso)
            {
                if (item.Id_Proceso == Id_Proceso)
                {
                    id = item.Id_ProgramacionPeriodica;
                    break;
                }
                else { id = 0; }
            }
            if (id != 0)
            {
                var oPE_ProgramacionPeriodicaProceso =
                    (from p in db.Set<OPE_ProgramacionPeriodicaProceso>()
                     join pp in db.Set<OPE_Proceso>()
                     on p.Id_Proceso equals pp.Id_Proceso
                     where pp.Id_Proceso == Id_Proceso
                     where pp.Nombre_Proceso == Nombre_Proceso
                     where p.Fecha_Eliminado == null
                     select new OPE_ProgramacionPeriodicaProcesoDTO
                    {
                        Id_ProgramacionPeriodica = p.Id_ProgramacionPeriodica,
                        Id_Periodicidad = p.Id_Periodicidad,
                        Num_DiaMes = p.Num_DiaMes,
                        Num_MesPeriodo = p.Num_MesPeriodo,
                        Num_Semana = p.Num_Semana,
                        Hora_Ejecucion = p.Hora_Ejecucion,
                        Id_Proceso = p.Id_Proceso,
                        Fecha_Eliminado = p.Fecha_Eliminado,
                        Cb_Activo = p.Cb_Activo,
                       
                        Nombre_Periodicidad = p.OPE_PeriodicidadProceso.Nombre_Periodicidad
                    }).ToList();
                

               
               

                if (oPE_ProgramacionPeriodicaProceso == null)
                {
                    return Ok(new OPE_ProgramacionPeriodicaProceso());
                }

                return Ok(oPE_ProgramacionPeriodicaProceso);
            }

            else
            {
                return Ok(new OPE_ProgramacionPeriodicaProceso());
            }

            //int id = 0;
            //var oPE_ProgramacionPeriodicaProceso = retornarProgramacionId_Nombre(Id_Proceso, Nombre_Proceso);
            //foreach (var item in oPE_ProgramacionPeriodicaProceso)
            //{
            //    if (item.Id_Proceso == Id_Proceso)
            //    {
            //        id = item.Id_ProgramacionPeriodica;
            //        break;
            //    }
            //    else { id = 0; }
            //}
            //if (id != 0)
            //{
            //    if (oPE_ProgramacionPeriodicaProceso == null)
            //    {
            //        return Ok(new OPE_ProgramacionPeriodicaProceso());
            //    }

            //    return Ok(oPE_ProgramacionPeriodicaProceso);
            //}

            //else
            //{
            //    return Ok(new OPE_ProgramacionPeriodicaProceso());
            //}

        }

        // PUT: api/OPE_ProgramacionPeriodicaProceso/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOPE_ProgramacionPeriodicaProceso(int id, OPE_ProgramacionPeriodicaProceso oPE_ProgramacionPeriodicaProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oPE_ProgramacionPeriodicaProceso.Id_ProgramacionPeriodica)
            {
                return BadRequest();
            }


            var entity = db.OPE_ProgramacionPeriodicaProceso.Where(c => c.Id_ProgramacionPeriodica == oPE_ProgramacionPeriodicaProceso.Id_ProgramacionPeriodica).AsQueryable().FirstOrDefault();
            if (entity == null)
            {
                return BadRequest();
            }
            else
            {
                db.Entry(entity).CurrentValues.SetValues(oPE_ProgramacionPeriodicaProceso);
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OPE_ProgramacionPeriodicaProcesoExists(id))
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
                inactivarProgramaciones(oPE_ProgramacionPeriodicaProceso.Id_Proceso);
                if (oPE_ProgramacionPeriodicaProceso.Cb_Activo == "N")
                {
                    var proceso = db.OPE_Proceso.Where(s => s.Id_Proceso == oPE_ProgramacionPeriodicaProceso.Id_Proceso).FirstOrDefault<OPE_Proceso>();
                    var area = proceso.OPE_AreaNegocio.Nombre_AreaNegocio;
                    var procesospre = db.OPE_ProcesoPrerequisito.Where(s => s.Id_ProcesoRequerido == proceso.Id_Proceso);
                    var numpro = procesospre.Count();

                    if (numpro > 0)
                    {
                        List<string> procesos = new List<string>();
                        foreach (var item in procesospre)
                        {
                            var procesoP = db.OPE_Proceso.Where(p => p.Id_Proceso == item.Id_Proceso && p.Fecha_Eliminado == null).FirstOrDefault<OPE_Proceso>();
                            if (procesoP != null)
                            {
                                procesos.Add(procesoP.Nombre_Proceso);
                            }
                                                       
                        }

                        EmailModel envio = new EmailModel();
                        envio.area = area;
                        envio.listWf = procesos;
                        envio.process = proceso.Nombre_Proceso;
                        envio.modelMail = EmailModel.MODEL_WF_INACTIVO;

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

            return StatusCode(HttpStatusCode.NoContent);
        }

        private IEnumerable<OPE_ProgramacionPeriodicaProcesoDTO> retornarProgramacionId_Nombre(int id_Proceso, string Nombre_Proceso)
        {
            OPE_DiaSemanaDTO opeS = new OPE_DiaSemanaDTO();
            OPE_SistemaFuenteDTO opeSis = new OPE_SistemaFuenteDTO();
            OPE_PeriodicidadProcesoDTO ppObj = new OPE_PeriodicidadProcesoDTO();
            OPE_HorarioSistemaFuenteDTO HorarioObj = new OPE_HorarioSistemaFuenteDTO();
            OPE_ProgramacionPeriodicaProcesoDTO obj = new OPE_ProgramacionPeriodicaProcesoDTO();
            List<OPE_ProgramacionPeriodicaProcesoDTO> lst = new List<OPE_ProgramacionPeriodicaProcesoDTO>();
            var ProgramaPeProceso = (from p in db.OPE_ProgramacionPeriodicaProceso
                                     from ds in db.OPE_DiaSemana
                                     from peP in db.OPE_PeriodicidadProceso
                                     from HorD in db.OPE_HorarioSistemaFuente
                                     from Sf in db.OPE_SistemaFuente
                                     join pp in db.Set<OPE_Proceso>()
                                     on p.Id_Proceso equals pp.Id_Proceso
                                     where pp.Id_Proceso == id_Proceso
                                     where pp.Nombre_Proceso == Nombre_Proceso
                                     where p.Fecha_Eliminado == null
                                     select new { p, pp})
                                              //.GroupBy(p => p.p.Id_Proceso)
                                              //.Select(g => g.FirstOrDefault())
                                              .ToList(); ;

            foreach (var p in ProgramaPeProceso)
            {
                obj.Cb_Activo = p.p.Cb_Activo;
                obj.Fecha_Creacion = p.p.Fecha_Creacion;
                obj.Fecha_Eliminado = p.p.Fecha_Eliminado;
                obj.Hora_Ejecucion = p.p.Hora_Ejecucion;
                obj.Id_Periodicidad = p.p.Id_Periodicidad;
                obj.Id_Proceso = p.p.Id_Proceso;
                obj.Id_ProgramacionPeriodica = p.p.Id_ProgramacionPeriodica;
                obj.Num_DiaMes = p.p.Num_DiaMes;
                obj.Num_MesPeriodo = p.p.Num_MesPeriodo;
                obj.Num_Semana = p.p.Num_Semana;
                obj.Nombre_Periodicidad = p.p.OPE_PeriodicidadProceso.Nombre_Periodicidad;
                lst.Add(obj);
                ppObj.Id_Periodicidad = p.p.Id_Periodicidad;
                ppObj.Nombre_Periodicidad = obj.Nombre_Periodicidad;
                obj.OPE_PeriodicidadProceso.Add(ppObj);
                //se agrega los dia semana
                foreach (var pp in p.p.OPE_DiaSemana)
                {
                    opeS.Id_DiaSemana = pp.Id_DiaSemana;
                    opeS.Nombre_DiaSemana = pp.Nombre_DiaSemana;
                    obj.OPE_DiaSemana.Add(opeS);
                }
                //se agrega los sistema fuente
                foreach (var pp in p.pp.OPE_SistemaFuente)
                {
                    opeSis.Id_SistemaFuente = pp.Id_SistemaFuente;
                    opeSis.Nombre_SistemaFuente = pp.Nombre_SistemaFuente;
                    opeSis.Id_TipoSistemaFuente = pp.Id_TipoSistemaFuente;
                    obj.OPE_SistemaFuente.Add(opeSis);
                    foreach (var item in pp.OPE_HorarioSistemaFuente)
                    {
                        HorarioObj.Hora_Inicio = item.Hora_Inicio;
                        HorarioObj.Hora_Fin = item.Hora_Fin;
                        HorarioObj.Id_SistemaFuente = item.Id_SistemaFuente;
                        obj.OPE_HorarioSistemaFuente.Add(HorarioObj);
                    }
                }

            }
            
            return lst.GroupBy(p => p.OPE_PeriodicidadProceso)
                                              .Select(g => g.FirstOrDefault())
                                              .ToList(); ;
        }


        private IEnumerable<OPE_ProgramacionPeriodicaProcesoDTO> retornarProgramacion(int id_Proceso)
        {
            OPE_DiaSemanaDTO opeS = new OPE_DiaSemanaDTO();
            OPE_ProgramacionPeriodicaProcesoDTO obj = new OPE_ProgramacionPeriodicaProcesoDTO();
            List<OPE_ProgramacionPeriodicaProcesoDTO> lst = new List<OPE_ProgramacionPeriodicaProcesoDTO>();
            var ProgramaPeProceso = (from p in db.OPE_ProgramacionPeriodicaProceso
                                     from ds in db.OPE_DiaSemana
                                     join pp in db.OPE_PeriodicidadProceso
                                     on p.Id_Periodicidad equals pp.Id_Periodicidad
                                     where p.Fecha_Eliminado == null
                                     && p.Id_Proceso == id_Proceso
                                     select p).ToList();

            foreach (var p in ProgramaPeProceso)
            {
                obj.Cb_Activo = p.Cb_Activo;
                obj.Fecha_Creacion = p.Fecha_Creacion;
                obj.Fecha_Eliminado = p.Fecha_Eliminado;
                obj.Hora_Ejecucion = p.Hora_Ejecucion;
                obj.Id_Periodicidad = p.Id_Periodicidad;
                obj.Id_Proceso = p.Id_Proceso;
                obj.Id_ProgramacionPeriodica = p.Id_ProgramacionPeriodica;
                obj.Num_DiaMes = p.Num_DiaMes;
                obj.Num_MesPeriodo = p.Num_MesPeriodo;
                obj.Num_Semana = p.Num_Semana;

                lst.Add(obj);
                foreach (var pp in p.OPE_DiaSemana)
                {
                    opeS.Id_DiaSemana = pp.Id_DiaSemana;
                    opeS.Nombre_DiaSemana = pp.Nombre_DiaSemana;
                    obj.OPE_DiaSemana.Add(opeS);
                }
            }
            
            return lst;
        }

        private void inactivarProgramaciones(int idProcesoRequerido) {
            List<OPE_ProcesoPrerequisito> listProcesos = db.OPE_ProcesoPrerequisito.Where(p => p.Id_ProcesoRequerido == idProcesoRequerido ).ToList();

            if (listProcesos != null && listProcesos.Count > 0) {
                foreach (OPE_ProcesoPrerequisito procesoPrerequisito in listProcesos) {
                    List<OPE_ProgramacionPeriodicaProceso> listProgramacion = db.OPE_ProgramacionPeriodicaProceso.Where(p => p.Id_Proceso == procesoPrerequisito.Id_Proceso).ToList();
                    if (listProgramacion != null && listProgramacion.Count > 0) {
                        foreach (OPE_ProgramacionPeriodicaProceso item in listProgramacion) {
                            var entity = db.OPE_ProgramacionPeriodicaProceso.Where(c => c.Id_ProgramacionPeriodica == item.Id_ProgramacionPeriodica).AsQueryable().FirstOrDefault();
                            item.Cb_Activo = "N";
                            if (entity != null)
                            {
                                db.Entry(entity).CurrentValues.SetValues(item);
                                db.SaveChanges();
                            }
                        }
                                                
                       }
                }
            }
        }

        // POST: api/OPE_ProgramacionPeriodicaProceso
        [ResponseType(typeof(OPE_ProgramacionPeriodicaProceso))]
        public IHttpActionResult PostOPE_ProgramacionPeriodicaProceso(OPE_ProgramacionPeriodicaProceso oPE_ProgramacionPeriodicaProceso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                oPE_ProgramacionPeriodicaProceso.Fecha_Creacion = DateTime.Now;
                db.Entry(oPE_ProgramacionPeriodicaProceso.OPE_PeriodicidadProceso).State = EntityState.Modified;
            }catch(Exception)
            {
                throw;
            }


            var entity = oPE_ProgramacionPeriodicaProceso.OPE_DiaSemana;

            oPE_ProgramacionPeriodicaProceso.OPE_DiaSemana = null;

            db.OPE_ProgramacionPeriodicaProceso.Add(oPE_ProgramacionPeriodicaProceso);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OPE_ProgramacionPeriodicaProcesoExists(oPE_ProgramacionPeriodicaProceso.Id_ProgramacionPeriodica))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            if(entity.Count() > 0)
            {

                foreach (var i in entity)
                {
                    try
                    {
                        rel_ProgramacionPeriodica_DiaSemanaBll.Post_RelProDiaSemanaIds(oPE_ProgramacionPeriodicaProceso.Id_ProgramacionPeriodica, i.Id_DiaSemana);
                    }catch(Exception)
                    {
                        throw;
                    }
                }
            }

            var procesospre = db.OPE_ProcesoPrerequisito.Where(s => s.Id_Proceso == oPE_ProgramacionPeriodicaProceso.Id_Proceso);
            var numpro = procesospre.Count();

            var rutasPre = db.OPE_RutaPrerequisitoProceso.Where(s => s.Id_Proceso == oPE_ProgramacionPeriodicaProceso.Id_Proceso);
            var numRutas = rutasPre.Count();
            DateTime now = DateTime.UtcNow.Date;

            if (numRutas > 0 || numpro > 0) {

                C_ProcesoProgramado c = null;
                    List<C_ProcesoProgramado> listC = (from p in db.Set<C_ProcesoProgramado>()
                                             where p.Id_ProgramacionPeriodica == oPE_ProgramacionPeriodicaProceso.Id_ProgramacionPeriodica
                                             where p.Fecha == now
                                             select p).ToList()
          .Select(x => new C_ProcesoProgramado
          {
              Fecha = x.Fecha,
              Id_ProgramacionPeriodica = x.Id_ProgramacionPeriodica,
              Id_AprobacionProgramacionPeriodica = x.Id_AprobacionProgramacionPeriodica,
              Id_SolicitudEjecucionPorDemanda = x.Id_SolicitudEjecucionPorDemanda,
              Id_Proceso = x.Id_Proceso,
              Nombre_Proceso = x.Nombre_Proceso,
              Hora_EjecucionProgramada = x.Hora_EjecucionProgramada,
              Id_AreaNegocio = x.Id_AreaNegocio,
              Nombre_AreaNegocio = x.Nombre_AreaNegocio,
              Nombre_CarpetaWorkflows = x.Nombre_CarpetaWorkflows,
              Cb_Vencido = x.Cb_Vencido,
              Cb_ProgramacionAprobada = x.Cb_ProgramacionAprobada,
              Cb_ProcesoEjecutado = x.Cb_ProcesoEjecutado,
              FechaHora_InicioEjecucion = x.FechaHora_InicioEjecucion,
              FechaHora_FinEjecucion = x.FechaHora_FinEjecucion,
              Id_EstadoEjecucionInformatica = x.Id_EstadoEjecucionInformatica,
              Nombre_EstadoEjecucionInformatica = x.Nombre_EstadoEjecucionInformatica,
              Id_EstadoOperadorEjecucionProceso = x.Id_EstadoOperadorEjecucionProceso,
              Nombre_EstadoOperadorEjecucionProceso = x.Nombre_EstadoOperadorEjecucionProceso,
              Id_EstadoUsuarioEjecucionProceso = x.Id_EstadoUsuarioEjecucionProceso,
              Nombre_EstadoUsuarioEjecucionProceso = x.Nombre_EstadoUsuarioEjecucionProceso,
              Cb_Activo = x.Cb_Activo
          }).ToList();
                if(listC != null && listC.Count > 0) {
                    c = listC.FirstOrDefault();
                }
                    if (c != null)
                    {
                        NotificacionModel notificacion = new NotificacionModel();
                        notificacion.area = c.Nombre_AreaNegocio;
                        notificacion.idProceso = c.Id_Proceso;
                        notificacion.nombreProceso = c.Nombre_Proceso;
                        notificacion.idSolicitud = c.Id_ProgramacionPeriodica;
                        notificacion.fecha = c.Fecha;
                        notificacion.msj = "Programación programada del proceso: " + c.Nombre_Proceso + ", pendiente de aprobación";
                        notificacion.titulo = "Solicitud programada";
                        notificacion.tipo = Constantes.TIPO_NOTIFICACION_APROBAR_PROCESO_PROGRAMADO;

                        GlobalHost.ConnectionManager.GetHubContext<NotificacionHub>().Clients.All.addNotificacion(notificacion);
                    }                
                
            }

            return CreatedAtRoute("DefaultApi", new { id = oPE_ProgramacionPeriodicaProceso.Id_ProgramacionPeriodica }, oPE_ProgramacionPeriodicaProceso);
        }

        // DELETE: api/OPE_ProgramacionPeriodicaProceso/5
        [ResponseType(typeof(OPE_ProgramacionPeriodicaProceso))]
        public IHttpActionResult DeleteOPE_ProgramacionPeriodicaProceso(int id)
        {
            OPE_ProgramacionPeriodicaProceso oPE_ProgramacionPeriodicaProceso = db.OPE_ProgramacionPeriodicaProceso.Find(id);
            if (oPE_ProgramacionPeriodicaProceso == null)
            {
                return NotFound();
            }

            db.OPE_ProgramacionPeriodicaProceso.Remove(oPE_ProgramacionPeriodicaProceso);
            db.SaveChanges();

            return Ok(oPE_ProgramacionPeriodicaProceso);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OPE_ProgramacionPeriodicaProcesoExists(int id)
        {
            return db.OPE_ProgramacionPeriodicaProceso.Count(e => e.Id_ProgramacionPeriodica == id) > 0;
        }
    }
}