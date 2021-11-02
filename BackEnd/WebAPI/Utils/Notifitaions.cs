﻿using BllTD;
using EntitiesTD;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Core.Mapping;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Mvc;
using WebAPI.Hubs;
using WebAPI.Models;

namespace WebAPI.Utils
{
    public class Notifitaions
    {
        
        private static Boolean existProcess(ResultadoEjecucionProgramada res, List<ResultadoEjecucionProgramada> list)
        {
            Boolean result = false;

            foreach (ResultadoEjecucionProgramada resultado in list)
            {
                if (resultado.Id_ResultadoEjecucionProgramada == res.Id_ResultadoEjecucionProgramada)
                {
                    result = true;
                    break;
                }
            }

            return result;

        }

        private static Boolean existProcessEjecutado(ResultadoEjecucionProgramada res, List<ResultadoEjecucionProgramada> list)
        {
            Boolean result = false;

            foreach (ResultadoEjecucionProgramada resultado in list)
            {
                if (resultado.Id_ResultadoEjecucionProgramada == res.Id_ResultadoEjecucionProgramada && resultado.Id_EstadoEjecucionInformatica == res.Id_EstadoEjecucionInformatica)
                {
                    result = true;
                    break;
                }
            }

            return result;

        }

        private static Boolean existProcessNoProgramacion(ResultadoEjecucionProgramada res, List<ResultadoEjecucionProgramada> list)
        {
            Boolean result = false;

            foreach (ResultadoEjecucionProgramada resultado in list)
            {
                if (resultado.Id_ProgramacionPeriodica == res.Id_ProgramacionPeriodica && res.Id_Proceso == resultado.Id_Proceso)
                {
                    result = true;
                    break;
                }
            }

            return result;

        }

        public static void startTaskNotifications()
        {
             string initialDate = "";
         string currentDate = "";

         BI_OPERACIONEntities db = new BI_OPERACIONEntities();
         List<ResultadoEjecucionProgramada> listProcesosVencidos;
         List<ResultadoEjecucionProgramada> listProcesosPorCertificar;
         List<ResultadoEjecucionProgramada> listProcesosPorCertificarUsuario;
         List<ResultadoEjecucionProgramada> listProcesosPorAprobar;
         List<ResultadoEjecucionProgramada> listEstadosProcesos;
        ResultadoEjecucionProgramadaBLL resultadoEjecucionProgramadaBLL = new ResultadoEjecucionProgramadaBLL();


        listProcesosVencidos = new List<ResultadoEjecucionProgramada>();
            listProcesosPorCertificar = new List<ResultadoEjecucionProgramada>();
            listProcesosPorCertificarUsuario = new List<ResultadoEjecucionProgramada>();
            listEstadosProcesos = new List<ResultadoEjecucionProgramada>();
            listProcesosPorAprobar = new List<ResultadoEjecucionProgramada>();
            initialDate = DateTime.Now.ToString("d");
            Task taskFlujosVencidos = Task.Factory.StartNew(() =>
            {
                while (true)
                {
                    currentDate = DateTime.Now.ToString("d");

                    if (!currentDate.Equals(initialDate))
                    {
                        initialDate = currentDate;
                        listProcesosVencidos.Clear();
                        listProcesosPorCertificar.Clear();
                        listProcesosPorCertificarUsuario.Clear();
                        listEstadosProcesos.Clear();
                        listProcesosPorAprobar.Clear();
                    }

                    List<ResultadoEjecucionProgramada> list = resultadoEjecucionProgramadaBLL.GetProcesosVencidos();
                    List<ResultadoEjecucionProgramada> listPorCert = resultadoEjecucionProgramadaBLL.GetProcesosPorCertificar();
                    List<ResultadoEjecucionProgramada> listPorCertUsr = resultadoEjecucionProgramadaBLL.GetProcesosPorCertificarUsuario();
                    List<ResultadoEjecucionProgramada> listEstProcesos = resultadoEjecucionProgramadaBLL.GetEstadosProcesos();
                    List<ResultadoEjecucionProgramada> listPorApro = resultadoEjecucionProgramadaBLL.GetProcesosPorAprobar();
                    List<string> listAreasPorAproEnv = new List<string>();
                    List<ResultadoEjecucionProgramada> listPorAproTmp = new List<ResultadoEjecucionProgramada>();

                    // nuevas notificaciones proceso vencidos
                    foreach (ResultadoEjecucionProgramada res in list)
                    {

                        if (!existProcess(res, listProcesosVencidos))
                        {
                            listProcesosVencidos.Add(res);
                            string[] hora = res.FechaHora_InicioEjecucion.Split(' ');
                            string h = "";

                            if (hora != null && hora.Length > 1)
                            {
                                h = hora[1];
                            }
                            NotificacionModel notificacion = new NotificacionModel();
                            notificacion.area = res.Nombre_AreaNegocio;
                            notificacion.hora = h;
                            notificacion.msj = "Se ha vencido la ejecución del proceso: " + res.Nombre_Proceso;
                            notificacion.titulo = "Flujo vencido";
                            notificacion.tipo = Constantes.TIPO_NOTIFICACION_FLUJO_VENCIDO;

                            GlobalHost.ConnectionManager.GetHubContext<NotificacionHub>().Clients.All.addNotificacion(notificacion);

                        }
                    }

                    // nuevas notificacciones procesos por certificar usuario
                    foreach (ResultadoEjecucionProgramada res in listPorCertUsr)
                    {

                        if (!existProcess(res, listProcesosPorCertificarUsuario))
                        {
                            listProcesosPorCertificarUsuario.Add(res);

                            NotificacionModel notificacion = new NotificacionModel();
                            notificacion.area = res.Nombre_AreaNegocio;
                            notificacion.msj = "Nuevo proceso pendiente por certificar: " + res.Nombre_Proceso;
                            notificacion.titulo = "Proceso pendiente por certificar";
                            notificacion.tipo = Constantes.TIPO_NOTIFICACION_CERTIFICAR_PROCESO;

                            GlobalHost.ConnectionManager.GetHubContext<NotificacionHub>().Clients.All.addNotificacion(notificacion);

                            EmailModel envio = new EmailModel();
                            envio.area = res.Nombre_AreaNegocio;
                            envio.process = res.Nombre_Proceso;
                            envio.modelMail = EmailModel.MODEL_WF_PENDIENTE_CERTIFICAR_USUARIO;
                            envio.estado = res.Nombre_EstadoEjecucionInformatica;
                            try
                            {
                                _ = Task.Run(() => new Utils.Email().SendEmail(envio));
                            }
                            catch (SmtpException)
                            {
                                throw;
                            }

                        }
                    }

                    // nuevas notificacciones procesos por certificar
                    foreach (ResultadoEjecucionProgramada res in listPorCert)
                    {

                        if (!existProcess(res, listProcesosPorCertificar))
                        {
                            string[] hora = res.FechaHora_InicioEjecucion.Split(' ');
                            string h = "";

                            if (hora != null && hora.Length > 1)
                            {
                                h = hora[1];
                            }

                            listProcesosPorCertificar.Add(res);

                            NotificacionModel notificacion = new NotificacionModel();
                            notificacion.area = res.Nombre_AreaNegocio;

                            notificacion.msj = "El proceso: " + res.Nombre_Proceso + " esta pendiente por ser certificado.";
                            notificacion.titulo = "Proceso Por certificar";
                            notificacion.tipo = Constantes.TIPO_NOTIFICACION_CERTIFICAR_PROCESO_OPERADOR;

                            GlobalHost.ConnectionManager.GetHubContext<NotificacionHub>().Clients.All.addNotificacion(notificacion);

                            EmailModel envio = new EmailModel();
                            envio.area = res.Nombre_AreaNegocio;
                            envio.process = res.Nombre_Proceso;
                            envio.modelMail = EmailModel.MODEL_WF_PENDIENTE_CERTIFICAR;
                            envio.hora = h;
                            envio.estado = res.Nombre_EstadoEjecucionInformatica;

                            try
                            {
                                _ = Task.Run(() => new Utils.Email().SendEmail(envio));
                            }
                            catch (SmtpException)
                            {
                                throw;
                            }

                        }
                    }

                    // nuevas notificacciones estados procesos
                    foreach (ResultadoEjecucionProgramada res in listEstProcesos)
                    {

                        if (!existProcessEjecutado(res, listEstadosProcesos))
                        {
                            int tipoNot = -1;

                            switch (res.Id_EstadoEjecucionInformatica)
                            {
                                case "1": tipoNot = Constantes.TIPO_NOTIFICACION_PROCESO_EXITOSO; break;
                                case "2": tipoNot = Constantes.TIPO_NOTIFICACION_PROCESO_FALLIDO; break;
                                case "5": tipoNot = Constantes.TIPO_NOTIFICACION_PROCESO_EN_EJECUCION; break;

                            }


                            listEstadosProcesos.Add(res);

                            NotificacionModel notificacion = new NotificacionModel();
                            notificacion.area = res.Nombre_AreaNegocio;

                            notificacion.msj = "El proceso: " + res.Nombre_Proceso + " se encuentra en estado: " + res.Nombre_EstadoEjecucionInformatica;
                            notificacion.titulo = "Procesos";
                            notificacion.tipo = tipoNot;

                            GlobalHost.ConnectionManager.GetHubContext<NotificacionHub>().Clients.All.showNotificacion(notificacion);

                        }
                    }


                    // correo de procesos pendientes por aprobar
                    foreach (ResultadoEjecucionProgramada res in listPorApro)
                    {
                        if (!existProcessNoProgramacion(res, listProcesosPorAprobar))
                        {
                            listPorAproTmp.Add(res);
                            listProcesosPorAprobar.Add(res);
                        }
                    }

                    listAreasPorAproEnv = listPorAproTmp.Select(x => x.Nombre_AreaNegocio).Distinct().ToList();

                    if (listAreasPorAproEnv.Count > 0)
                    {
                        foreach (string area in listAreasPorAproEnv)
                        {
                            List<string> listPorAproEnvTmp = new List<string>();

                            listPorAproEnvTmp = listPorAproTmp.Where(x => x.Nombre_AreaNegocio == area)
                            .Select(p => p.Nombre_Proceso).ToList();

                            if (listPorAproEnvTmp.Count > 0)
                            {
                                EmailModel envio = new EmailModel();
                                envio.modelMail = EmailModel.MODEL_WF_PENDIENTE_APROBAR_40_MIN;
                                envio.listWf = listPorAproEnvTmp;
                                envio.area = area;
                                try
                                {
                                    _ = Task.Run(() => new Utils.Email().SendEmail(envio));
                                }
                                catch (SmtpException)
                                {
                                    throw;
                                }
                            }
                        }
                    }
                    Thread.Sleep(2000);
                }

            });

        }
    }
}