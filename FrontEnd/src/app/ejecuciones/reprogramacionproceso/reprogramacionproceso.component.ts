import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TdLoadingService } from '@covalent/core/loading';
import { ActivatedRoute, Router } from '@angular/router';
import { TdMediaService } from '@covalent/core/media';
import { SolicitudesdemandaService, ISolicitudDem } from '../../solicitudesdemanda/services/solicitudesdemanda.service';
import { CryptoService } from '../../../services/crypto.services';
import { ProcesoService, IProceso } from '../../procesos/services/procesos.service';
import { formatDate, Time } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core/dialogs';
import { ID_ESTADOPROCESO_FALLIDO, ID_ESTADOPROCESO_VENCIDO, ID_TIPOJUSTIFICACION_FALLIDO, ID_TIPOJUSTIFICACION_VENCIDO, GetRangoHorarioFromProceso } from '../../utils/Utils';
import { TipojustificacionService } from '../../services/tipojustificacion.service';
//import { url } from 'inspector';

@Component({
  selector: 'app-reprogramacionproceso',
  templateUrl: './reprogramacionproceso.component.html',
  styleUrls: ['./reprogramacionproceso.component.scss']
})
export class ReprogramacionprocesoComponent implements OnInit {

  NombreProceso: string;
  IdProceso: number;
  proceso: IProceso;
  Id_EstadoProceso: number;

  userAprobacion: string;
  perfilAprobacion: string;

  solicitudDem: ISolicitudDem;
  Id_SolicitudEjecucionPorDemanda: number;
  FechaHora_FinVentanaSugerida: string;
  FechaHora_EjecucionAprobada: string;
  FechaHora_InicioVentanaSugerida: string;
  FechaHora_Sugerida: String;
  FechaHora_RevisionUsuario: string;
  FechaHora_RevisionOperador: string;
  Nombre_OperadorRevisor: string;
  Nombre_RolOperadorRevisor: string;
  Nombre_UsuarioSolicitante: string;
  Nombre_RolUsuarioSolicitante: string;
  Nombre_AreaNegocio: string;

  action: string;
  isLoading: boolean = false;
  show: boolean = false;

  today: string = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en');
  todayFinal: Date = new Date();
  todayFinal2: string;

  HoraIniFueCom: Time;
  HoraFinFueCom: Time;
  OPE_TipoJustificacion: any[];
  Justificacion_Proceso: string;
  Id_Justificacion: number;
  NombreEstadoProceso: string;

  Hora_Inicio: string;
  Hora_Fin: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBarService: MatSnackBar,
    private _dialogService: TdDialogService,
    private _loadingService: TdLoadingService,
    public media: TdMediaService,
    private _solicitudesdemandaService: SolicitudesdemandaService,
    private _cryptoService: CryptoService,
    private _procesoService: ProcesoService,
    private _tipoJustificacionService: TipojustificacionService
  ) { }

  ngOnInit() {
    console.log(this._route.url);
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[3].path : '');
    });
    this._route.params.subscribe((params: { Nombre_Proceso: string, Id_Proceso: number, Id_EstadoProceso: number }) => {
      this.NombreProceso = params.Nombre_Proceso;
      this.IdProceso = params.Id_Proceso;
      this.Id_EstadoProceso = params.Id_EstadoProceso;

      if (this.IdProceso && this.NombreProceso && this.Id_EstadoProceso) {

        if (this.Id_EstadoProceso == ID_ESTADOPROCESO_FALLIDO) {
          this.Id_Justificacion = ID_TIPOJUSTIFICACION_FALLIDO;
          this.NombreEstadoProceso = 'fallidos';
        } else if (this.Id_EstadoProceso == ID_ESTADOPROCESO_VENCIDO) {
          this.Id_Justificacion = ID_TIPOJUSTIFICACION_VENCIDO;
          this.NombreEstadoProceso = 'vencidos';
        }

        this.load();
      }
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('solicitud.form');
      this.isLoading = true;
      let procesoA: IProceso[] = await this._procesoService.getprocesoByIdName(this.IdProceso, this.NombreProceso).toPromise();
      console.log('Validacion form reprog 1');
      this.OPE_TipoJustificacion = await this._tipoJustificacionService.query().toPromise();
      console.log('Validacion form reprog 2');

      if(procesoA[0].OPE_SistemaFuente.length && procesoA[0].OPE_SistemaFuente.length > 0){
        this.Hora_Inicio = GetRangoHorarioFromProceso(procesoA[0]).Hora_Inicio + '';
        this.Hora_Fin = GetRangoHorarioFromProceso(procesoA[0]).Hora_fin + '';
        console.log('Validacion form reprog 3');
      }else{
        this.Hora_Inicio = '00:00';
        this.Hora_Fin = '23:59';
      }

    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió error cargando el proceso', closeButton: 'Aceptar' });
    } finally {
      this.todayFinal.setHours(23, 59, 59, 999);
      this.todayFinal2 = formatDate(new Date(this.todayFinal), 'yyyy-MM-ddTHH:mm', 'en');
      console.log('Validacion form reprog 4');
      this.isLoading = false;
      this._loadingService.resolve('solicitud.form');
    }
  }

  async save(): Promise<void> {
    try {

      if (sessionStorage.getItem('Menus')) {
        this.userAprobacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
        let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
        let perfilDec = JSON.parse(perfilcipher.toString());

        this.perfilAprobacion = perfilDec;
        console.log('Validacion form reprog 5');
      }

      let fechaRevision = formatDate(new Date(), 'yyyy-MM-ddThh:mm', 'en');

      this.solicitudDem = {
        Id_SolicitudEjecucionPorDemanda: this.Id_SolicitudEjecucionPorDemanda,
        FechaHora_FinVentanaSugerida: this.FechaHora_Sugerida.toString(),
        FechaHora_EjecucionAprobada: this.FechaHora_EjecucionAprobada,
        Id_Proceso: this.IdProceso,
        FechaHora_InicioVentanaSugerida: this.FechaHora_Sugerida.toString(),
        FechaHora_Sugerida: this.FechaHora_Sugerida,
        FechaHora_RevisionUsuario: fechaRevision,
        FechaHora_RevisionOperador: this.FechaHora_RevisionOperador,
        Nombre_OperadorRevisor: this.userAprobacion,
        Nombre_RolOperadorRevisor: this.perfilAprobacion,
        Nombre_UsuarioSolicitante: this.Nombre_UsuarioSolicitante,
        Nombre_RolUsuarioSolicitante: this.Nombre_RolUsuarioSolicitante,
        Desc_JustificacionSolicitud: this.Justificacion_Proceso,
        Id_TipoEjecucionDemanda: this.Id_Justificacion + '',
        Nombre_AreaNegocio: this.Nombre_AreaNegocio
        
      };

      await this._solicitudesdemandaService.postCreateSolicitudDemanda(this.solicitudDem).toPromise();
      console.log('Validacion form reprog 6');

      this._snackBarService.open('Solicitud realizada con éxito. Recuerde aprobar la ejecución del proceso en el menú Aprobaciones por Demanda.', 'Ok', { duration: 6000 });
      this.goBack();
    } catch (error) {
      this._dialogService.openAlert({ message: 'Error solicitando la ejecución del proceso', closeButton: 'Aceptar' });
    } finally {
    }
  }

  goBack(): void {
    this._router.navigate(['/ejecuciones']);
  }

  validarFecha() {
    if (this.FechaHora_InicioVentanaSugerida > this.FechaHora_FinVentanaSugerida) {
      this._dialogService.openAlert({ message: 'La Fecha Inicio no puede ser mayor a la Fecha Fin.', closeButton: 'Aceptar' });
      this.FechaHora_FinVentanaSugerida = '';
    }
  }

  horarioFuentesMinMax(sistemasFuente) {
    if (sistemasFuente.length > 0) {
      let test = sistemasFuente.reduce(function (prev, curr) {
        console.log('Validacion form reprog 7');
        return prev.OPE_HorarioSistemaFuente[0].Hora_Fin < curr.OPE_HorarioSistemaFuente[0].Hora_Fin ? prev : curr;
      });

      let test2 = sistemasFuente.reduce(function (prev, curr) {
        console.log('Validacion form reprog 8');
        return prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Inicio ? prev : curr;
      });

      this.HoraIniFueCom = test2.OPE_HorarioSistemaFuente[0].Hora_Inicio;
      this.HoraFinFueCom = test.OPE_HorarioSistemaFuente[0].Hora_Fin;
    }
  }

  validarHoraEje() {
    
    let fechaSugerida = formatDate(new Date(this.FechaHora_Sugerida.toString()), 'yyyy-MM-dd HH:mm', 'en');
    let hora = fechaSugerida.substring(10,16);
    if (this.Hora_Inicio) {
      if(this.Hora_Inicio > this.Hora_Fin){
        if(hora < this.Hora_Inicio+'' && hora > this.Hora_Fin+''){
          this.FechaHora_Sugerida = null;
          console.log('Validacion form reprog 9');
          this._dialogService.openAlert({message: 'No se admite ingresar fecha de ejecución en el horario: '+this.Hora_Inicio+' - '+this.Hora_Fin, closeButton :'Aceptar'});
        }
      }
    }else{
      if (hora < this.Hora_Inicio + '' || hora > this.Hora_Fin + '') {
        this.FechaHora_Sugerida = null;
        console.log('Validacion form reprog 10');
        this._dialogService.openAlert({ message: 'La hora de ejecución no puede estar fuera del rango de horas de los Sistema Fuente del proceso: Hora Min: ' + this.HoraIniFueCom + ' Hora Max: ' + this.HoraFinFueCom, closeButton: 'Aceptar' });
      } else if (this.FechaHora_Sugerida < this.today) {
        this.FechaHora_Sugerida = null;
        console.log('Validacion form reprog 11');
        this._dialogService.openAlert({ message: 'No se puede programar para fechas anteriores a: ' + formatDate(new Date(this.today), 'yyyy-MM-dd', 'en'), closeButton: 'Aceptar' });
      } else if (this.FechaHora_Sugerida > this.todayFinal2) {
        this.FechaHora_Sugerida = null;
        console.log('Validacion form reprog 12');
        this._dialogService.openAlert({ message: 'No se puede programar para fechas posteriores a: ' + this.todayFinal2, closeButton: 'Aceptar' });
      }
    }
  }

  validarEspacios(input: string, inputText) {
    if (input) {
      if (input.trim().length <= 0) {
        inputText._updateValue('');
        this._dialogService.openAlert({ message: 'No se admite ingresar sólo espacios en blanco.', closeButton: 'Aceptar' });
      } else if (input.trim().length < 3) {
        this._dialogService.openAlert({ message: 'La Justificación debe contener al menos 3 caracteres.', closeButton: 'Aceptar' });
      }
    }
  }

}
