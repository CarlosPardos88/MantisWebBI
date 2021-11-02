using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesTD
{
    public class UsuarioPerfil
    {
        public string Id_Usuario { get; set; }
        public string Nombre_Usuario { get; set; }
        public string Id_PerfilUsuario { get; set; }
        public string Id_AreaNegocio { get; set; }
        public string Desc_JSONMenuUsuario { get; set; }

        public string Nombre_AreaNegocio { get; set; }
        public string Desc_PerfilUsuario { get; set; }
    }
}
