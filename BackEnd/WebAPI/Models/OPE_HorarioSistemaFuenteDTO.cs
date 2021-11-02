using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class OPE_HorarioSistemaFuenteDTO
    {
        public System.TimeSpan Hora_Inicio { get; set; }

        public System.TimeSpan Hora_Fin { get; set; }

        public int Id_SistemaFuente { get; set; }
    }
}