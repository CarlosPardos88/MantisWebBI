using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class NotificacionModel
    {
      public  string titulo { get; set; }
        public string msj { get; set; }
        public int tipo { get; set; }
        public string area { get; set; }

        public string nombreProceso { get; set; }
        public int idProceso { get; set; }
        public int idSolicitud { get; set; }
        public DateTime fecha { get; set; }

        public string hora { get; set; }
            
    }
}