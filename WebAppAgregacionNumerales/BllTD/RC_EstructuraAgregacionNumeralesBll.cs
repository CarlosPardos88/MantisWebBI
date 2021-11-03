using BIDAL;
using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BllTD
{
    public class RC_EstructuraAgregacionNumeralesBll
    {
        RC_EstructuraAgregacionNumeralesDAL rc_EstructuraAgregacionNumeralesDAL;

        public RC_EstructuraAgregacionNumeralesBll()
        {
            rc_EstructuraAgregacionNumeralesDAL = new RC_EstructuraAgregacionNumeralesDAL();
        }

        public List<RC_EstructuraAgregacionNumerales> Get_RC_EstructuraAgregacionNumeralesBll()
        {
            try
            {
                return rc_EstructuraAgregacionNumeralesDAL.Get_RC_EstructuraAgregacionNumeralesDAL();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }

        public List<RC_EstructuraAgregacionNumerales> Get_RC_EstructuraAgregacionNumeralesByIdNameBll(int Id, string desc)
        {
            try
            {
                return rc_EstructuraAgregacionNumeralesDAL.Get_RC_EstructuraAgregacionNumeralesByIdNameDAL(Id, desc);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }

        public int Post_RC_EstructuraAgregacionNumeralesBll(RC_EstructuraAgregacionNumerales estructura)
        {
            try
            {
                return rc_EstructuraAgregacionNumeralesDAL.Post_RC_EstructuraAgregacionNumeralesDAL(estructura);
            }
            catch (Exception ex)
            {

                throw ex;
            }
           

        }

        public int Put_RC_EstructuraAgregacionNumeralesBll(int Id_Estructura, RC_EstructuraAgregacionNumerales estructura)
        {
            try
            {
                return rc_EstructuraAgregacionNumeralesDAL.Put_RC_EstructuraAgregacionNumeralesDAL(Id_Estructura, estructura);
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }
    }
}
