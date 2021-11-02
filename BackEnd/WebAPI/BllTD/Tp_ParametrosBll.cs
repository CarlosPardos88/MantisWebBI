using BIDAL;
using EntitiesTD;
using System.Collections.Generic;

namespace BllTD
{
    public class Tp_ParametrosBll
    {
        Tp_ParametroDAL tpParametrosDal;

        public Tp_ParametrosBll()
        {
            tpParametrosDal = new Tp_ParametroDAL();
        }

        public List<Tp_Parametros> GetTp_Parametros()
        {
            return tpParametrosDal.GetTp_Parametros();
        }

        public Tp_Parametros GetTp_Parametro(int id)
        {
            return tpParametrosDal.GetTp_Parametro(id);
        }

        public List<Tp_Parametros> GetTp_ParametrosByArea(string area)
        {
            return tpParametrosDal.GetTp_ParametrosByArea(area);
        }

        public int PostTp_Parametro(Tp_Parametros parametro)
        {
            return tpParametrosDal.PostTp_Parametro(parametro);

        }

        public int PutTp_Parametro(Tp_Parametros parametro)
        {
            return tpParametrosDal.PutTp_Parametro(parametro);

        }

    }
}
