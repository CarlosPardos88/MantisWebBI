using System;
using System.Collections.Generic;
using System.Web.Http;
using WebAppAgregacionNumerales.Models;

namespace WebAppAgregacionNumerales.Controllers
{
    public class MenuS3Controller : ApiController
    {
        [HttpPost]
        public IHttpActionResult Post_MenuS3(ParamUsr usr)
        {
            if (usr != null)
            {
                MenuWS objMenu = new MenuWS();
                try
                {
                    var menu = WebServiceS3.GetXmlS3Usuario(usr.usr, Propiedades.AppID, out objMenu);

                    if (menu)
                    {
                        string perfil = "";
                        ResponseS3 response = new ResponseS3();
                        try
                        {
                            var perfilflag = WebServiceS3.GetXmlPerfilS3Usuario(usr.usr, Propiedades.AppID, out perfil);
                            if (perfilflag)
                            {
                                response.perfil = perfil;
                                response.menu = objMenu;
                            }
                            else
                            {
                                return NotFound();
                            }

                            return Json(response);
                        }catch(Exception e)
                        {
                            return NotFound();
                        }
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                catch(Exception e)
                {
                    return NotFound();
                }
               
            }
            else
            {
                return NotFound();
            }

        }
    }
}
