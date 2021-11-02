import { Injectable } from '@angular/core';
import { SignalR, ISignalRConnection } from 'ng2-signalr';
import { CryptoService } from '../../services/crypto.services';
import { Observable } from 'rxjs'


export const TIPO_NOTIFICACION_PROCESO_IMPACTADO: number = 1;
export const TIPO_NOTIFICACION_PARAMETRO_EDITADO: number = 2;
export const TIPO_NOTIFICACION_FLUJO_VENCIDO: number = 3;
export const TIPO_NOTIFICACION_CERTIFICAR_PROCESO: number = 4;
export const TIPO_NOTIFICACION_PROCESO_EN_EJECUCION: number = 5;
export const TIPO_NOTIFICACION_PROCESO_EXITOSO: number = 6;
export const TIPO_NOTIFICACION_PROCESO_FALLIDO: number = 7;
export const TIPO_NOTIFICACION_CERTIFICAR_PROCESO_OPERADOR: number = 8;
export const TIPO_NOTIFICACION_SOLICITUD_DEMANDA: number = 9;
export const TIPO_NOTIFICACION_APROBAR_PROCESO_PROGRAMADO: number = 10;

export interface INotificacion {
  titulo: string;
  tipo: number;
  msj: string;
  area?: string;
  idProceso?: number;
  nombreProceso?: string;
  idSolicitud?: number;
  fecha?: string;
  hora?: string;

}
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  listNotificacion: INotificacion[] = [];
  listProcesosImpactados: INotificacion[] = [];
  listParametrosModificados: INotificacion[] = [];
  listFlujosVencidos: INotificacion[] = [];
  listProcesosPorCertificar: INotificacion[] = [];
  listProcesosPorCertificarOperador: INotificacion[] = [];
  listProcesosSolicitudesDemanda: INotificacion[] = [];
  listProcesosSolicitudesProcesoProgramado: INotificacion[] = [];
  connection: ISignalRConnection;
  areafiltro;
  areaObj: any[];
  perfilAprobacion: string;
  public permission: Permission;

  constructor(private _signalR: SignalR, private _cryptoService: CryptoService) {
    this.connect();
    this.areafiltro = this._cryptoService.decryptText(sessionStorage.getItem('Areas'));
    this.areaObj = JSON.parse(this.areafiltro);

    let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
    let perfilDec = JSON.parse(perfilcipher.toString());
    this.perfilAprobacion = perfilDec;
    this.permission = this.isSupported ? 'default' : 'denied';

    /*
        this.addNotificacion({ titulo: "Flujo vencido", msj: "Se ha vencido la ejecución del proceso: WF_GRP_SIF_SALDO_DECEVAL_PARTE_1", tipo: TIPO_NOTIFICACION_FLUJO_VENCIDO, area: "DSIF" });
        this.addNotificacion({ titulo: "Flujo vencido", msj: "Se ha vencido la ejecución del proceso: WF_GRP_SIF_SALDO_DECEVAL_PARTE_1", tipo: TIPO_NOTIFICACION_FLUJO_VENCIDO, area: "BI" });
        this.addNotificacion({ titulo: "Flujo vencido", msj: "Se ha vencido la ejecución del proceso: WF_GRP_SIF_SALDO_DECEVAL_PARTE_1", tipo: TIPO_NOTIFICACION_FLUJO_VENCIDO, area: "SIGT" });
        this.addNotificacion({ titulo: "Flujo vencido", msj: "Se ha vencido la ejecución del proceso: WF_GRP_SIF_SALDO_DECEVAL_PARTE_1", tipo: TIPO_NOTIFICACION_CERTIFICAR_PROCESO, area: "SIGT" });
        this.addNotificacion({ titulo: "Flujo vencido", msj: "Se ha vencido la ejecución del proceso: WF_GRP_SIF_SALDO_DECEVAL_PARTE_1", tipo: TIPO_NOTIFICACION_PROCESO_IMPACTADO, idProceso: 83, nombreProceso: 'prueba' });
    */

  }

  isSupported(): boolean {
    return 'Notification' in window;
  }

  requestPermission(): void {

    if (this.isSupported()) {

      Notification.requestPermission((status) => {
        return this.permission = status;
      });
    }
  }

  addNotificacion(not: INotificacion) {

    if (!not.area || !this.areaObj || !(this.areaObj.length > 0) || this.areaObj.indexOf(not.area) >= 0) {


      switch (not.tipo) {
        case TIPO_NOTIFICACION_PARAMETRO_EDITADO:
          this.listParametrosModificados.push(not);
          this.listNotificacion.push(not);
          break;
        case TIPO_NOTIFICACION_CERTIFICAR_PROCESO:
          if (this.perfilAprobacion == "Usuario") {
            this.listProcesosPorCertificar.push(not);
            this.listNotificacion.push(not);
          }

          break;
        case TIPO_NOTIFICACION_CERTIFICAR_PROCESO_OPERADOR:
          if (this.perfilAprobacion == "Operador" || this.perfilAprobacion == "Administrador") {
            this.listProcesosPorCertificarOperador.push(not);
            this.listNotificacion.push(not);
          }
          break;
        case TIPO_NOTIFICACION_SOLICITUD_DEMANDA:
          if (this.perfilAprobacion == "Operador" || this.perfilAprobacion == "Administrador") {
            this.listProcesosSolicitudesDemanda.push(not);
            this.listNotificacion.push(not);
          }
          break;
        case TIPO_NOTIFICACION_APROBAR_PROCESO_PROGRAMADO:
          if (this.perfilAprobacion == "Operador" || this.perfilAprobacion == "Administrador") {
            this.listProcesosSolicitudesProcesoProgramado.push(not);
            this.listNotificacion.push(not);
          }
          break;
        case TIPO_NOTIFICACION_FLUJO_VENCIDO:
          this.listFlujosVencidos.push(not);
          this.listNotificacion.push(not);
          break;
        case TIPO_NOTIFICACION_PROCESO_IMPACTADO:
          if (this.perfilAprobacion == "Administrador") {
            this.listProcesosImpactados.push(not);
            this.listNotificacion.push(not);
          }

          break;
      }
    }
  }

  onClick(not: INotificacion) {
    this.deleteNotificacion(not);
  }

  clean() {
    this.listNotificacion = [];
    this.listFlujosVencidos = [];
    this.listParametrosModificados = [];
    this.listProcesosImpactados = [];
    this.listProcesosPorCertificar = [];
    this.listProcesosPorCertificarOperador = [];
    this.listProcesosSolicitudesDemanda = [];
    this.listProcesosSolicitudesProcesoProgramado = [];
  }

  deleteNotificacion(not: INotificacion) {
    let index = this.listNotificacion.indexOf(not);
    if (index != -1) {
      this.listNotificacion.splice(index, 1);
    }


    switch (not.tipo) {
      case TIPO_NOTIFICACION_PARAMETRO_EDITADO:
        index = this.listParametrosModificados.indexOf(not);
        if (index != -1) {
          this.listParametrosModificados.splice(index, 1);
        }
        break;
      case TIPO_NOTIFICACION_SOLICITUD_DEMANDA:
        index = this.listProcesosSolicitudesDemanda.indexOf(not);
        if (index != -1) {
          this.listProcesosSolicitudesDemanda.splice(index, 1);
        }
        break;
      case TIPO_NOTIFICACION_APROBAR_PROCESO_PROGRAMADO:
        index = this.listProcesosSolicitudesProcesoProgramado.indexOf(not);
        if (index != -1) {
          this.listProcesosSolicitudesProcesoProgramado.splice(index, 1);
        }
        break;
      case TIPO_NOTIFICACION_CERTIFICAR_PROCESO:
        this.listProcesosPorCertificar = [];
        this.listNotificacion = this.listNotificacion.filter((item) => { return item.tipo != not.tipo });
        break;
      case TIPO_NOTIFICACION_CERTIFICAR_PROCESO_OPERADOR:
        this.listProcesosPorCertificarOperador = [];
        this.listNotificacion = this.listNotificacion.filter((item) => { return item.tipo != not.tipo });
        break;
      case TIPO_NOTIFICACION_FLUJO_VENCIDO:
        this.listFlujosVencidos = [];
        this.listNotificacion = this.listNotificacion.filter((item) => { return item.tipo != not.tipo });
        break;
      case TIPO_NOTIFICACION_PROCESO_IMPACTADO:
        index = this.listProcesosImpactados.indexOf(not);
        if (index != -1) {
          this.listProcesosImpactados.splice(index, 1);
        }
        break;
    }


  }

  connect() {
    this._signalR.connect().then((c) => {

      this.connection = c;
      c.listenForRaw('addNotificacion').subscribe((data: any) => {
        this.addNotificacion(data[0]);
      });

      c.listenForRaw('showNotificacion').subscribe((data: any) => {
        this.showToastNotification(data[0]);
      });

    });
  }

  showToastNotification(notification: INotificacion): any {
    let self = this;
    let tempIcon = "";

    switch (notification.tipo) {
      case TIPO_NOTIFICACION_PROCESO_EXITOSO:
        tempIcon = "assets/icons/icon_check.png";
        break;
      case TIPO_NOTIFICACION_PROCESO_FALLIDO:
        tempIcon = "assets/icons/icons8_error.png";
        break;
      case TIPO_NOTIFICACION_PROCESO_EN_EJECUCION:
        tempIcon = "assets/icons/icon_info.png";
        break;
    }

    new Observable((obs) => {

      if (!this.isSupported()) {
        console.log('Notifications are not available in this environment');
        obs.complete();
      }
      if (self.permission == 'denied') {
        alert('El usuario no ha concedido permisos de recibir notificaciones');
        obs.complete();
      }

      let _notify = new Notification(notification.titulo, {
        icon: tempIcon,
        body: notification.msj
      });

      _notify.onshow = (e) => {
        return obs.next({
          notification: _notify,
          event: e
        });
      };
      _notify.onclose = (e) => {
        return obs.complete();
      };
      setTimeout(_notify.close.bind(_notify), 4000);
    }).subscribe();
  }
}

export declare type Permission = 'denied' | 'granted' | 'default';

