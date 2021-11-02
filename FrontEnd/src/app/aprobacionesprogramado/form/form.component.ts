import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSelect, MatPaginator, MatTableDataSource } from '@angular/material';
import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';

import { AprobacionesprogramadoService, IAprobacion } from '../services/aprobacionesprogramado.service';
import { RutaPreProcesoService, IRutaPreProceso } from '../../../services/ruta.service';
import { EjecucionesService, IEjecuciones } from '../../../services/ejecuciones.service';
import { CryptoService } from '../../../services/crypto.services';
import { formatDate } from '@angular/common';

import { LogsService, ILogs } from '../../../services/logs.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class AprobacionesFormComponent implements OnInit {

  Id_Proceso: number;
  Id_ProgramacionPeriodica: number;
  FechaHora_RevisionOperador: string;
  Id_AprobacionProgramacionPeriodica: number;
  Nombre_OperadorRevisor: string;
  Nombre_RolOperadorRevisor: string;
  Fecha_EjecucionAprobada: String;
  disabled: boolean;
  Fecha: string;

  aprobacion: IAprobacion;
  procesosPrerequisito: IEjecuciones[];
  rutaPrerequisitoProceso: IRutaPreProceso[];

  userAprobacion: string;
  perfilAprobacion: string;

  procesoPreAdded: any[] = [];

  action: string;
  Cb_AprobacionProceso: boolean = false;
  Cb_AprobacionRuta: boolean = false;
  expand: boolean = false;
  today: Date = new Date();

  Nombre_AreaNegocio: string;

  logs: ILogs[];
  filteredLogs: ILogs[];
  dataSource: MatTableDataSource<ILogs>;

  estadoPre: any;
  counterEstado: number;
  enableSlider: boolean = false;
  DisabledAR: boolean = false;
  verificarEstado: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _aprobacionesprogramadoService: AprobacionesprogramadoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _rutaPreProcesoService: RutaPreProcesoService,
    private _logsService: LogsService,
    private _ejecucionesService: EjecucionesService, private _cryptoService: CryptoService) { }

  ngOnInit() {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[3].path : 'add');
    });
    this._route.params.subscribe((params: { Id_Proceso: number, Id_ProgramacionPeriodica: number, Fecha: string, Nombre_AreaNegocio: string }) => {
      this.Id_Proceso = params.Id_Proceso;
      this.Id_ProgramacionPeriodica = params.Id_ProgramacionPeriodica;
      this.Fecha = params.Fecha;
      this.Nombre_AreaNegocio = params.Nombre_AreaNegocio;
      if (this.Id_Proceso) {
        this.afterViewInit();
        this.expand = true;
      }
    });
  }

  afterViewInit() {
    this.loadProcesos();
    this.loadRutaPre();
  }

  goBack(): void {
    this._router.navigate(['/aprobacionesprogramado']);
  }

  async aprobar(): Promise<void> {
    try {
      if (this.Cb_AprobacionProceso === false || this.Cb_AprobacionRuta === false) {
        this._dialogService.openAlert({ message: 'Para realizar esta acción debe aprobar los procesos y las rutas pre-requisito', closeButton: 'Aceptar' });
        console.log('Validacion form apr 1'); 
      }
      else {

        if (sessionStorage.getItem('Menus')) {
          this.userAprobacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
          let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
          let perfilDec = JSON.parse(perfilcipher.toString());

          this.perfilAprobacion = perfilDec;
          console.log('Validacion form apr 2'); 
        }

        let fechaRevision = formatDate(new Date(), 'yyyy-MM-ddThh:mm', 'en');

        this.aprobacion = {
          Id_AprobacionProgramacionPeriodica: this.Id_AprobacionProgramacionPeriodica,
          FechaHora_RevisionOperador: fechaRevision,
          Fecha_EjecucionAprobada: this.Fecha,
          Id_ProgramacionPeriodica: this.Id_ProgramacionPeriodica,
          Nombre_OperadorRevisor: this.userAprobacion,
          Nombre_RolOperadorRevisor: this.perfilAprobacion
        };

        if (this.action === 'add') {
        } else {
          await this._aprobacionesprogramadoService.postCreateAprobacion(this.aprobacion).toPromise();
          console.log('Validacion form apr 3'); 
        }
        this._snackBarService.open('Aprobación realizada', 'Ok', { duration: 2000 });
        this.goBack();
      }
    } catch (error) {
      this._dialogService.openAlert({ message: 'Error aprobando la ejecución del proceso', closeButton: 'Aceptar' });
    } finally {
    }
  }

  async loadAprobaciones(): Promise<void> {
    try {
      let aprobacion: IAprobacion = await this._aprobacionesprogramadoService.get(this.Id_AprobacionProgramacionPeriodica).toPromise();
      this.Id_ProgramacionPeriodica = aprobacion.Id_ProgramacionPeriodica;
      this.FechaHora_RevisionOperador = aprobacion.FechaHora_RevisionOperador;
      this.Id_AprobacionProgramacionPeriodica = aprobacion.Id_AprobacionProgramacionPeriodica;
      this.Nombre_OperadorRevisor = aprobacion.Nombre_OperadorRevisor;
      this.Nombre_RolOperadorRevisor = aprobacion.Nombre_RolOperadorRevisor;
      this.Fecha_EjecucionAprobada = aprobacion.Fecha_EjecucionAprobada;
      console.log('Validacion form apr 4'); 
    } catch (error) {
    } finally {

    }
  }

  async loadProcesos(): Promise<void> {
    try {
      this._loadingService.register('procesosPrerequisito.list');
      this.procesosPrerequisito = await this._ejecucionesService.getProPreByProceso(this.Id_Proceso).toPromise();
      this.counterEstado = 0;
      console.log('Validacion form apr 4'); 
      let count = 0;
      this.procesosPrerequisito.forEach(x => {
        this.estadoPre = (x.Nombre_EstadoOperadorEjecucionProceso !== null) ? x.Nombre_EstadoOperadorEjecucionProceso : (x.Nombre_EstadoEjecucionInformatica !== null) ? x.Nombre_EstadoEjecucionInformatica : (x.Cb_ProcesoEjecutado === 'N') ? "No Ejecutado" : "Vencido";
   
        (this.estadoPre === "Certificado") ? this.counterEstado++ : this.counterEstado;

          /* Aprueba los procesos exitosos por defecto y deshabilita cuando el estado es no ejecutado.
          
          if(this.estadoPre != "No Ejecutado" && count == 0 ){
          this.verificarEstado = true;
        }else{
          this.verificarEstado = false;
          count++;
        } */
         // this.verificarEstado =  (x.Nombre_EstadoEjecucionInformatica === "Exitoso") ? true : false;

        if(x.Nombre_EstadoEjecucionInformatica != "No Ejecutado" && count == 0){
          this.verificarEstado = true;
        }else{
          this.verificarEstado = false;
          count++;
        }
        if(x.Nombre_EstadoEjecucionInformatica == "Exitoso" && count == 0){
          this.verificarEstado = false;
          count++;
        }else{
          this.verificarEstado = true;
        }

      });
      (this.counterEstado == this.procesosPrerequisito.length) ? this.Cb_AprobacionProceso = true : this.Cb_AprobacionProceso = false;
    } catch (error) {
    } finally {
      this._loadingService.resolve('procesosPrerequisito.list');
    }
  }

  async loadRutaPre(): Promise<void> {
    try {
      this._loadingService.register('logs.list');
      this.logs = await this._logsService.GetArchivosByPath(this.Nombre_AreaNegocio, this.Id_Proceso).toPromise();
      this.Cb_AprobacionRuta = this.logs.length == 0;
      this.DisabledAR = this.logs.length == 0;
    } catch (error) {
      this.DisabledAR = true;
      this._dialogService.openAlert({ message: 'Error: La(s) rutas(s) No Existe(n). Por favor corregir el proceso.', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('logs.list');
    }
  }

}
