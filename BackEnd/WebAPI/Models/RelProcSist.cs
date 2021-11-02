using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class RelProcSist
    {
        public int Id_SistemaFuente { get; set; }
        public int Id_Proceso { get; set; }

        public virtual OPE_TipoSistemaFuente OPE_TipoSistemaFuente { get; set; }
        public virtual OPE_Proceso OPE_Proceso { get; set; }


    }
}