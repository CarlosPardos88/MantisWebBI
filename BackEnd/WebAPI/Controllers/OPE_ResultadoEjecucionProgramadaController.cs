using BllTD;
using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    public class OPE_ResultadoEjecucionProgramadaController : ApiController
    {
        ResultadoEjecucionProgramadaBLL ResultadoEjecucionProgramadaBLL;

        public OPE_ResultadoEjecucionProgramadaController()
        {
            ResultadoEjecucionProgramadaBLL = new ResultadoEjecucionProgramadaBLL();
        }

        [HttpGet]
        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramadabyarea(string Fecha_incio, string Fecha_fin, string area)
        {
            return ResultadoEjecucionProgramadaBLL.GetResultadoejecucionprogramadabyarea(Fecha_incio, Fecha_fin, area);
        }

         [HttpGet]
        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramada(string Fecha_incio, string Fecha_fin)
        {
            return ResultadoEjecucionProgramadaBLL.GetResultadoejecucionprogramada(Fecha_incio, Fecha_fin);
        }

        [HttpGet]
        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramadabyproceso(int IdProceso)
        {
            return ResultadoEjecucionProgramadaBLL.GetResultadoejecucionprogramada(IdProceso);
            //return ResultadoEjecucionProgramadaBLL.GetResultadoejecucionprogramadaBool(IdProceso);
        }


        [HttpGet]
        [Route("api/OPE_ResultadoEjecucionProgramada/GetProceso2")]
        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramadabyprocesoBool(string Fecha_incio, string Fecha_fin)
        {
            //return ResultadoEjecucionProgramadaBLL.GetResultadoejecucionprogramada(IdProceso);
            return ResultadoEjecucionProgramadaBLL.GetResultadoejecucionprogramadaBool(Fecha_incio, Fecha_fin);

        }
    }
}