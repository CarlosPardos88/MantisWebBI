using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(WebAPI.Startup))]
namespace WebAPI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            //var httpConfig = new HttpConfiguration();

            //var cors = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            //httpConfig.EnableCors(cors);

            //SignalRConfig.Register(app, cors);

           // WebApiConfig.Register(httpConfig);

           // app.UseWebApi(httpConfig);
            

        }
    }
}