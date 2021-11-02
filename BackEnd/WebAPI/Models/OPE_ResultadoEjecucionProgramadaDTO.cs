using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class OPE_ResultadoEjecucionProgramadaDTO
    {
        public Nullable<System.DateTime> FechaHora_InicioEjecucion { get; set; }

        public Nullable<System.DateTime> FechaHora_FinEjecucion { get; set; }

        public int Id_ResultadoEjecucionProgramada { get; set; }

        public Nullable<int> Id_SolicitudEjecucionPorDemanda { get; set; }

        public Nullable<int> Id_AprobacionProgramacionPeriodica { get; set; }

        public Nullable<System.DateTime> FechaHora_RevisionOperador { get; set; }

        public Nullable<System.DateTime> FechaHora_RevisionUsuario { get; set; }

        public Nullable<int> Id_EstadoOperadorEjecucionProceso { get; set; }

        public Nullable<int> Id_EstadoUsuarioEjecucionProceso { get; set; }

        public int Id_EstadoEjecucionInformatica { get; set; }

        public string Nombre_UsuarioRevisor { get; set; }

        public string Nombre_OperadorRevisor { get; set; }

        public string Nombre_RolUsuarioRevisor { get; set; }

        public string Nombre_RolOperadorRevisor { get; set; }

        public int Id_Proceso { get; set; }

        public Nullable<int> Id_ProgramacionPeriodica { get; set; }
    }
}