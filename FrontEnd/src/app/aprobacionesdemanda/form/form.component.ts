import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSelect, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';

import { AprobacionesdemandaService, IAprobacionDem } from '../services/aprobacionesdemanda.service';
import { RutaPreProcesoService, IRutaPreProceso } from '../../../services/ruta.service';
import { EjecucionesService, IEjecuciones } from '../../../services/ejecuciones.service';
import { CryptoService } from '../../../services/crypto.services';
import { ProcesoService, IProceso } from '../../procesos/services/procesos.service';
import { formatDate, Time } from '@angular/common';
import { GetRangoHorarioFromProceso } from '../../utils/Utils';

import { LogsService, ILogs } from '../../../services/logs.service';
import { CustomPaginator } from '../../custom/CustomPaginator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})
export class AprobacionesDemFormComponent implements OnInit {

  Id_SolicitudEjecucionPorDemanda: number;
  FechaHora_FinVentanaSugerida: string;
  FechaHora_EjecucionAprobada: string;
  Id_Proceso: number;
  FechaHora_InicioVentanaSugerida: string;
  FechaHora_Sugerida: String;
  FechaHora_RevisionUsuario: string;
  FechaHora_RevisionOperador: string;
  Nombre_OperadorRevisor: string;
  Nombre_RolOperadorRevisor: string;
  Nombre_UsuarioSolicitante: string;
  Nombre_RolUsuarioSolicitante: string;

  Fecha: string;
  Hora_Ejecucion: Time;

  FechaHora_Sugerida2: string;

  procesosPrerequisito: IEjecuciones[];
  rutaPrerequisitoProceso: IRutaPreProceso[];
  aprobacionDemanda: IAprobacionDem;
  aprobacionDemandaPut: IAprobacionDem;

  userAprobacion: string;
  perfilAprobacion: string;

  procesoPreAdded: any[] = [];

  action: string;
  Cb_AprobacionProceso: boolean = false;
  Cb_AprobacionRuta: boolean = false;
  expand: boolean = false;
  today: string = formatDate(new Date(), 'yyyy-MM-ddThh:mm', 'en');
  today2: string = formatDate(new Date(), 'yyyy-MM-ddThh:mm', 'en');
  disabled: boolean;

  Nombre_AreaNegocio: string;

  logs: ILogs[];
  filteredLogs: ILogs[];
  dataSource: MatTableDataSource<ILogs>;
  DisabledAR: boolean = false;

  Hora_Inicio: string;
  Hora_Fin: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _aprobacionesdemandaService: AprobacionesdemandaService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _rutaPreProcesoService: RutaPreProcesoService,
    private _logsService: LogsService,
    private _ejecucionesService: EjecucionesService, private _cryptoService: CryptoService,
    private _procesoService: ProcesoService,
  ) { }

  ngOnInit() {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[2].path : 'add');
    });
    this._route.params.subscribe((params: { Id_Proceso: number, Id_SolicitudEjecucionPorDemanda: number, Nombre_AreaNegocio: string }) => {
      this.Id_Proceso = params.Id_Proceso;
      this.Id_SolicitudEjecucionPorDemanda = params.Id_SolicitudEjecucionPorDemanda;
      this.Nombre_AreaNegocio = params.Nombre_AreaNegocio;

      if (this.Id_Proceso) {
        this.afterViewInit();
        this.expand = true;
        this.loadAprobacionDemanda();
      }

    });
  }

  afterViewInit() {
    this.loadProcesos();
    this.loadRutaPre();
  }

  goBack(): void {
    this._router.navigate(['/aprobacionesdemanda']);
  }

  async loadAprobacionDemanda(): Promise<void> {
    try {
      this.aprobacionDemanda = await this._aprobacionesdemandaService.get(this.Id_SolicitudEjecucionPorDemanda).toPromise();
      console.log('Validacion aprobacion demanda 1');
      if (this.aprobacionDemanda.Cb_Activo == 'N') {
        console.log('Validacion aprobacion demanda 2');
        this._dialogService
          .openAlert({
            message: 'Esta solicitud se encuentra inactiva',

            closeButton: 'Aceptar'
          })
          .afterClosed().toPromise().then((confirm: boolean) => {
            this.goBack();
          });
      }
      console.log('Validacion aprobacion demanda 3');
     /* console.log(this.aprobacionDemanda.FechaHora_Sugerida)
      console.log(this.today2)*/
      //validacion hora
      if (this.aprobacionDemanda.FechaHora_Sugerida < this.today2) {

      console.log('Validar aprobación demanda - Fecha Sugerida',this.aprobacionDemanda.FechaHora_Sugerida)
      console.log('Validar today2', this.today2)
        
        this._dialogService
          .openAlert({
            message: 'Esta solicitud se encuentra vencida',

            closeButton: 'Aceptar'
          })
          .afterClosed().toPromise().then((confirm: boolean) => {
            this.goBack();
          });
      }


      this.Id_SolicitudEjecucionPorDemanda = this.aprobacionDemanda.Id_SolicitudEjecucionPorDemanda;
      this.FechaHora_FinVentanaSugerida = this.aprobacionDemanda.FechaHora_FinVentanaSugerida;
      this.FechaHora_EjecucionAprobada = this.aprobacionDemanda.FechaHora_EjecucionAprobada;
      this.Id_Proceso = this.aprobacionDemanda.Id_Proceso;
      this.FechaHora_InicioVentanaSugerida = this.aprobacionDemanda.FechaHora_InicioVentanaSugerida;
      this.FechaHora_RevisionUsuario = this.aprobacionDemanda.FechaHora_RevisionUsuario;
      this.FechaHora_RevisionOperador = this.aprobacionDemanda.FechaHora_RevisionOperador;
      this.Nombre_OperadorRevisor = this.aprobacionDemanda.Nombre_OperadorRevisor;
      this.Nombre_RolOperadorRevisor = this.aprobacionDemanda.Nombre_RolOperadorRevisor;
      this.Nombre_UsuarioSolicitante = this.aprobacionDemanda.Nombre_UsuarioSolicitante;
      this.Nombre_RolUsuarioSolicitante = this.aprobacionDemanda.Nombre_RolUsuarioSolicitante;

      this.FechaHora_Sugerida = formatDate(new Date(this.aprobacionDemanda.FechaHora_Sugerida.toString()), 'yyyy-MM-ddTHH:mm', 'en');
      this.FechaHora_Sugerida2 = this.aprobacionDemanda.FechaHora_Sugerida.toString();

      let proceso: IProceso = await this._procesoService.get(this.Id_Proceso).toPromise();
      if (proceso && proceso.OPE_SistemaFuente.length > 0) {
        this.Hora_Inicio = GetRangoHorarioFromProceso(proceso).Hora_Inicio + '';
        this.Hora_Fin = GetRangoHorarioFromProceso(proceso).Hora_fin + '';
      } else {
        this.Hora_Inicio = '00:00';
        this.Hora_Fin = '23:00';
      }

    } catch (error) {
    } finally {
    }
  }

  async loadProcesos(): Promise<void> {
    try {
      this._loadingService.register('procesosPrerequisito.list');
      this.procesosPrerequisito = await this._ejecucionesService.getProPreByProceso(this.Id_Proceso).toPromise();
    } catch (error) {
    } finally {
      this._loadingService.resolve('procesosPrerequisito.list');
    }
  }

  async loadRutaPre(): Promise<void> {
    try {
      this._loadingService.register('logs.list');
      this.logs = await this._logsService.GetArchivosByPath(this.Nombre_AreaNegocio, this.Id_Proceso).toPromise();
    } catch (error) {
      this.DisabledAR = true;
      this._dialogService.openAlert({ message: 'Error: La(s) rutas(s) No Existe(n). Por favor corregir el proceso.', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('logs.list');
    }
  }

  async aprobar(): Promise<void> {
   
    try {
      if (this.Cb_AprobacionProceso === false || this.Cb_AprobacionRuta === false) {
        this._dialogService.openAlert({ message: 'Para realizar esta acción debe aprobar los procesos y las rutas pre-requisito', closeButton: 'Aceptar' });
      } else {

        if (sessionStorage.getItem('Menus')) {
          this.userAprobacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
          let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
          let perfilDec = JSON.parse(perfilcipher.toString());

          this.perfilAprobacion = perfilDec;
        }
        let currentTime: string = formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en');
        console.log('Validacion 1')
        console.log(this.aprobacionDemanda.FechaHora_Sugerida)
        console.log(currentTime)
        if (this.aprobacionDemanda.FechaHora_Sugerida < currentTime) {
          this._dialogService
            .openAlert({
              message: 'Esta solicitud se encuentra vencida',

              closeButton: 'Aceptar'
            })
            .afterClosed().toPromise().then((confirm: boolean) => {
              this.goBack();
            });
        }

        let fechaRevision = formatDate(new Date(), 'yyyy-MM-ddThh:mm', 'en');

        this.aprobacionDemandaPut = {
          Id_SolicitudEjecucionPorDemanda: this.Id_SolicitudEjecucionPorDemanda,
          FechaHora_FinVentanaSugerida: this.FechaHora_FinVentanaSugerida,
          FechaHora_EjecucionAprobada: this.FechaHora_Sugerida.toString(),
          Id_Proceso: this.Id_Proceso,
          FechaHora_InicioVentanaSugerida: this.FechaHora_InicioVentanaSugerida,
          FechaHora_Sugerida: this.FechaHora_Sugerida2,
          FechaHora_RevisionUsuario: this.FechaHora_RevisionUsuario,
          FechaHora_RevisionOperador: fechaRevision,
          Nombre_OperadorRevisor: this.userAprobacion,
          Nombre_RolOperadorRevisor: this.perfilAprobacion,
          Nombre_UsuarioSolicitante: this.Nombre_UsuarioSolicitante,        
          Nombre_RolUsuarioSolicitante: this.Nombre_RolUsuarioSolicitante
          
        };
        if (this.action === 'add') {
        } else {

          await this._aprobacionesdemandaService.putAprobacionDem(this.Id_SolicitudEjecucionPorDemanda, this.aprobacionDemandaPut).toPromise();
        }
        this._snackBarService.open('Aprobación realizada', 'Ok', { duration: 2000 });
        this.goBack();
      }
    } catch (error) {
      this._dialogService.openAlert({ message: 'Error aprobando la ejecución del proceso: ' + error, closeButton: 'Aceptar' });
    } finally {
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
        this._dialogService.openAlert({ message: 'No se admite ingresar fecha de ejecución menor a' + this.Hora_Inicio, closeButton: 'Aceptar' });
      } else if (horaTmp > this.Hora_Fin) {
        this.FechaHora_Sugerida = null;
        this._dialogService.openAlert({ message: 'No se admite ingresar fecha de ejecución mayor a ' + this.Hora_Fin, closeButton: 'Aceptar' });
      }
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

}
