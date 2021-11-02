using System.Linq;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http.Cors;
using Microsoft.Owin.Cors;
using Owin;

namespace WebAPI
{
    public class SignalRConfig
    {
        public static void Register(IAppBuilder app, EnableCorsAttribute cors)
        {
            app.MapSignalR();
            
            /*app.Map("/signalr", map =>
            {
                var corsOption = new CorsOptions
                {
                    PolicyProvider = new CorsPolicyProvider
                    {
                        PolicyResolver = context =>
                        {
                            CorsPolicy policy = new CorsPolicy { SupportsCredentials = true };

                            cors.Origins.ToList().ForEach(o => policy.Origins.Add(o));

                            return Task.FromResult(policy);
                        }
                    }
                };
                
                map.UseCors(corsOption).RunSignalR();
            });*/
        }
    }
}