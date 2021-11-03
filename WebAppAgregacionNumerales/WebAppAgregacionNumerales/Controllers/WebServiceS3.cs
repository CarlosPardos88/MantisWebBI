using System;
using WebAppAgregacionNumerales.MenuS3;
using WebAppAgregacionNumerales.Models;
using WebAppAgregacionNumerales.perfiles;

namespace WebAppAgregacionNumerales.Controllers
{
    public class WebServiceS3
    {
        private static readonly AdministradorMenuWSClient administradorMenuWSClient = new AdministradorMenuWSClient();
        private static readonly ExecutePortTypeClient client = new ExecutePortTypeClient();

        private static void FillMenu(menuElement prmMenuWS, ref MenuWS prmMenuRef)

        {
            if (prmMenuWS != null)
            {
                if (prmMenuWS.level > 1)
                {
                    prmMenuRef.Name = prmMenuWS.nombre;
                    prmMenuRef.Path = prmMenuWS.link == null ? "" : prmMenuWS.link;
                    prmMenuRef.Order = prmMenuWS.orden;
                    prmMenuRef.Text = prmMenuWS.texto;

                    if (prmMenuWS.menu != null)
                    {
                        foreach (var objSubMenu in prmMenuWS.menu)
                        {
                            if (objSubMenu.link != "Filtro")
                            {
                                var varSubMenu = new MenuWS();
                                FillMenu(objSubMenu, ref varSubMenu);
                                prmMenuRef.Childs.Add(varSubMenu);
                            }
                            else
                            {
                                prmMenuRef.Filter += $"{(string.IsNullOrEmpty(prmMenuRef.Filter) ? string.Empty : ",")}{objSubMenu.nombre}";
                            }
                        }
                    }
                }
                else
                {
                    if (prmMenuWS.menu != null)
                    {
                        foreach (var objSubMenu in prmMenuWS.menu)
                        {
                            FillMenu(objSubMenu, ref prmMenuRef);
                        }
                    }

                }
            }
        }


        /// <summary>
        /// Consume Servicio s3 para opciones de menu y acceso a informacion de usuario
        /// </summary>
        /// <param name="usuario"></param>
        /// <param name="aplicacion"></param>
        public static Boolean GetXmlS3Usuario(string prmUsuario, string prmAplicacion, out MenuWS menu)
        {
            menu = new MenuWS();
            try
            {
                var objResConsultarMenu = administradorMenuWSClient.consultarMenuPerfil(new peticionConsultarMenuPerfil { request = new menuRequest() { aplicacion = prmAplicacion, usuario = prmUsuario } });
                if (objResConsultarMenu.menu != null)
                {
                    if (objResConsultarMenu.codigoRespuesta == 0)
                    {
                        var objMenu = new MenuWS();
                        FillMenu(objResConsultarMenu.menu, ref objMenu);
                        menu = objMenu;
                    }
                    return objResConsultarMenu.codigoRespuesta == 0;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static Boolean GetXmlPerfilS3Usuario(string prmUsuario, string prmAplicacion, out string perfil)
        {

            try
            {
                var objResConsultarMenu = client.consultaPerfilesUsuarioAppl(new WebAppAgregacionNumerales.perfiles.Input { s3 = new s3 { datosPeticion = new datosPeticion() { aplicacion = prmAplicacion, usuario = prmUsuario } } });
                perfil = objResConsultarMenu.s3Response.datosRespuesta[0].perfil;

                return true;
            }catch(Exception)
            {
                perfil = null;
                return false;
            }
        }
    }
}