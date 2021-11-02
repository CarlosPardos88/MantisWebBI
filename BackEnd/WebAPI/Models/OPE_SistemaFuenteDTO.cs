using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class OPE_SistemaFuenteDTO
    {
        public OPE_SistemaFuenteDTO()
        {

            //this.OPE_AprobacionProgramacionPeriodicaProceso = new HashSet<OPE_AprobacionProgramacionPeriodicaProceso>();

            this.OPE_HorarioSistemaFuente = new HashSet<OPE_HorarioSistemaFuenteDTO>();
            
        }
        public int Id_SistemaFuente { get; set; }

        public string Nombre_SistemaFuente { get; set; }

        public int Id_TipoSistemaFuente { get; set; }

        public int Id_Proceso { get; set; }
        public string Nombre_TipoSistemaFuente { get; set; }
        public System.TimeSpan Hora_Inicio { get; set; }

        public System.TimeSpan Hora_Fin { get; set; }

        public virtual ICollection<OPE_HorarioSistemaFuenteDTO> OPE_HorarioSistemaFuente { get; set; }


    }
}