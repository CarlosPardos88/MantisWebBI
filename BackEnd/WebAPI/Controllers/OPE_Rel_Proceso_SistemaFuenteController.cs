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
    public class OPE_Rel_Proceso_SistemaFuenteController : ApiController
    {
        RelProSisBll relProSisBll;

        public OPE_Rel_Proceso_SistemaFuenteController() {
            relProSisBll = new RelProSisBll();
        }

        [HttpGet]
        public List<RelProcSist> GetRelProcs()
        {
            return relProSisBll.GetRelProcs();
        }

        [HttpGet]
        public List<RelProcSist> GetRelProcesoFuente(int id)
        {
            return relProSisBll.GetRelProcesoFuente(id);
        }

        [HttpPost]
        public IHttpActionResult Post_RelProcSist(RelProcSist relProcSist)
        {
            return Ok(relProSisBll.Post_RelProcSist(relProcSist));
        }

        [HttpDelete]
       public IHttpActionResult Delete_RelProcSist(int id)
        {
            try
            {
                return Ok(relProSisBll.Delete_RelProcSist(id));
            }catch(Exception e)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(string.Format("Error = {0}", e)),
                    ReasonPhrase = "Error Eliminando relación" + e
                };
                throw new HttpResponseException(resp);
            }
        }
      

    }
}