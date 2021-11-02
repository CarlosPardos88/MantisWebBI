using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public static class Constantes
    {
        public static readonly string AppID = "AppID";
        public const int TIPO_NOTIFICACION_PROCESO_IMPACTADO = 1;
        public const int TIPO_NOTIFICACION_PARAMETRO_EDITADO = 2;
        public const int TIPO_NOTIFICACION_FLUJO_VENCIDO = 3;
        public const int TIPO_NOTIFICACION_CERTIFICAR_PROCESO = 4;
        public const int TIPO_NOTIFICACION_PROCESO_EN_EJECUCION = 5;
        public const int TIPO_NOTIFICACION_PROCESO_EXITOSO = 6;
        public const int TIPO_NOTIFICACION_PROCESO_FALLIDO = 7;
        public const int TIPO_NOTIFICACION_CERTIFICAR_PROCESO_OPERADOR = 8;
        public const int TIPO_NOTIFICACION_SOLICITUD_DEMANDA = 9;
        public const int TIPO_NOTIFICACION_APROBAR_PROCESO_PROGRAMADO = 10;
    }
}