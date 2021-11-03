using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesTD
{
    public class RC_ResultadoAgregacionNumerales
    {
        public int Sk_Consulta { get; set; }
        public int Id_Estructura { get; set; }
        public DateTime Fecha_Consulta { get; set; }
        public string Fecha_DeclaracionInicial { get; set; }
        public int Sk_NodoContable { get; set; }
        public int Id_NodoContable { get; set; }
        public string Desc_NodoContable { get; set; }
        public decimal? Cv_ValorUSD { get; set; }
        public int Sk_Lote { get; set; }
        public int? Sk_Lote_Upd { get; set; }
        public int Cod_Severidad { get; set; }
    }
}
