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
    public class OPE_ProcesoTDController : ApiController
    {
       readonly ProcesoBll procesoBll;
        public OPE_ProcesoTDController()
        {
            procesoBll = new ProcesoBll();
        }

        [HttpGet]
        public List<Proceso> GetProcesos(string rangoinicial, string rangofinal)
        {
            return procesoBll.GetProcesos(rangoinicial,rangofinal);
        }

    
    }
}