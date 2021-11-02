using BIDAL;
using EntitiesTD;
using System.Collections.Generic;

namespace BllTD
{
    public class ProcesoBll
    {
        ProcesoDAL procesoDAL;

        public ProcesoBll()
        {
            procesoDAL = new ProcesoDAL();
        }
       
        public List<Proceso> GetProcesos(string rangoincial, string rangofinal)
        {
            return procesoDAL.GetProcesos(rangoincial, rangofinal);
        }


    }
}
