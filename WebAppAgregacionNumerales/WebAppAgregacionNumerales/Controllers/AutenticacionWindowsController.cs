using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using BllTD;
using EntitiesTD;
using System.Net;
using System.Net.Http;
using System.Web.Http.Description;
using System.DirectoryServices;
using System.Configuration;

namespace WebAppAgregacionNumerales.Controllers
{
    public class AutenticacionWindowsController : ApiController
    {
        private static string url = ConfigurationManager.AppSettings["urldomain"].ToString();
       
        [System.Web.Http.HttpPost]
        public IHttpActionResult Post_(Usuario obje)
        {
            string result;
            try
            {
                result  = (GetAUser(obje.usuario,obje.pwd));
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Sin autenticar!");
            }
        }

        
        public string GetAUser(string user, string pass)
        {
            try
            {
                string Valid = "Invalido";
                DirectoryEntry de = new DirectoryEntry("LDAP://" + url, user, pass, AuthenticationTypes.Secure);
                DirectorySearcher ds = new DirectorySearcher(de);
                ds.FindOne();
                de.Close();
                de.Dispose();
                Valid = "Autenticado";
                return Valid;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}