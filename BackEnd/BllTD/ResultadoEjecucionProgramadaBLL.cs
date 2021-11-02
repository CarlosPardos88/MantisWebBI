using BIDAL;
using EntitiesTD;
using System.Collections.Generic;


namespace BllTD
{
    public class ResultadoEjecucionProgramadaBLL
    {
        ResultadoEjecucionProgramadaDAL ResultadoEjecucionProgramadaDAL;


        public ResultadoEjecucionProgramadaBLL()
        {
            ResultadoEjecucionProgramadaDAL = new ResultadoEjecucionProgramadaDAL();
        }

        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramadabyarea(string Fecha_incio, string Fecha_fin, string area)
        {
            return ResultadoEjecucionProgramadaDAL.GetResultadoejecucionprogramadabyarea(Fecha_incio, Fecha_fin, area);
        } 
        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramada(string Fecha_incio, string Fecha_fin)
        {
            return ResultadoEjecucionProgramadaDAL.GetResultadoejecucionprogramada(Fecha_incio, Fecha_fin);
        }
        public List<ResultadoEjecucionProgramada> GetProcesosVencidos()
        {
            return ResultadoEjecucionProgramadaDAL.GetProcesosVencidos();
        }
        public Tp_Parametros GetParametro(string area, string nombre) {
            return ResultadoEjecucionProgramadaDAL.GetTp_Parametros(area, nombre);
        }
        public void UpdateParametro(string area, string nombre,string valor)
        {
           ResultadoEjecucionProgramadaDAL.UpdateTp_Parametros(area, nombre,valor);
        }

        public List<ResultadoEjecucionProgramada> GetProcesosPorCertificar()
        {
            return ResultadoEjecucionProgramadaDAL.GetProcesosPorCertificar();
        }
        public List<ResultadoEjecucionProgramada> GetProcesosPorCertificarUsuario()
        {
            return ResultadoEjecucionProgramadaDAL.GetProcesosPorCertificarUsuario();
        }
        public List<ResultadoEjecucionProgramada> GetProcesosPorAprobar()
        {
            return ResultadoEjecucionProgramadaDAL.GetProcesosPorAprobar();
        }

        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramada(int IdProceso)
        {
            return ResultadoEjecucionProgramadaDAL.GetResultadoejecucionprogramada(IdProceso);
        }

        public List<ResultadoEjecucionProgramada> GetResultadoejecucionprogramadaBool(string Fecha_incio, string Fecha_fin)
        {
            return ResultadoEjecucionProgramadaDAL.GetResultadoejecucionprogramadaBool(Fecha_incio, Fecha_fin);
        }
        public List<ResultadoEjecucionProgramada> GetEstadosProcesos() {
            return ResultadoEjecucionProgramadaDAL.GetEstadosProcesos();
        }
    }
}
