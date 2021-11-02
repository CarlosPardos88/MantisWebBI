using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class EmailModel
    {
        public const int MODEL_WF_INACTIVO =1;
        public const int MODEL_WF_ELIMINADO = 2;
        public const int MODEL_WF_PENDIENTE_CERTIFICAR = 3;
        public const int MODEL_WF_PENDIENTE_CERTIFICAR_USUARIO = 4;
        public const int MODEL_SOLICITUD_POR_DEMANDA = 5;
        public const int MODEL_WF_PENDIENTE_APROBAR_40_MIN = 6;
        public const int MODEL_WF_INACTIVO_FUENTE = 7;

        public List<string> listWf { get; set; }
        public string area { get; set; }
        public int modelMail { get; set; }
        public string process { get; set; }
        
        public string hora { get; set; }

        public string estado { get; set; }

        public string fuente { get; set; }
    }
}