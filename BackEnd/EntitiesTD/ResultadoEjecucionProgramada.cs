using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesTD
{
    public partial class ResultadoEjecucionProgramada
    {
        public string Id_ResultadoEjecucionProgramada { get; set; }
        public string Id_ProgramacionPeriodica { get; set; }

        public string Id_AprobacionProgramacionPeriodica { get; set; }

        public string Id_SolicitudEjecucionPorDemanda { get; set; }

        public string Id_Proceso { get; set; }

        public string Nombre_Proceso { get; set; }

        public string Hora_EjecucionProgramada { get; set; }

        public string Id_AreaNegocio { get; set; }

        public string Nombre_AreaNegocio { get; set; }

        public string Nombre_CarpetaWorkflows { get; set; }

        public string FechaHora_InicioEjecucion { get; set; }

        public string FechaHora_FinEjecucion { get; set; }

        public string Id_EstadoEjecucionInformatica { get; set; }

        public string Nombre_EstadoEjecucionInformatica { get; set; }

        public string Id_EstadoOperadorEjecucionProceso { get; set; }

        public string Nombre_EstadoOperadorEjecucionProceso { get; set; }

        public string Id_EstadoUsuarioEjecucionProceso { get; set; }

        public string Nombre_EstadoUsuarioEjecucionProceso { get; set; }

        public string Cb_ProcesoEjecutado { get; set; }

        public string Cb_Vencido { get; set; }



    }
}
