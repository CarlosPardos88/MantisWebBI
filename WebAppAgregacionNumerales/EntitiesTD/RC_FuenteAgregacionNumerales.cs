using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesTD
{
    public class RC_FuenteAgregacionNumerales
    {
        public int Id_Fuente { get; set; }
        public string Desc_Fuente { get; set; }
        public int Sk_Lote { get; set; }
        public int? Sk_Lote_Upd { get; set; }
        public int Cod_Severidad { get; set; }

    }
}
