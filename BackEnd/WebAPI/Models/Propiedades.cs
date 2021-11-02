using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace WebAPI.Models
{
    public static class Propiedades
    {
        public static string AppID
        {
            get
            {
                
                /*
                if (HttpContext.Current.Session[Constantes.AppID] == null)
                {
                    HttpContext.Current.Session[Constantes.AppID] = ConfigurationManager.AppSettings["ApplicationID"];
                }
                return HttpContext.Current.Session[Constantes.AppID].ToString();*/
                return ConfigurationManager.AppSettings["ApplicationID"];
            }
        }
    }
}