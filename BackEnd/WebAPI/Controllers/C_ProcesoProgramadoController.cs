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
    public class C_ProcesoProgramadoController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();
       
        // GET: api/C_ProcesoProgramado
        public IEnumerable<C_ProcesoProgramado> GetC_ProcesoProgramado(DateTime Fecha_incio, DateTime Fecha_fin)
        {
            
            IEnumerable<C_ProcesoProgramado> ProcesoProgramado =
            (from p in db.Set<C_ProcesoProgramado>()
                    where  p.Fecha >= Fecha_incio where p.Fecha <=Fecha_fin
                    where p.Cb_Activo=="S"
                    select p).ToList()
           .Select(x => new C_ProcesoProgramado
           {
               Fecha = x.Fecha,
               Id_ProgramacionPeriodica = x.Id_ProgramacionPeriodica,
               Id_AprobacionProgramacionPeriodica = x.Id_AprobacionProgramacionPeriodica,
               Id_SolicitudEjecucionPorDemanda = x.Id_SolicitudEjecucionPorDemanda,
               Id_Proceso = x.Id_Proceso,
               Nombre_Proceso = x.Nombre_Proceso,
               Hora_EjecucionProgramada= x.Hora_EjecucionProgramada,
               Id_AreaNegocio = x.Id_AreaNegocio,
               Nombre_AreaNegocio=x.Nombre_AreaNegocio,
               Nombre_CarpetaWorkflows=x.Nombre_CarpetaWorkflows,
               Cb_Vencido=x.Cb_Vencido,
               Cb_ProgramacionAprobada=x.Cb_ProgramacionAprobada,
               Cb_ProcesoEjecutado = x.Cb_ProcesoEjecutado,
               FechaHora_InicioEjecucion=x.FechaHora_InicioEjecucion,
               FechaHora_FinEjecucion=x.FechaHora_FinEjecucion,
               Id_EstadoEjecucionInformatica=x.Id_EstadoEjecucionInformatica,
               Nombre_EstadoEjecucionInformatica=x.Nombre_EstadoEjecucionInformatica,
               Id_EstadoOperadorEjecucionProceso=x.Id_EstadoOperadorEjecucionProceso,
               Nombre_EstadoOperadorEjecucionProceso=x.Nombre_EstadoOperadorEjecucionProceso,
               Id_EstadoUsuarioEjecucionProceso=x.Id_EstadoUsuarioEjecucionProceso,
               Nombre_EstadoUsuarioEjecucionProceso=x.Nombre_EstadoUsuarioEjecucionProceso,
               Cb_Activo=x.Cb_Activo
             });
            return ProcesoProgramado;
        }
        // GET: api/C_ProcesoProgramado por rol de usuario
        public IEnumerable<C_ProcesoProgramado> GetC_ProcesoProgramado(string Rol)
        {
            if (Rol == "\"Operador\"" || Rol == "\"Administrador\"")
            {
                return (from p in db.Set<C_ProcesoProgramado>()
                        where p.Id_EstadoEjecucionInformatica > 0
                        where p.Id_EstadoOperadorEjecucionProceso == null
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
             Id_ResultadoEjecucionProgramada = x.Id_ResultadoEjecucionProgramada,
             Cb_Activo = x.Cb_Activo

         });

            }
            else if (Rol == "\"Usuario\"")
            {
                return (from p in db.Set<C_ProcesoProgramado>()
                        where p.Id_EstadoEjecucionInformatica > 0
                        where p.Id_EstadoOperadorEjecucionProceso > 0
                        where p.Id_EstadoUsuarioEjecucionProceso == null
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
             Id_ResultadoEjecucionProgramada = x.Id_ResultadoEjecucionProgramada,
             Cb_Activo = x.Cb_Activo

         });
            }
            else {
                return null;
            }

          
        }

        // GET: api/C_ProcesoProgramado por rol de usuario por area
        public IEnumerable<C_ProcesoProgramado> GetC_ProcesoProgramadoByArea(string Rol, string area)
        {
            if (Rol == "\"Operador\"")
            {
                return (from p in db.Set<C_ProcesoProgramado>()
                        where p.Id_EstadoEjecucionInformatica > 0
                        where p.Id_EstadoOperadorEjecucionProceso == null
                        where p.Nombre_AreaNegocio == area.ToString()
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
             Id_ResultadoEjecucionProgramada = x.Id_ResultadoEjecucionProgramada,
             Cb_Activo = x.Cb_Activo
         });



            }
            else if (Rol == "\"Usuario\"")
            {
                return (from p in db.Set<C_ProcesoProgramado>()
                        where p.Id_EstadoEjecucionInformatica > 0
                        where p.Id_EstadoOperadorEjecucionProceso > 0
                        where p.Id_EstadoUsuarioEjecucionProceso == null
                        where p.Nombre_AreaNegocio == area.ToString()
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
             Id_ResultadoEjecucionProgramada = x.Id_ResultadoEjecucionProgramada,
             Cb_Activo = x.Cb_Activo
         });
            }
            else
            {
                return null;
            }
        }
        // GET: api/C_ProcesoProgramado por Id_resultadoejecucionprogramada
        public IEnumerable<C_ProcesoProgramado> GetC_ProcesoProgramado(int idpr)
        {

            return (from p in db.Set<C_ProcesoProgramado>()
                    where p.Id_EstadoEjecucionInformatica > 0
                    where p.Id_ResultadoEjecucionProgramada == idpr
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
               Nombre_EstadoUsuarioEjecucionProceso = x.Nombre_EstadoUsuarioEjecucionProceso


           });
        }

        // GET: api/C_ProcesoProgramado trae los procesos programados para aprobacion
        public IEnumerable<C_ProcesoProgramado> GetC_ProcesoProgramado2(DateTime Fecha_incioap, DateTime Fecha_finap)
        {
            return (from p in db.Set<C_ProcesoProgramado>()
                    where p.Fecha >= Fecha_incioap
                    where p.Fecha <= Fecha_finap
                    where p.Cb_ProcesoEjecutado == "N"
                    where p.Id_ProgramacionPeriodica > 0
                    where p.Id_AprobacionProgramacionPeriodica == 0
                    where p.Id_SolicitudEjecucionPorDemanda == 0
                    where p.Cb_Vencido == "N"
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

           });
        }

        // GET: api/C_ProcesoProgramado
        public IEnumerable<C_ProcesoProgramado> GetC_ProcesoProgramadoByArea(DateTime Fecha_incio, DateTime Fecha_fin, string area)
        {

            IEnumerable<C_ProcesoProgramado> c_ProcesoProgramado =(from p in db.Set<C_ProcesoProgramado>()
                    where p.Fecha >= Fecha_incio
                    where p.Fecha <= Fecha_fin
                    where p.Nombre_AreaNegocio == area.ToString()
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
           });

            return c_ProcesoProgramado;
        }

        // GET: api/C_ProcesoProgramado trae los procesos por demanda para aprobacion
        public IEnumerable<C_ProcesoProgramado> GetC_ProcesoProgramado3(DateTime Fecha_incioapd, DateTime Fecha_finapd)
        {
            IEnumerable<C_ProcesoProgramado> ProcesoProgramado =
                (from p in db.Set<C_ProcesoProgramado>()
                    where p.Fecha >= Fecha_incioapd
                    where p.Fecha <= Fecha_finapd
                    where p.Cb_ProcesoEjecutado == "N"
                    where p.Id_SolicitudEjecucionPorDemanda > 0
                    where p.Id_AprobacionProgramacionPeriodica == 0
                    where p.Cb_Vencido == "N"
                    where p.Cb_ProgramacionAprobada == "N"
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
           });
            return ProcesoProgramado;
        }

        // GET: api/C_ProcesoProgramado obtiene ejecuciones de procesos prerequisitos
        public IEnumerable<C_ProcesoProgramado> GetOPE_ProcesoPrerequisitoByIdProceso(int IdProceso)
        {
            DateTime today = DateTime.Today;
            IEnumerable<C_ProcesoProgramado> lista;

            List<C_ProcesoProgramado> parts = new List<C_ProcesoProgramado>();

            IEnumerable<OPE_Proceso> LProPre = (from pp in db.OPE_ProcesoPrerequisito
                                                join p in db.Set<OPE_Proceso>()
                                                on pp.Id_ProcesoRequerido equals p.Id_Proceso
                                                where pp.Id_Proceso == IdProceso
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
                                                     Fecha_Eliminado = x.Fecha_Eliminado
                                                 });
            foreach (var item in LProPre)
            {
                var propre = item.Id_Proceso;

                lista = (from p in db.Set<C_ProcesoProgramado>()
                         where p.Id_Proceso == propre
                         where p.Cb_ProcesoEjecutado == "S"
                         where p.Fecha <= today
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
                             Nombre_EstadoUsuarioEjecucionProceso = x.Nombre_EstadoUsuarioEjecucionProceso
                         });

                var lista2 = lista.GroupBy(itemeje => itemeje.Id_Proceso)
                .Select(o => o.LastOrDefault()).OrderBy(itemeje => itemeje.Fecha);

                if (lista2.Count() > 0)
                {
                    foreach (var x in lista2)
                    {
                        parts.Add(new C_ProcesoProgramado()
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
                            Nombre_EstadoUsuarioEjecucionProceso = x.Nombre_EstadoUsuarioEjecucionProceso
                        });
                    }
                }
                else
                {
                    string dateInput = "Jan 1, 1900";
                    parts.Add(new C_ProcesoProgramado()
                    {
                        Fecha = DateTime.Parse(dateInput), 
                        Id_ProgramacionPeriodica = 0,
                        Id_AprobacionProgramacionPeriodica = 0,
                        Id_SolicitudEjecucionPorDemanda = 0,
                        Id_Proceso = propre,
                        Nombre_Proceso = item.Nombre_Proceso,
                        Hora_EjecucionProgramada = TimeSpan.Parse("00:00:00"),
                        Id_AreaNegocio = 0,
                        Nombre_AreaNegocio = "",
                        Nombre_CarpetaWorkflows = "",
                        Cb_Vencido = "",
                        Cb_ProgramacionAprobada = "",
                        Cb_ProcesoEjecutado = "N",
                        FechaHora_InicioEjecucion = DateTime.Parse(dateInput),
                        FechaHora_FinEjecucion = DateTime.Parse(dateInput),
                        Id_EstadoEjecucionInformatica = 0,
                        Nombre_EstadoEjecucionInformatica = "No Ejecutado",
                        Id_EstadoOperadorEjecucionProceso = 0,
                        Nombre_EstadoOperadorEjecucionProceso = "",
                        Id_EstadoUsuarioEjecucionProceso = 0,
                        Nombre_EstadoUsuarioEjecucionProceso = ""
                    });
                }
            }

            return parts;
        }

        // PUT: api/C_ProcesoProgramado/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutC_ProcesoProgramado(int id, C_ProcesoProgramado c_ProcesoProgramado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != c_ProcesoProgramado.Id_Proceso)
            {
                return BadRequest();
            }

            db.Entry(c_ProcesoProgramado).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
                Utils.Notifitaions.startTaskNotifications();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!C_ProcesoProgramadoExists(id))
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

        // POST: api/C_ProcesoProgramado
        [ResponseType(typeof(C_ProcesoProgramado))]
        public async Task<IHttpActionResult> PostC_ProcesoProgramado(C_ProcesoProgramado c_ProcesoProgramado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.C_ProcesoProgramado.Add(c_ProcesoProgramado);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (C_ProcesoProgramadoExists(c_ProcesoProgramado.Id_Proceso))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = c_ProcesoProgramado.Id_Proceso }, c_ProcesoProgramado);
        }

        // DELETE: api/C_ProcesoProgramado/5
        [ResponseType(typeof(C_ProcesoProgramado))]
        public async Task<IHttpActionResult> DeleteC_ProcesoProgramado(int id)
        {
            C_ProcesoProgramado c_ProcesoProgramado = await db.C_ProcesoProgramado.FindAsync(id);
            if (c_ProcesoProgramado == null)
            {
                return NotFound();
            }

            db.C_ProcesoProgramado.Remove(c_ProcesoProgramado);
            await db.SaveChangesAsync();
            Utils.Notifitaions.startTaskNotifications();
            return Ok(c_ProcesoProgramado);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
            }

        private bool C_ProcesoProgramadoExists(int id)
        {
            return db.C_ProcesoProgramado.Count(e => e.Id_Proceso == id) > 0;
        }
    }
}