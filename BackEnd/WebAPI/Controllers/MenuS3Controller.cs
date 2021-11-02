using EntitiesTD;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class MenuS3Controller : ApiController
    {
        BI_OPERACIONEntities db = new BI_OPERACIONEntities();
        // GET api/<controller>
        public IEnumerable<string> Get_MenuS3()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost]
        public IHttpActionResult Post_MenuS3(ParamUsr usr)
        {
            if (usr != null)
            {
                MenuWS objMenu = new MenuWS();
                if (WebServiceS3.GetXmlS3Usuario(usr.usr, Propiedades.AppID, out objMenu))
                {
                    string perfil = "";
                    ResponseS3 response = new ResponseS3();
                    if (WebServiceS3.GetXmlPerfilS3Usuario(usr.usr, Propiedades.AppID, out perfil))
                    {
                        string cadena = perfil;
                        string[] Areas;
                        Areas = cadena.Split('_');
                        List<string> Substr = new List<string>();
                        if (Areas.Length > 1)
                        {
                            response.perfil = Areas[0];
                            for (int i = 1; i < Areas.Length; i++)
                            {
                                Substr.Add(Areas[i]);
                            }
                        }
                        else
                        {
                            response.perfil = perfil;
                        }
                        response.menu = objMenu;
                        
                        response.area = Substr;

                    }
                    else
                    {
                        return NotFound();
                    }
                    return Json(response);

                }
                else
                {
                    ResponseS3 response = new ResponseS3();
                    var t = db.OPE_Usuario.ToList();
                    if (UsuarioPerfilController.GetUsuarioPerfil(usr.usr).Count() > 0)
                    {
                        string jsonUser = "";
                        string perfil = "";
                        List<string> area = new List<string>();

                        List<UsuarioPerfil> usuario = UsuarioPerfilController.GetUsuarioPerfil(usr.usr);
                        foreach (var dto in usuario)
                        {
                            jsonUser = dto.Desc_JSONMenuUsuario;
                            perfil = dto.Desc_PerfilUsuario;
                            area.Add(dto.Nombre_AreaNegocio);
                            break;
                        }
                        
                        var menus = JsonConvert.DeserializeObject<MenuWS>(jsonUser);
                                                
                        response.menu = menus;
                        response.perfil = perfil;
                        response.area = area;
                        //return JsonConvert.SerializeObject(parsedJson, Formatting.Indented);
                        return Json(response);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
            else
            {
                return NotFound();
            }

        }
       


    }
}
