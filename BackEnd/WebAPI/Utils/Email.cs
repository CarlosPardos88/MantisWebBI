using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using WebAPI.Models;

namespace WebAPI.Utils
{
    public class Email
    {
        private BI_OPERACIONEntities db = new BI_OPERACIONEntities();
        private static readonly string PARAM_NAME_EMAIL_ADMIN = ConfigurationManager.AppSettings["NombreParametroCorreoAdmin"].ToString();
        private static readonly string PARAM_NAME_EMAIL_OPER = ConfigurationManager.AppSettings["NombreParametroCorreoOper"].ToString();
        private static readonly string PARAM_NAME_EMAIL_USERS = ConfigurationManager.AppSettings["NombreParametroCorreoUser"].ToString();
        private static readonly string SUBJECT_EMAIL = ConfigurationManager.AppSettings["SubjectCorreo"].ToString();
        private static readonly string AREA_BI = ConfigurationManager.AppSettings["NombreAREABI"].ToString();
        private static readonly string FROM = ConfigurationManager.AppSettings["FromCorreo"].ToString();
        private static readonly string HostCorreo = ConfigurationManager.AppSettings["ServidorCorreo"].ToString();
        private static readonly int PuertoCorreo =Int16.Parse(ConfigurationManager.AppSettings["PuertoCorreo"].ToString());



        public IEnumerable<OPE_Parametro> GetOPE_Parametro(string area, string nombre)
        {
            return (from p in db.Set<OPE_Parametro>()
                    select p
                    ).ToList()
            .Select(x => new OPE_Parametro
            {
                Desc_Parametro = x.Desc_Parametro,
                Nombre_GrupoParametro = x.Nombre_GrupoParametro,
                Nombre_Parametro = x.Nombre_Parametro,
                Valor_Parametro = x.Valor_Parametro
            }).Where(item => {
                return item.Nombre_Parametro == nombre && item.Nombre_GrupoParametro == area;
            });

        }

        public async Task SendEmail(EmailModel model)
        {
            string bodyTmp = "";
            string body = "";
            string listWf = "";
            MailMessage message = new MailMessage();
            List<OPE_Parametro> listCorreoAdmin = GetOPE_Parametro(AREA_BI, PARAM_NAME_EMAIL_ADMIN).ToList();
            List<OPE_Parametro> listCorreoAdminArea = GetOPE_Parametro(model.area, PARAM_NAME_EMAIL_ADMIN).ToList();
            List<OPE_Parametro> listCorreoOper = GetOPE_Parametro(AREA_BI, PARAM_NAME_EMAIL_OPER).ToList();
            List<OPE_Parametro> listCorreoOperArea = GetOPE_Parametro(model.area, PARAM_NAME_EMAIL_OPER).ToList();
            List<OPE_Parametro> listCorreoUser = GetOPE_Parametro(model.area, PARAM_NAME_EMAIL_USERS).ToList();

            OPE_Parametro correoAdmin = new OPE_Parametro();
            OPE_Parametro correoAdminArea = new OPE_Parametro();
            OPE_Parametro correoOper = new OPE_Parametro();
            OPE_Parametro correoOperArea = new OPE_Parametro();
            OPE_Parametro correoUser = new OPE_Parametro();

            if (listCorreoAdmin != null && listCorreoAdmin.Count > 0) {
                correoAdmin = listCorreoAdmin[0];
            }
            
            if (listCorreoAdminArea != null && listCorreoAdminArea.Count > 0)
            {
                correoAdminArea = listCorreoAdminArea[0];
            }

            if (listCorreoOper != null && listCorreoOper.Count > 0)
            {
                correoOper = listCorreoOper[0];
            }

            if (listCorreoOperArea != null && listCorreoOperArea.Count > 0)
            {
                correoOperArea = listCorreoOperArea[0];
            }

            if (listCorreoUser != null && listCorreoUser.Count > 0)
            {
                correoUser = listCorreoUser[0];
            }


            if (correoAdmin.Valor_Parametro != null && correoAdmin.Valor_Parametro.Split(';') != null && correoAdmin.Valor_Parametro.Split(';').Length > 0)
            {
                foreach (string email in correoAdmin.Valor_Parametro.Split(';'))
                {
                    message.To.Add(new MailAddress(email));
                }

            }

            if (correoAdminArea.Valor_Parametro != null && correoAdminArea.Valor_Parametro.Split(';') != null && correoAdminArea.Valor_Parametro.Split(';').Length > 0)
            {
                foreach (string email in correoAdminArea.Valor_Parametro.Split(';'))
                {
                    message.To.Add(new MailAddress(email));
                }

            }

            if (model.modelMail != EmailModel.MODEL_WF_PENDIENTE_CERTIFICAR_USUARIO && correoOper.Valor_Parametro != null && correoOper.Valor_Parametro.Split(';') != null && correoOper.Valor_Parametro.Split(';').Length > 0)
            {
                foreach (string email in correoOper.Valor_Parametro.Split(';'))
                {
                    message.To.Add(new MailAddress(email));
                }

            }

            if (model.modelMail != EmailModel.MODEL_WF_PENDIENTE_CERTIFICAR_USUARIO && correoOperArea.Valor_Parametro != null && correoOperArea.Valor_Parametro.Split(';') != null && correoOperArea.Valor_Parametro.Split(';').Length > 0)
            {
                foreach (string email in correoOperArea.Valor_Parametro.Split(';'))
                {
                    message.To.Add(new MailAddress(email));
                }

            }

            if (model.modelMail != EmailModel.MODEL_WF_PENDIENTE_CERTIFICAR && correoUser.Valor_Parametro != null && correoUser.Valor_Parametro.Split(';') != null && correoUser.Valor_Parametro.Split(';').Length > 0)
            {
                foreach (string email in correoUser.Valor_Parametro.Split(';'))
                {
                    message.To.Add(new MailAddress(email));
                }

            }

            if (model.listWf != null && model.listWf.Count > 0) {
                foreach (string wf in model.listWf)
                {
                    listWf += "<li>" + wf + "</li>";
                }
            }
            

            switch (model.modelMail)
            {
                case EmailModel.MODEL_WF_ELIMINADO:
                    bodyTmp = "<p>Buen día,</p>" +
                        "<p></p>" +
                        "<p> El proceso {0} del área: {1} se ha eliminado. Por favor revise y modifique los workflows:</p>" +
                        "<ul>{2}</ul>" +
                        "<p> Los procesos anteriormente mencionados no se ejecutarán dado que el proceso {0} se ha eliminado.</p>";
                    body = string.Format(bodyTmp, model.process, model.area, listWf);
                    break;
                case EmailModel.MODEL_WF_INACTIVO:
                    bodyTmp = "<p>Buen día,</p>" +
                    "<p></p>" +
                    "<p> Una(s) programación(es) del proceso {0} del área de Negocio: {1} se ha desactivado. Por favor revise y modifique los workflows:</p>" +
                    "<ul>{2}</ul>" +
                    "<p> Los procesos anteriormente mencionados no se ejecutarán dado que el proceso prerrequisito no está activo.</p>";
                    body = string.Format(bodyTmp, model.process, model.area, listWf);
                    break;
                case EmailModel.MODEL_WF_PENDIENTE_CERTIFICAR:
                    bodyTmp = "<p>Buen día,</p>" +
                              "<p></p>" +
                              "<p> El proceso {0} del área: {1} se ha ejecutado a la hora {2} y ha finalizado {3}, por favor ingrese a la aplicación para certificar el proceso.</p>";
                    body = string.Format(bodyTmp, model.process, model.area,model.hora,model.estado);
                    break;
                case EmailModel.MODEL_WF_PENDIENTE_CERTIFICAR_USUARIO:
                    bodyTmp = "<p>Buen día,</p>" +
                              "<p></p>" +
                              "<p> El proceso {0} se ha ejecutado y ha finalizado {1}, por favor ingrese a la aplicación para certificar el proceso.</p>";
                    body = string.Format(bodyTmp, model.process, model.estado);
                    break;
                case EmailModel.MODEL_SOLICITUD_POR_DEMANDA:
                    bodyTmp = "<p>Buen día,</p>" +
                              "<p></p>" +
                              "<p> Solicitud por demanda de el proceso {0} pendiente de aprobación.</p>";
                    body = string.Format(bodyTmp, model.process);
                    break;
                case EmailModel.MODEL_WF_PENDIENTE_APROBAR_40_MIN:
                    bodyTmp = "<p>Buen día,</p>" +
                    "<p></p>" +
                    "<p>Los siguientes procesos no han sido aprobados y faltan 40 min para su ejecución programada. Por favor revise y apruebe los workflows:</p>" +
                    "<ul>{0}</ul>" ;
                    body = string.Format(bodyTmp, listWf);
                    break;
                case EmailModel.MODEL_WF_INACTIVO_FUENTE:
                    if (correoOperArea.Valor_Parametro != null)
                    {
                        bodyTmp = correoOperArea.Valor_Parametro + ", " + message.To.Count + " <p>Buen día,</p>" +
                    "<p></p>" +
                    "<p> Un cambio en el horario del sistema fuente: {0} - Nuevo horario: {1}. </p>" +
                    "<p> Impactó la progamación de los siguientes procesos. Por favor revise y modifique los workflows:</p>" +
                    "<ul>{2}</ul>" +
                    "<p> Los procesos anteriormente mencionados no se ejecutarán dado que se encuentran por fuera del horario del sistema fuente.</p>" +
                    " ajuste correo";
                    }
                    else {
                        bodyTmp = "<p>Buen día,</p>" +
                        "<p></p>" +
                        "<p> Un cambio en el horario del sistema fuente: {0} - Nuevo horario: {1}. </p>" +
                        "<p> Impactó la progamación de los siguientes procesos. Por favor revise y modifique los workflows:</p>" +
                        "<ul>{2}</ul>" +
                        "<p> Los procesos anteriormente mencionados no se ejecutarán dado que se encuentran por fuera del horario del sistema fuente.</p>" +
                        "ajuste correo";
                    }
                    
                    body = string.Format(bodyTmp, model.fuente, model.hora, listWf);
                    break;
            }

            MailAddress from = new MailAddress(FROM,"WEB BI " + (char)0xD8 + " OPERACIÓN",System.Text.Encoding.UTF8);
            message.From = from;
            
            message.Subject = SUBJECT_EMAIL;
            message.Body = body;
            message.IsBodyHtml = true;

            if (message.To.Count > 0) {
                try
                {
                    using (var smtp = new SmtpClient())
                    {
                        smtp.Host = HostCorreo;
                        smtp.Port = PuertoCorreo;
                        smtp.UseDefaultCredentials = true;
                        await smtp.SendMailAsync(message);
                    }
                }
                catch (SmtpException e) {
                    
                }
                
            }     
        }

    }
}