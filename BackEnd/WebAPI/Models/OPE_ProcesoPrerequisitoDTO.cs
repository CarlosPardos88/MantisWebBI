using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class OPE_ProcesoPrerequisitoDTO
    {
        public int Id_Proceso { get; set; }

        public int Id_ProcesoRequerido { get; set; }

        public int Id_ProcesoPrerequisito { get; set; }
    }
}