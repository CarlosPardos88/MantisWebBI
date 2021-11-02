using BIDAL;
using EntitiesTD;
using System.Collections.Generic;

namespace BllTD
{
   public class Rel_ProgramacionPeriodica_DiaSemanaBll
    {
        Rel_ProgramacionPeriodica_DiaSemanaDAL rel_ProgramacionPeriodica_DiaSemanaDAL;

        public Rel_ProgramacionPeriodica_DiaSemanaBll()
        {
            
            rel_ProgramacionPeriodica_DiaSemanaDAL = new Rel_ProgramacionPeriodica_DiaSemanaDAL();
        }

        public List<Rel_ProgramacionPeriodica_DiaSemana> GetRelProDiaSemana()
        {
            return rel_ProgramacionPeriodica_DiaSemanaDAL.GetRelProDiaSemana();
        }

       public int Post_RelProDiaSemana(Rel_ProgramacionPeriodica_DiaSemana rel_ProgramacionPeriodica_DiaSemana)
        {
            return rel_ProgramacionPeriodica_DiaSemanaDAL.Post_RelProDiaSemana(rel_ProgramacionPeriodica_DiaSemana);

        }

        public int Post_RelProDiaSemanaIds(int IdProgramacion, int IdDia)
        {
            return rel_ProgramacionPeriodica_DiaSemanaDAL.Post_RelProDiaSemanaIds(IdProgramacion, IdDia);

        }

        public List<Rel_ProgramacionPeriodica_DiaSemana> Delete_RelProDiaSemana(int id)
        {
            return rel_ProgramacionPeriodica_DiaSemanaDAL.Delete_RelProDiaSemana(id);
        }
    }
}
