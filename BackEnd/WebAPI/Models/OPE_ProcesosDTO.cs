using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI.Models;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
namespace WebAPI.Models
{
    public class OPE_ProcesosDTO
    {
        public OPE_ProcesosDTO()
        {

            //this.OPE_AprobacionProgramacionPeriodicaProceso = new HashSet<OPE_AprobacionProgramacionPeriodicaProceso>();

            //this.OPE_HorarioSistemaFuente = new HashSet<OPE_HorarioSistemaFuenteDTO>();
            this.OPE_SistemaFuente = new HashSet<OPE_SistemaFuenteDTO>();

        }
        public int Id_Proceso { get; set; }

        public string Desc_Proceso { get; set; }

        public string Cb_ActualAutomaParametros { get; set; }

        public int Id_AreaNegocio { get; set; }

        public string Nombre_Proceso { get; set; }

        public string Cb_UtilizaParametros { get; set; }

        public Nullable<System.DateTime> Fecha_Eliminado { get; set; }

        public Nullable<int> Num_TiempoEstimadoEjec { get; set; }

        public string Cb_RevisionAutomaticaUsuario { get; set; }

        public string Cb_RevisionAutomaticaOperador { get; set; }

        public string Cb_PermitirSolicitudOperador { get; set; }

        //Campos Area Negocio

        public string Desc_AreaNegocio { get; set; }

        public string Nombre_AreaNegocio { get; set; }

        //Campos Programacion Perdiodica

        public int? Id_ProgramacionPeriodica { get; set; }

        public int? Id_Periodicidad { get; set; }

        public Nullable<short> Num_DiaMes { get; set; }

        public Nullable<short> Num_MesPeriodo { get; set; }

        public Nullable<short> Num_Semana { get; set; }

        public Nullable<System.TimeSpan> Hora_Ejecucion { get; set; }

        public System.DateTime? Fecha_Creacion { get; set; }

        public string Cb_Activo { get; set; }

        public string Nombre_Periodicidad { get; set; }

        public string Nombre_SistemaFuente { get; set; }


        public System.TimeSpan Hora_Inicio { get; set; }

        public System.TimeSpan Hora_Fin { get; set; }

        public int Id_SistemaFuente { get; set; }
        public int Id_TipoSistemaFuente { get; set; }

        public virtual ICollection<OPE_SistemaFuenteDTO> OPE_SistemaFuente { get; set; }
        //public virtual ICollection<OPE_HorarioSistemaFuenteDTO> OPE_HorarioSistemaFuente { get; set; }


        //public virtual DbSet<OPE_ProgramacionPeriodicaProceso> OPE_ProgramacionPeriodicaProceso { get; set; }
    }
}