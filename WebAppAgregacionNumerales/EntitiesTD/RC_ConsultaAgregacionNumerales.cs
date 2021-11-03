using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesTD
{
    public class RC_ConsultaAgregacionNumerales
    {
        public int Sk_Consulta { get; set; }
        public int  Id_Estructura { get; set; }
        public string Desc_Estructura { get; set; }
        public DateTime Fecha_Consulta { get; set; }
        public int Id_Fuente { get; set;}
        public string Desc_Fuente { get; set; }
        public DateTime Fecha_Inicial { get; set; }
        public DateTime Fecha_Final { get; set; }
        public int Id_Periodicidad { get; set; }
        public string Desc_Periodicidad { get; set; }
        public string Nombre_UsuarioCreacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }
        public int Sk_Lote { get; set; }
        public int? Sk_Lote_Upd { get; set; }
        public int Cod_Severidad { get; set; }



    }
}
