import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core/loading';
import { Router, ActivatedRoute } from '@angular/router';
import { AreasService, IArea, Area } from '../../areas/services/areas.service';
import { TdDialogService } from '@covalent/core/dialogs';
import { ProcesoService, IProceso } from '../../procesos/services/procesos.service';
import { CryptoService } from '../../../services/crypto.services';
import { SolicitudesdemandaService, ISolicitudDem } from '../services/solicitudesdemanda.service';
import { formatDate, getLocaleDateTimeFormat } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipojustificacionService } from '../../services/tipojustificacion.service';
import { GetRangoHorarioFromProceso } from '../../utils/Utils';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class SolicitudesFormComponent implements OnInit {

  isLoading2: boolean = true;
  show: boolean = false;
  Id_Proceso: number;
  Nombre_Proceso: string;
  Cb_ActualAutomaParametros: string;
  Cb_UtilizaParametros: string;
  Id_AreaNegocio: number;
  OPE_SistemaFuente: any[];
  OPE_TipoJustificacion: any[];
  Nombre_AreaNegocio: string;
  Num_InicioRangoCodProceso: number;
  Num_FinRangoCodProceso: number;
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
  Id_Justificacion: string;
  Justificacion_Proceso: string;
  Tiempo_Estimado: number;
  Hora_Inicio: string;
  Hora_Fin: string;

  today: string = formatDate(new Date(), 'yyyy-MM-ddThh:mm', 'en');

  constructor(private _loadingService: TdLoadingService,
    private _route: ActivatedRoute,
    private _dialogService: TdDialogService,
    private _areaService: AreasService,
    private _procesoService: ProcesoService,
    private _cryptoService: CryptoService,
    private _solicitudesdemandaService: SolicitudesdemandaService,
    private _snackBarService: MatSnackBar,
    private _router: Router,
    private _tipoJustificacionService: TipojustificacionService
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: { Id_Proceso: number }) => {
      this.Id_Proceso = params.Id_Proceso;
      let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
     
      if (this.Id_Proceso) {
        this.loadProceso();
      }
    });
  }

  async loadProceso(): Promise<void> {
    try {
      this._loadingService.register('solicitudForm.form');
      this.isLoading2 = true;
      let proceso: IProceso = await this._procesoService.get(this.Id_Proceso).toPromise();
      this.Nombre_Proceso = proceso.Nombre_Proceso;
      this.Cb_ActualAutomaParametros = proceso.Cb_ActualAutomaParametros;
      this.Cb_UtilizaParametros = proceso.Cb_UtilizaParametros;
      this.Id_AreaNegocio = proceso.Id_AreaNegocio;
      this.OPE_SistemaFuente = proceso.OPE_SistemaFuente;
      this.OPE_TipoJustificacion = await this._tipoJustificacionService.query().toPromise();
      this.Tiempo_Estimado = proceso.Num_TiempoEstimadoEjec;
      console.log('Validacion pro 1');
      if (proceso && proceso.OPE_SistemaFuente.length > 0) {
        this.Hora_Inicio = GetRangoHorarioFromProceso(proceso).Hora_Inicio + '';
        this.Hora_Fin = GetRangoHorarioFromProceso(proceso).Hora_fin + '';
        console.log('Validacion pro 2');
      } else {
        this.Hora_Inicio = '00:00';
        this.Hora_Fin = '23:00';
      }

      let area: IArea = await this._areaService.get(this.Id_AreaNegocio).toPromise();
      this.Nombre_AreaNegocio = area.Nombre_AreaNegocio;
      this.Num_FinRangoCodProceso = area.Num_FinRangoCodProceso;
      this.Num_InicioRangoCodProceso = area.Num_InicioRangoCodProceso;

    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió error cargando el proceso', closeButton: 'Aceptar' });
    } finally {
      this.show = true;
      this.isLoading2 = false;
      this._loadingService.resolve('solicitudForm.form');
      console.log('Validacion pro 3');
    }
  }

  async save(): Promise<void> {
    try {

      if (sessionStorage.getItem('Menus')) {
        this.userAprobacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
        let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
        let perfilDec = JSON.parse(perfilcipher.toString());

        this.perfilAprobacion = perfilDec;
      }

      let fechaRevision = formatDate(new Date(), 'yyyy-MM-ddThh:mm', 'en');

      this.solicitudDem = {
        Id_SolicitudEjecucionPorDemanda: this.Id_SolicitudEjecucionPorDemanda,
        FechaHora_FinVentanaSugerida: this.FechaHora_FinVentanaSugerida,
        FechaHora_EjecucionAprobada: this.FechaHora_EjecucionAprobada,
        Id_Proceso: this.Id_Proceso,
        FechaHora_InicioVentanaSugerida: this.FechaHora_InicioVentanaSugerida,
        FechaHora_Sugerida: this.FechaHora_Sugerida,
        FechaHora_RevisionUsuario: fechaRevision,
        FechaHora_RevisionOperador: this.FechaHora_RevisionOperador,
        Nombre_OperadorRevisor: this.Nombre_OperadorRevisor,
        Nombre_RolOperadorRevisor: this.Nombre_RolOperadorRevisor,
        Nombre_UsuarioSolicitante: this.userAprobacion,
        Nombre_RolUsuarioSolicitante: this.perfilAprobacion,
        Desc_JustificacionSolicitud: this.Justificacion_Proceso,
        Id_TipoEjecucionDemanda: this.Id_Justificacion,
        Nombre_AreaNegocio: this.Nombre_AreaNegocio,
        Cb_Activo:'S',
      };

      await this._solicitudesdemandaService.postCreateSolicitudDemanda(this.solicitudDem).toPromise();

      console.log('Validacion pro 4');

      this._snackBarService.open('Solicitud realizada', 'Ok', { duration: 2000 });
      this.cleanForm();
      this.goBack();


    } catch (error) {
      console.log("error", error);
      this._dialogService.openAlert({ message: 'Error solicitando la ejecución del proceso', closeButton: 'Aceptar' });
    } finally {
    }
  }

  goBack(): void {
    this._router.navigate(['/solicitudesdemanda']);
  }

  cleanForm() {
    this.Id_Proceso = null;
    this.show = false;
    this.FechaHora_InicioVentanaSugerida = '';
    this.FechaHora_FinVentanaSugerida = '';
    this.FechaHora_Sugerida = '';
  }

  validarFecha() {
    if (this.FechaHora_InicioVentanaSugerida > this.FechaHora_FinVentanaSugerida) {
      this._dialogService.openAlert({ message: 'La Fecha Inicio no puede ser mayor a la Fecha Fin.', closeButton: 'Aceptar' });
      this.FechaHora_FinVentanaSugerida = '';
    }
  }

  validarFechaSugerida() {
    if (this.Hora_Inicio > this.Hora_Fin) {

    } else {
      if (this.FechaHora_Sugerida < this.FechaHora_InicioVentanaSugerida) {
        this._dialogService.openAlert({ message: 'La Fecha Sugerida no puede ser menor a la Fecha Inicio.', closeButton: 'Aceptar' });
        this.FechaHora_Sugerida = this.FechaHora_FinVentanaSugerida;
      } else if (this.FechaHora_Sugerida > this.FechaHora_FinVentanaSugerida) {
        this._dialogService.openAlert({ message: 'La Fecha Sugerida no puede ser mayor a la Fecha Fin.', closeButton: 'Aceptar' });
        this.FechaHora_Sugerida = this.FechaHora_FinVentanaSugerida;
      }
    }

    this.validarHoraEje();

  }

  validarHora() {
    if (this.FechaHora_InicioVentanaSugerida < this.today) {
      this._dialogService.openAlert({ message: 'La hora inicio no puede ser menor a la hora actual.', closeButton: 'Aceptar' });
      this.FechaHora_InicioVentanaSugerida = '';
    }
  }

  validarHoraEje() {
    let horaTmp = this.FechaHora_Sugerida.substr(11, 6);
    if (this.Hora_Inicio > this.Hora_Fin) {
      if (horaTmp < this.Hora_Inicio && horaTmp > this.Hora_Fin) {
        this.FechaHora_Sugerida = null;
        this._dialogService.openAlert({ message: 'No se admite ingresar fecha de ejecución en el horario: ' + this.Hora_Fin + ' - ' + this.Hora_Inicio, closeButton: 'Aceptar' });
      }
    } else {
      if (horaTmp < this.Hora_Inicio) {
        this.FechaHora_Sugerida = null;
        this._dialogService.openAlert({ message: 'No se admite ingresar fecha de ejecución menor a ' + this.Hora_Inicio, closeButton: 'Aceptar' });
      } else if (horaTmp > this.Hora_Fin) {
        this.FechaHora_Sugerida = null;
        this._dialogService.openAlert({ message: 'No se admite ingresar fecha de ejecución mayor a ' + this.Hora_Fin, closeButton: 'Aceptar' });
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
