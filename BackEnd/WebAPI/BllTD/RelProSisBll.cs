using BIDAL;
using EntitiesTD;
using System.Collections.Generic;


namespace BllTD
{
    public class RelProSisBll
    {
        RelProSisDAL relProSisDAL;

        public RelProSisBll()
        {
            relProSisDAL = new RelProSisDAL();

        }
        public List<RelProcSist> GetRelProcs()
        {
            return relProSisDAL.GetRelProcs();
        }

        public int Post_RelProcSist(RelProcSist relProcSist)
        {
            return relProSisDAL.Post_RelProcSist(relProcSist);

        }

        public List<RelProcSist> Delete_RelProcSist(int id)
        {
            return relProSisDAL.Delete_RelProcSist(id);
        }
    }
}
