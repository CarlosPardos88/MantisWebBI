using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAppAgregacionNumerales.Models
{
    public class ResponseS3
    {
        public ResponseS3()
        {

        }
        public MenuWS menu { get; set; }
        public string perfil { get; set; }
        public List<String> area { get; set; }
    }
}