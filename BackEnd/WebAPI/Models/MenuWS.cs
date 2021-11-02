using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    [Serializable]
    public class MenuWS
    {
        public MenuWS()
        {
            Childs = new List<MenuWS>();
        }
        public List<MenuWS> Childs { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public string Path { get; set; }
        public string Text { get; set; }
        public string Filter { get; set; }
    }
}