using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using WebAPI.Models;

namespace WebAPI.Hubs
{
    public class NotificacionHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        public void addNotificacion(NotificacionModel not)
        {
            Clients.All.addNotificacion(not);
        }

        public void showNotificacion(NotificacionModel not)
        {
            Clients.All.showNotificacion(not);
        }
    }
}