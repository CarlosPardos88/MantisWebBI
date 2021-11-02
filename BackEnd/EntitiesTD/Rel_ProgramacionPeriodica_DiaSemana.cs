using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesTD
{
    public partial class Rel_ProgramacionPeriodica_DiaSemana
    {
        public  int Id_ProgramacionPeriodica { get; set; }
        public int Id_DiaSemana { get; set; }

        public int eliminados { get; set; }
        public string mensaje { get; set; }
    }
}
