using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class LogsController : ApiController
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();
        private static readonly string rutaServer = ConfigurationManager.AppSettings["rutaServer"].ToString();
        private static readonly string rutaLog1 = ConfigurationManager.AppSettings["rutaLog1"].ToString();
        private static readonly string rutaLog2 = ConfigurationManager.AppSettings["rutaLog2"].ToString();
        private static readonly string rutaLog3 = ConfigurationManager.AppSettings["rutaLog3"].ToString();
        //private string[] directorios = new string[] { rutaLog1, rutaLog2, rutaLog3 };

        // GET: api/Logs/5
        public List<Directorio> Get(string area, string NombreProceso, string FechaCreacion)
        {
            string[] directorios = new string[] { rutaLog1, rutaLog2, rutaLog3 };
            
            List<Directorio> list = new List<Directorio>();
            DateTime FechaCreacion2 = DateTime.Parse(FechaCreacion);
            var FechaCreacion3 = FechaCreacion2.ToString("yyyyMMddHH", CultureInfo.InvariantCulture);
            var FechaCreacion4 = FechaCreacion2.ToString("yyyyMMdd", CultureInfo.InvariantCulture);
            var FechaCreacion5 = FechaCreacion2.ToString("yyyyMM", CultureInfo.InvariantCulture);
            for (int i = 0; i < directorios.Length; i++)
            {
                string pathPatron = "";
                DirectoryInfo di = new DirectoryInfo(directorios[i] + @"\");
                if (i == 0)
                {
                    pathPatron = "*" + NombreProceso.Split('_').Last() + "*" + FechaCreacion3 + "*";
                    //di.GetFiles("*" + NombreProceso + "*" + FechaCreacion3 + "*");
                }
                else if (i == 1)
                {
                    pathPatron = "*" + NombreProceso.Split('_').Last() + "*";
                }
                else
                {
                    pathPatron = "*" + NombreProceso + "*";
                }


                foreach (var fi in di.GetFiles(pathPatron))
                {
                    var numeroHora = fi.CreationTime.Hour;// int.TryParse(fi.CreationTime.ToString("yyyyMMddHH", CultureInfo.InvariantCulture));
                    var num2Hora = FechaCreacion2.Hour;
                    var dia = fi.CreationTime.Day;
                    var dia2 = FechaCreacion2.Day;
                    if ((fi.CreationTime.ToString("yyyyMMdd", CultureInfo.InvariantCulture).Contains(FechaCreacion4) && numeroHora >= num2Hora)
                        ||(fi.CreationTime.ToString("yyyyMM", CultureInfo.InvariantCulture).Contains(FechaCreacion5) && dia2 ==(1+dia) && num2Hora >= 23))
                    {
                        var dir = directorios[i].ToString();
                        if (fi.FullName.ToString().StartsWith(dir))
                        {
                            list.Add(new Directorio()
                            {
                                NombreArchivos = fi.Name,
                                rutaArchivo = fi.FullName,
                                Fecha = fi.CreationTime.ToString()
                            });

                        }

                    }
                }
            }
            return list;
        }


        [HttpGet]
        public string Get2(string file, string carpetaArea)
        {
            string[] directorios = new string[] { rutaLog1, rutaLog2, rutaLog3 };

            for (int i = 0; i < directorios.Length; i++)
            {

                DirectoryInfo di = new DirectoryInfo(directorios[i]  + @"\");

                foreach (var fi in di.GetFiles("*" + file + "*" + "*"))
                {
                    try
                    {
                        if (fi.FullName.ToString().StartsWith(directorios[i]))
                        {
                            var archivo = directorios[i] + @"\" + file;
                            return System.IO.File.ReadAllText(archivo);

                        }
                    }
                    catch (FormatException)
                    {
                        return null;
                    }
                    catch (FileNotFoundException)
                    {
                        return null;
                    }

                }
                
                

            }

            return null;



        }

        //obtiene los archivos por ruta
        // GET: api/Logs/5
        public List<Directorio> GetFiles(int Id_Proceso, string area)
        {
             List<Directorio> list = new List<Directorio>();
             var rutas = (from p in db.Set<OPE_RutaPrerequisitoProceso>()
                    where p.Id_Proceso == Id_Proceso
                    select p).ToList()
              .Select(x => new OPE_RutaPrerequisitoProceso
              {
                  Id_Proceso = x.Id_Proceso,
                  Id_RutaPrerequisito = x.Id_RutaPrerequisito,
                  Desc_RutaArchivo = x.Desc_RutaArchivo
              });

            foreach (var ruta in rutas)
            {
                DirectoryInfo di = new DirectoryInfo(@rutaServer + area + @"\" + ruta.Desc_RutaArchivo + @"\");
                try
                {
                    if (di.GetFiles().Length > 0)
                    {
                        foreach (var fi in di.GetFiles())
                        {
                            if (fi.Directory.ToString().StartsWith(rutaServer + area + @"\" + ruta.Desc_RutaArchivo))
                            {
                                list.Add(new Directorio()
                                {
                                    NombreArchivos = fi.Name,
                                    rutaArchivo = ruta.Desc_RutaArchivo,
                                    Fecha = fi.CreationTime.ToString()
                                });
                            }
                        }
                    }
                }catch(Exception e)
                {
                    throw;
                }
            }
            return list;
        }
    }
}