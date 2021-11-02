namespace WebAPI.Controllers
{
    public partial class Directorio
    {
        public string NombreDirectorio { get; set; }
        public string NombreArchivos { get; set; }

        public string rutaArchivo { get; set; }
        public string FileName { get; internal set; }
        public string Path { get; internal set; }

        public string Fecha { get; internal set; }
    }
}