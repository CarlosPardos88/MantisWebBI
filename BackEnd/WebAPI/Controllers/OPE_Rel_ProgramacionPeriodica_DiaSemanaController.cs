using BllTD;
using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class OPE_Rel_ProgramacionPeriodica_DiaSemanaController: ApiController
    {
        Rel_ProgramacionPeriodica_DiaSemanaBll rel_ProgramacionPeriodica_DiaSemanaBll;

        public OPE_Rel_ProgramacionPeriodica_DiaSemanaController()
        {
            rel_ProgramacionPeriodica_DiaSemanaBll = new Rel_ProgramacionPeriodica_DiaSemanaBll();
        }

        [HttpGet]
        public List<Rel_ProgramacionPeriodica_DiaSemana> GetRelProDiaSemana()
        {
            return rel_ProgramacionPeriodica_DiaSemanaBll.GetRelProDiaSemana();
        }

        [HttpPost]
        public IHttpActionResult Post_RelProDiaSemana(Rel_ProgramacionPeriodica_DiaSemana rel_ProgramacionPeriodica_DiaSemana)
        {
            return Ok(rel_ProgramacionPeriodica_DiaSemanaBll.Post_RelProDiaSemana(rel_ProgramacionPeriodica_DiaSemana));
        }

        [HttpDelete]
        public IHttpActionResult Delete_RelProDiaSemana(int id)
        {
            return Ok(rel_ProgramacionPeriodica_DiaSemanaBll.Delete_RelProDiaSemana(id));
        }
    }
}