using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EntitiesTD
{
    public partial class RelProcSist
    {
        public  RelProcSist(){
        }
        public int Id_SistemaFuente { get; set; }
        public int Id_Proceso { get; set; }

        public int eliminados { get; set; }
        public string mensaje { get; set; }

    }
   
}