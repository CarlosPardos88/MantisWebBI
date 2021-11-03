using System.Configuration;

namespace WebAppAgregacionNumerales.Models
{
    public class Propiedades
    {
        public static string AppID
        {
            get
            {
                return ConfigurationManager.AppSettings["ApplicationID"];
            }
        }
    }
}