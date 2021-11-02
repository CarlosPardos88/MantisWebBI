using System;
using System.Collections.Generic;
using System.Web;

namespace WebAPI.Models
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
