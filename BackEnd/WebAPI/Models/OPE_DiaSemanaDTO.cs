using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class OPE_DiaSemanaDTO
    {

        public int? Id_DiaSemana { get; set; }
        public string Nombre_DiaSemana { get; set; }
        public int Id { get; set; }
        //public ICollection<OPE_ProgramacionPeriodicaProcesoDTO> PE_ProgramacionPeriodicaProcesoDTOs { get; set; }
    }
   
}