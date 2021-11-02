using BIDAL;
using EntitiesTD;
using System.Collections.Generic;

namespace BllTD
{
    public class UsuarioPerfilBLL
    {
        UsuarioPerfilDAL usuarioPerfilDAL;

        public UsuarioPerfilBLL()
        {
            usuarioPerfilDAL = new UsuarioPerfilDAL();
        }

        public List<UsuarioPerfil> GetusuarioPerfil(string usuario)
        {
            var usuarioPerfilDal = usuarioPerfilDAL.GetUsuarioPerfil(usuario);
            return usuarioPerfilDal;
        }
    }
}
