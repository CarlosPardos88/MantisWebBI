using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesTD
{
   public class ResultadoNodo
    {

        public int Sk_NodoContable { get; set; }
        public string name { get; set; }
        public int Id_NodoContable { get; set; }
        public string Desc_NodoContablePadre { get; set; }
        public int Id_NodoContablePadre { get; set; }
        public int Sk_RCNumeralCambiario { get; set; }
        public int idnumeralcco { get; set; }
        public int level { get; set; }
        public int orden { get; set; }
        public  List<ResultadoFormulacion> formulacion { get; set; }
         

    }
}
