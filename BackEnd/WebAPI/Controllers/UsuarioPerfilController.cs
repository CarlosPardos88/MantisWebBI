using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BllTD;
using EntitiesTD;

namespace WebAPI.Controllers
{
    public class UsuarioPerfilController
    {
        private static readonly UsuarioPerfilBLL usuarioPerfilBLL = new UsuarioPerfilBLL();

        public static List<UsuarioPerfil> GetUsuarioPerfil(string usuario)
        {
            var resultado = usuarioPerfilBLL.GetusuarioPerfil(usuario);
            return resultado;
        }

    }
}