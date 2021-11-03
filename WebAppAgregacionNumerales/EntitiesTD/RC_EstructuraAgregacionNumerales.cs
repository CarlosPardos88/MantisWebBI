
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesTD
{
    public class RC_EstructuraAgregacionNumerales
    {
        public int Id_Estructura { get; set; }

        public string Desc_Estructura { get; set; }

        public DateTime? Fecha_InicioVigencia { get; set; }

        public DateTime? Fecha_FinVigencia { get; set; }

        public string Cb_EsDefinitiva { get; set; }

        public DateTime? Fecha_Creacion { get; set; }

        public string Cb_Eliminado { get; set; }

        public DateTime? Fecha_Eliminado { get; set; }

        public string Nombre_UsuarioEliminacion { get; set; }

        public int Sk_Lote { get; set; }

        public int? Sk_Lote_Upd { get; set; }

        public int Cod_Severidad { get; set; }

        public List<Nodo> Nodos { get; set; }

        public List<Nodo> NodosEliminados { get; set; }

        public string perfil { get; set; }
        public string Nombre_UsuarioCreacion { get; set; }
    }
}
