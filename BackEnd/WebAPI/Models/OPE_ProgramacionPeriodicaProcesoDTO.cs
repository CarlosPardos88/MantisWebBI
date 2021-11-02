using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class OPE_ProgramacionPeriodicaProcesoDTO
    {

        public OPE_ProgramacionPeriodicaProcesoDTO()
        {

            //this.OPE_AprobacionProgramacionPeriodicaProceso = new HashSet<OPE_AprobacionProgramacionPeriodicaProceso>();

            this.OPE_DiaSemana = new HashSet<OPE_DiaSemanaDTO>();
            this.OPE_PeriodicidadProceso = new HashSet<OPE_PeriodicidadProcesoDTO>();
            this.OPE_SistemaFuente = new HashSet<OPE_SistemaFuenteDTO>();
            this.OPE_HorarioSistemaFuente = new HashSet<OPE_HorarioSistemaFuenteDTO>();
        }

        public int Id_ProgramacionPeriodica { get; set; }
        public int Id_TipoSistemaFuente { get; set; }

        public int Id_Periodicidad { get; set; }

        public Nullable<short> Num_DiaMes { get; set; }

        public Nullable<short> Num_MesPeriodo { get; set; }

        public Nullable<short> Num_Semana { get; set; }

        public Nullable<System.TimeSpan> Hora_Ejecucion { get; set; }

        public int Id_Proceso { get; set; }

        public Nullable<System.DateTime> Fecha_Eliminado { get; set; }

        public System.DateTime Fecha_Creacion { get; set; }

        public string Cb_Activo { get; set; }

        public string Nombre_Periodicidad { get; set; }
    
        public string Nombre_SistemaFuente { get; set; }
        

        public System.TimeSpan Hora_Inicio { get; set; }

        public System.TimeSpan Hora_Fin { get; set; }

        public int Id_SistemaFuente { get; set; }

      

        public virtual ICollection<OPE_DiaSemanaDTO> OPE_DiaSemana { get; set; }
        public virtual ICollection<OPE_PeriodicidadProcesoDTO> OPE_PeriodicidadProceso { get; set; }

        public virtual ICollection<OPE_SistemaFuenteDTO> OPE_SistemaFuente { get; set; }
        public virtual ICollection<OPE_HorarioSistemaFuenteDTO> OPE_HorarioSistemaFuente { get; set; }


    }
}