import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSelect, Sort } from '@angular/material';
import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { StepState } from '@covalent/core/steps';

import { AreasService, IArea } from '../../areas/services/areas.service';
import { FuentesService, IFuente } from '../../fuentes/services/fuentes.service';
import { ProcesoService, IProceso } from '../services/procesos.service';

import { ProcesoPrerequisitoService, IProcesoPrerequisito } from '../../../services/procesopre.service';
import { RutaPreProcesoService, IRutaPreProceso } from '../../../services/ruta.service';
import { ProcesoTDService, IProcesoTD } from '../../../services/procesotd.service';
import { RelProcesoGestorService, IRelProcesoGestor } from '../../../services/relprocesogestor.service';
import { PeriodicidadService, IPeriodicidad } from '../../../services/periodicidades.service';
import { DiaSemanaService, IDiaSemana } from '../../../services/diassemana.service';
import { ProgramacionProcesoService, IProgramacionProceso } from '../../../services/programacionproceso.service';

import { RelProcesoFuenteService, IRelProcesofuente } from '../../../services/relprocesofuentes.services';
import { RelProcesoDiaSemanaService, IRelProcesoDiaSemana } from '../../../services/relprodiasemana.service';
import { ISolicitudDem, SolicitudesdemandaService } from '../../solicitudesdemanda/services/solicitudesdemanda.service';

import { formatDate, Time } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ProcesosFormComponent implements OnInit, AfterViewInit {

  isLoading: boolean = true;
  isLoadingTd: boolean = true;

  activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
  /*stateStepReq: StepState = StepState.Required;
  stateStepCom: StepState = StepState.Complete;*/
  stateStep1: StepState = StepState.Required;
  stateStep2: StepState = StepState.None;
  stateStep3: StepState = StepState.None;
  stateStep4: StepState = StepState.Required;
  stateStep5: StepState = StepState.None;

  requiredI: boolean = true;

  disabled: boolean = false;
  enable: boolean = true;
  disabledSlide: boolean = false;
  showP12: boolean = false;
  showP3: boolean = false;
  show: boolean = false;
  show4567: boolean = false;
  cb_DiaEspecifico: boolean = false;
  cb_SemanaEspecifica: boolean = false;
  disableS1: boolean = false;
  disableS2: boolean = false;
  showMes: boolean = false;
  showMesList: boolean = false;
  showdemand: boolean = false;
  showMes2: boolean = false;

  action: string;

  Id_Proceso: number;
  Nombre_Proceso: string;
  Desc_Proceso: string;
  Id_AreaNegocio: number;
  Num_TiempoEstimadoEjec: number;
  Cb_ActualAutomaParametros: string;
  Cb_UtilizaParametros: string;
  Fecha_Eliminado: String;
  Cb_PermitirSolicitudOperador: string;
  Cb_RevisionAutomaticaOperador: string;
  Cb_RevisionAutomaticaUsuario: string;

  Cb_ActualAutomaParametros2: boolean;
  Cb_UtilizaParametros2: boolean;
  Cb_PermitirSolicitudOperador2: boolean;
  Cb_RevisionAutomaticaOperador2: boolean;
  Cb_RevisionAutomaticaUsuario2: boolean;

  OPE_AreaNegocio: IArea[];
  OPE_SistemaFuente: any[];
  OPE_ProcesoPrerequisito: IProcesoPrerequisito[];
  OPE_RutaPrerequisitoProceso: IRutaPreProceso[];
  OPE_Rel_Proceso_ProcesoGestor: IRelProcesoGestor[];
  OPE_DiaSemana: IDiaSemana[] = [];
  OPE_ProgramacionPeriodicaProceso: IProgramacionProceso[];
  OPE_PeriodicidadProceso: IPeriodicidad;

  Id_SistemaFuente: any[] = [];
  Id_ProcesoPre: any[] = [];
  ProcesoCD: any[] = [];
  Id_DiaSemana: number;
  Id_ProcesoPrerequisito: number;
  Id_RutaPrerequisito: number;
  Id_ProgramacionPeriodica: number;
  Nombre_DiaSemana: string;

  Id_Periodicidad: number;
  Hora_Ejecucion: Time;
  Num_DiaMes: number;
  Num_MesPeriodo: number;
  Num_Semana: number;
  Nombre_Periodicidad: string;

  procesos: IProceso[];

  procesosSelected = new FormControl();
  procesosPreAdded: IProceso[] = [];
  proceso: IProceso;
  areas: IArea[];
  fuentes: IFuente[];
  fuenteAdded: any[] = [];
  fuenteAdded2: any[] = [];
  fuenteToDel: any[] = [];
  fuenteToDel2: any[] = [];
  //procesoPreAdded: IProcesoPrerequisito[] = [];
  procesoPreAdded: any[] = [];
  procesoPreAdded2: any[] = [];
  rutaPreProAdded: IRutaPreProceso[] = [];
  rutaPreProDeleted: IRutaPreProceso[] = [];

  procesosTD: IProcesoTD[];
  relProcesoGestorAdded: IRelProcesoGestor[] = [];
  relProcesoGestorAdded2: any[] = [];
  periodicidades: IPeriodicidad[] = [];
  diasSemana: IDiaSemana[] = [];
  diasSemanaAdded: IDiaSemana[] = [];
  relProcesoDiaSemanaAdded: IRelProcesoDiaSemana[] = [];

  programacionPeriodicaAdded: IProgramacionProceso[] = [];
  programacionPeriodicaAdded2: IProgramacionProceso[] = [];
  selectedDiaSemana: any[] = [];

  proceso2: any[] = [];
  proceso3: any[] = [];
  proceso4: any[] = [];
  deactive: boolean = false;
  cbCambiaPro: boolean = false;
  cbCambiaFuente: boolean = false;
  cbCambiaProGestor: boolean = false;
  cbCambiaPeriodicidad: boolean = false;
  maxMes: number;
  ideliminar: any[] = [];
  procesoTD2: any[] = [];

  mesesList: any[] = [
    {
      "Num_MesPeriodo": 1,
      "mes_nombre": "Enero"
    },
    {
      "Num_MesPeriodo": 2,
      "mes_nombre": "Febrero"
    },
    {
      "Num_MesPeriodo": 3,
      "mes_nombre": "Marzo"
    },
    {
      "Num_MesPeriodo": 4,
      "mes_nombre": "Abril"
    },
    {
      "Num_MesPeriodo": 5,
      "mes_nombre": "Mayo"
    },
    {
      "Num_MesPeriodo": 6,
      "mes_nombre": "Junio"
    },
    {
      "Num_MesPeriodo": 7,
      "mes_nombre": "Julio"
    },
    {
      "Num_MesPeriodo": 8,
      "mes_nombre": "Agosto"
    },
    {
      "Num_MesPeriodo": 9,
      "mes_nombre": "Septiembre"
    },
    {
      "Num_MesPeriodo": 10,
      "mes_nombre": "Octubre"
    },
    {
      "Num_MesPeriodo": 11,
      "mes_nombre": "Noviembre"
    },
    {
      "Num_MesPeriodo": 12,
      "mes_nombre": "Diciembre"
    }
  ];

  DescripcionRutaArchivo: string;
  nombrePeriodo: string;

  HoraIniFueCom: Time;
  HoraFinFueCom: Time;

  solicitudesDemanda: ISolicitudDem[] = [];

  constructor(
    private _procesoService: ProcesoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _areaService: AreasService, private _fuentesService: FuentesService,
    private _procesoTDService: ProcesoTDService, private _periodicidadService: PeriodicidadService,
    private _diaSemanaService: DiaSemanaService, private _programacionProcesoService: ProgramacionProcesoService,
   
    private _relProcesoFuenteService: RelProcesoFuenteService, private _procesoPrerequisitoService: ProcesoPrerequisitoService,
    //private _relProcesoFuenteService: RelProcesoFuenteService, private _procesoPrerequisitoService: ProcesoPrerequisitoService,
    private _rutaPreProcesoService: RutaPreProcesoService, private _relProcesoGestorService: RelProcesoGestorService,
    private _relProcesoDiaSemanaService: RelProcesoDiaSemanaService,
    private _solicitudesDemandaService: SolicitudesdemandaService,) { }

  toggleCompleteStep1(): void {
    this.stateStep1 = (this.stateStep1 === StepState.Complete ? StepState.Required : StepState.Complete);
  }

  toggleCompleteStep2(): void {
    this.stateStep2 = (this.stateStep2 === StepState.Complete ? StepState.None : StepState.Complete);
  }

  toggleCompleteStep3(): void {
    this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
    this.show = true;
  }

  toggleCompleteStep4(): void {
    this.stateStep4 = (this.stateStep4 === StepState.Complete ? StepState.Required : StepState.Complete);
  }

  ngOnInit() {

    this.loadAreas();
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this.loadProcesos().then(() => {
      this._route.params.subscribe((params: { Id_Proceso: number }) => {
        this.Id_Proceso = params.Id_Proceso;
        if (this.Id_Proceso) {
          this.load();
        }
      });
    });

    this.action == 'add' ? this.disabledSlide = true : this.disabledSlide = false;

  }

  ngAfterViewInit() {
    this.loadFuentes();
    this.loadProcesoTD();
  }

  async save(): Promise<void> {
    try {
      this._loadingService.register('proceso.form');
      this.Cb_ActualAutomaParametros2 == true ? this.Cb_ActualAutomaParametros = 'S' : this.Cb_ActualAutomaParametros = 'N';
      this.Cb_UtilizaParametros2 == true ? this.Cb_UtilizaParametros = 'S' : this.Cb_UtilizaParametros = 'N';
      this.Cb_PermitirSolicitudOperador2 == true ? this.Cb_PermitirSolicitudOperador = 'S' : this.Cb_PermitirSolicitudOperador = 'N';
      this.Cb_RevisionAutomaticaOperador2 == true ? this.Cb_RevisionAutomaticaOperador = 'S' : this.Cb_RevisionAutomaticaOperador = 'N';
      this.Cb_RevisionAutomaticaUsuario2 == true ? this.Cb_RevisionAutomaticaUsuario = 'S' : this.Cb_RevisionAutomaticaUsuario = 'N';

      if (this.action === 'add') {
        this.proceso = {
          Id_Proceso: this.Id_Proceso,
          Nombre_Proceso: this.Nombre_Proceso,
          Desc_Proceso: this.Desc_Proceso,
          Id_AreaNegocio: this.Id_AreaNegocio,
          Num_TiempoEstimadoEjec: this.Num_TiempoEstimadoEjec,
          Cb_ActualAutomaParametros: this.Cb_ActualAutomaParametros,
          Cb_UtilizaParametros: this.Cb_UtilizaParametros,
          Fecha_Eliminado: null,
          Cb_PermitirSolicitudOperador: this.Cb_PermitirSolicitudOperador,
          Cb_RevisionAutomaticaOperador: this.Cb_RevisionAutomaticaOperador,
          Cb_RevisionAutomaticaUsuario: this.Cb_RevisionAutomaticaUsuario,
          Cb_Activo: null,
          OPE_AreaNegocio: this.OPE_AreaNegocio,
          OPE_ProcesoPrerequisito: this.procesoPreAdded2,
          OPE_Rel_Proceso_ProcesoGestor: this.relProcesoGestorAdded,
          OPE_RutaPrerequisitoProceso: this.rutaPreProAdded,
          OPE_SistemaFuente: this.fuenteAdded,
          OPE_ProgramacionPeriodicaProceso: null,
          Nombre_AreaNegocio :null
        };
        console.log(this.proceso);
        await this._procesoService.postCreateProceso(this.proceso).toPromise();
      } else {
        this.proceso = {
          Id_Proceso: this.Id_Proceso,
          Nombre_Proceso: this.Nombre_Proceso,
          Desc_Proceso: this.Desc_Proceso,
          Id_AreaNegocio: this.Id_AreaNegocio,
          Num_TiempoEstimadoEjec: this.Num_TiempoEstimadoEjec,
          Cb_ActualAutomaParametros: this.Cb_ActualAutomaParametros,
          Cb_UtilizaParametros: this.Cb_UtilizaParametros,
          Fecha_Eliminado: null,
          Cb_PermitirSolicitudOperador: this.Cb_PermitirSolicitudOperador,
          Cb_RevisionAutomaticaOperador: this.Cb_RevisionAutomaticaOperador,
          Cb_RevisionAutomaticaUsuario: this.Cb_RevisionAutomaticaUsuario,
          Cb_Activo: null,
          //Nombre_AreaNegocio:this.OPE_AreaNegocio.,
          OPE_AreaNegocio: this.OPE_AreaNegocio,
          OPE_ProcesoPrerequisito: [],
          OPE_Rel_Proceso_ProcesoGestor: [],
          OPE_RutaPrerequisitoProceso: [],
          OPE_SistemaFuente: [],
          OPE_ProgramacionPeriodicaProceso: []
        };


        //Valida si hubo cambios en la edición
        this.cbCambiaFuente ? await this._deleteProcesoFuente(this.Id_Proceso) : this.cbCambiaFuente;
        this.cbCambiaPro ? await this._deleteProcesoPre(this.proceso4) : this.cbCambiaPro;
        this.cbCambiaProGestor ? await this._deleteProcesoGestor(this.procesoTD2) : this.cbCambiaProGestor;

        //Elimina Ruta asociada
        this.ideliminar ? await this._deleteRelProRuta(this.ideliminar) : this.ideliminar;

        this.rutaPreProAdded.forEach((r: IRutaPreProceso) => {
          if (!r.Id_RutaPrerequisito) {
            this._rutaPreProcesoService.postCreateRelProRuta(r).toPromise();
          }
        });

        //Actualiza el proceso
        await this._procesoService.putProceso(this.Id_Proceso, this.proceso).toPromise();

        //si cambia agrega relaciones
        //this.cbCambiaFuente? await this._createRelProcesoFuente(this.fuenteAdded): this.cbCambiaFuente;
        this.cbCambiaPro ? await this._createRelProcesoPre(this.procesoPreAdded2) : this.cbCambiaPro;
        this.cbCambiaProGestor ? await this._createRelProcesoGestor(this.relProcesoGestorAdded) : this.cbCambiaProGestor;
      }
      this._snackBarService.open('Proceso guardado', 'Ok', { duration: 2000 });
      this.goBack();
    } catch (error) {
      this._dialogService.openAlert({ message: 'Error creando el proceso', closeButton: 'Aceptar' });
    } finally {
      this.validarHorarioProgramaciones();
      this._loadingService.resolve('proceso.form');
    }
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('proceso.form');
      let ObjP: IProcesoPrerequisito;
      let proceso: IProceso = await this._procesoService.get(this.Id_Proceso).toPromise();
      let proceso23: IProceso[] = await this._procesoService.staticQueryVista().toPromise();
      let proP: IProcesoPrerequisito[] = await this._procesoPrerequisitoService.query().toPromise();
      let Fuentes: IFuente[]= await this._fuentesService.staticQueryIdProceso(this.Id_Proceso).toPromise();
      
      let PrograP: IProgramacionProceso[]= await this._programacionProcesoService.getProgramacionPeriodicaById(this.Id_Proceso).toPromise();
      
      //getProgramacionPeriodicaById

      
      this.Nombre_Proceso = proceso.Nombre_Proceso;
      this.Desc_Proceso = proceso.Desc_Proceso;
      this.Id_AreaNegocio = proceso.Id_AreaNegocio;
      this.Num_TiempoEstimadoEjec = proceso.Num_TiempoEstimadoEjec;
      this.Cb_ActualAutomaParametros = proceso.Cb_ActualAutomaParametros;
      this.Cb_UtilizaParametros = proceso.Cb_UtilizaParametros;
      this.Fecha_Eliminado = proceso.Fecha_Eliminado;
      this.Cb_PermitirSolicitudOperador = proceso.Cb_PermitirSolicitudOperador;
      this.Cb_RevisionAutomaticaOperador = proceso.Cb_RevisionAutomaticaOperador;
      this.Cb_RevisionAutomaticaUsuario = proceso.Cb_RevisionAutomaticaUsuario;
      
      //carga los procesos prerequisito del objeto original y les asigna el nombre
      this.agregaNombreProcesoPre(proP,proceso23,  this.Id_Proceso);  
      this.CargarDatos(this.Id_Proceso);
      //carga los procesos FWK del objeto original y les asigna el nombre
     
      this.OPE_ProgramacionPeriodicaProceso = PrograP;
      this.OPE_SistemaFuente = Fuentes;
      this.fuenteAdded2 = this.OPE_SistemaFuente;

      //carga las fuentes que vienen en el objeto original
      let fuente2: any;
      if (this.fuenteAdded2) {
        this.fuenteAdded2.forEach((x: IFuente) => {
          fuente2 = {
            Id_SistemaFuente: x.Id_SistemaFuente,
            Nombre_SistemaFuente: x.Nombre_SistemaFuente,
            Id_TipoSistemaFuente: x.Id_TipoSistemaFuente
          };
          this.Id_SistemaFuente.push(x.Id_SistemaFuente);
          this.fuenteAdded.push(fuente2);
        });
      }

    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió error cargando el proceso: ' + error, closeButton: 'Aceptar' });
    } finally {
      //si utiliza parametros habilita actualiza parametros
      if (this.Cb_UtilizaParametros == 'S') {
        this.Cb_UtilizaParametros2 = true;
        this.disabledSlide = false;
      } else {
        this.Cb_ActualAutomaParametros2 = false;
        this.disabledSlide = true;
      }
      this.cbCambiaPro = false;
      this.cbCambiaFuente = false;

      //asigna los valores a los sliders de actualiza parametros y demás
      this.Cb_ActualAutomaParametros == 'S' ? this.Cb_ActualAutomaParametros2 = true : this.Cb_ActualAutomaParametros2 = false;
      this.Cb_PermitirSolicitudOperador == 'S' ? this.Cb_PermitirSolicitudOperador2 = true : this.Cb_PermitirSolicitudOperador2 = false;
      this.Cb_RevisionAutomaticaOperador == 'S' ? this.Cb_RevisionAutomaticaOperador2 = true : this.Cb_RevisionAutomaticaOperador2 = false;
      this.Cb_RevisionAutomaticaUsuario == 'S' ? this.Cb_RevisionAutomaticaUsuario2 = true : this.Cb_RevisionAutomaticaUsuario2 = false;
      this.ngAfterViewInit();
      this.getSolDemandaByProceso(this.Id_Proceso);
      this.isLoading = false;
      this._loadingService.resolve('proceso.form');
    }
  }

  

  async loadAreas(): Promise<void> {
    try {
      this._loadingService.register('areas.list');
      this.areas = await this._areaService.query().toPromise();
    } catch (error) {
      this.areas = await this._areaService.staticQuery().toPromise();
    } finally {
      this._loadingService.resolve('areas.list');
    }
  }

  async loadFuentes(): Promise<void> {
    try {
      this._loadingService.register('fuentes.list');
      this.fuentes = await this._fuentesService.query().toPromise();
    } catch (error) {
      this.fuentes = await this._fuentesService.staticQuery().toPromise();
    } finally {
      this._loadingService.resolve('fuentes.list');
    }
  }

  async loadProcesos(): Promise<void> {

    try {
      this.isLoading = true;
      this._loadingService.register('proceso.form');
      this.procesos = await this._procesoService.staticQueryVista().toPromise();

    } catch (error) {
      this.procesos = await this._procesoService.staticQueryVista().toPromise();

    } finally {
      let index = this.procesos.findIndex(procesof => procesof.Id_Proceso == this.Id_Proceso);

      if (index >= 0) {
        this.procesos.splice(index, 1);
      }
      this._loadingService.resolve('proceso.form');
    }
    const result = new Promise<void>((resolve, reject) => {
      resolve();
    });
    return result;
  }

  async loadProcesoTD(): Promise<void> {
    try {
      this._loadingService.register('procesosTD.list');
      this.isLoadingTd = true;
      let Num_InicioRangoCodProceso: string;
      let Num_FinRangoCodProceso: string;
      let codFWK = "10";
      let areaSelected = this.areas.filter(area => area.Id_AreaNegocio == this.Id_AreaNegocio);

      Num_InicioRangoCodProceso = areaSelected[0].Num_InicioRangoCodProceso.toString();
      Num_FinRangoCodProceso = areaSelected[0].Num_FinRangoCodProceso.toString();

      if (Num_InicioRangoCodProceso > codFWK && Num_FinRangoCodProceso > codFWK) {
        this.procesosTD = await this._procesoTDService.staticQuery(Num_InicioRangoCodProceso, Num_FinRangoCodProceso).toPromise();
      }

    } catch (error) {
    } finally {
      this.agregarProcesoTD(this.procesoTD2);
      this.isLoadingTd = false;
      this._loadingService.resolve('procesosTD.list');
    }
  }

  /**
   * Agrega sistemas fuentes como pre-requisito
   * @param sistemaFuentes 
   */
  agregarFuente(sistemaFuentes: any): void {
    if (this.fuenteAdded) { this.fuenteAdded.splice(0, this.fuenteAdded.length); }
    if (this.fuenteAdded2) { this.fuenteAdded2.splice(0, this.fuenteAdded2.length); }

    if (sistemaFuentes) {
      for (let index = 0; index < sistemaFuentes.length; index++) {
        let fuenteAdd: any;
        this.fuentes.filter((x: IFuente) => {
          if (x.Id_SistemaFuente === sistemaFuentes[index]) {
            fuenteAdd = {
              Id_SistemaFuente: x.Id_SistemaFuente,
              Nombre_SistemaFuente: x.Nombre_SistemaFuente,
              Id_TipoSistemaFuente: x.Id_TipoSistemaFuente
            };
            this.fuenteAdded.push(fuenteAdd);
            this.fuenteAdded2.push(x);
          }
        });
      }
    }
    this.cbCambiaFuente = true;
  }

  horarioFuentesMinMax(): void {
    if (this.fuenteAdded2.length > 0) {
      let fuentehorafinmayor;
      let fuentehorainimenor;
      let fuentehorainimenorN;
      let fuentehorafinmayorN;
      //si solo existe una fuente
      if (this.fuenteAdded2.length == 1) {
        if (this.fuenteAdded2[0].Hora_Inicio > this.fuenteAdded2[0].Hora_Fin) {
          fuentehorafinmayor = this.fuenteAdded2[0];
          fuentehorainimenor = this.fuenteAdded2[0];
        } else if (this.fuenteAdded2[0].Hora_Inicio < this.fuenteAdded2[0].Hora_Fin) {
          fuentehorainimenorN = this.fuenteAdded2[0];
          fuentehorafinmayorN = this.fuenteAdded2[0];
        }
      } else {
        //Fuentes con horario Fecha fin menor a fecha inicio
        let fuentesMayor = this.fuenteAdded2.filter(
          f => f.Hora_Inicio > f.Hora_Fin
        );

        if (fuentesMayor.length > 1) {
          //si contiene más de una fuente
          fuentehorafinmayor = fuentesMayor.reduce(function (prev, curr) {
            if (prev.Hora_Inicio > prev.Hora_Fin &&
              curr.Hora_Inicio > curr.Hora_Fin) {
              return prev.Hora_Fin < curr.Hora_Fin ? prev : curr;
            }
          });

          fuentehorainimenor = fuentesMayor.reduce(function (prev, curr) {
            if (prev.Hora_Inicio > prev.Hora_Fin &&
              curr.Hora_Inicio > curr.Hora_Fin) {
              return prev.Hora_Inicio > curr.Hora_Inicio ? prev : curr;
            }
          });
        } else {
          fuentehorafinmayor = fuentesMayor[0];
          fuentehorainimenor = fuentesMayor[0];
        }

        //Fuentes con horario normal
        let fuentesNormal = this.fuenteAdded2.filter(
          f => (f.Hora_Inicio < f.Hora_Fin)
        );

        let fuentesNormal2;
        if (fuentesNormal.length > 0 && fuentesNormal != null) {
          fuentesNormal2 = fuentesNormal.filter(
            f => (f.Hora_Inicio != '00:00:00' && f.Hora_Fin != '23:59:00')
          );

          if (fuentesNormal2.length > 1 && fuentesNormal2 != null) {
            fuentehorafinmayorN = fuentesNormal2.reduce(function (prev, curr) {
              if (prev.Hora_Inicio < prev.Hora_Fin &&
                curr.Hora_Inicio < curr.Hora_Fin) {
                return prev.Hora_Fin < curr.Hora_Fin ? prev : curr;
              }
            });

            fuentehorainimenorN = fuentesNormal2.reduce(function (prev, curr) {
              if (prev.Hora_Inicio < prev.Hora_Fin &&
                curr.Hora_Inicio < curr.Hora_Fin) {
                return prev.Hora_Inicio > curr.Hora_Inicio ? prev : curr;
              }
            });
          } else {
            fuentehorainimenorN = fuentesNormal2[0];
            fuentehorafinmayorN = fuentesNormal2[0];
          }
        }
      }

      let flagA: Boolean = false;
      let flagN: Boolean = false;

      let horafinA: Time;
      if (fuentehorafinmayor) {
        horafinA = fuentehorafinmayor.Hora_Fin;
      }

      let horainiA: Time;
      if (fuentehorainimenor) {
        horainiA = fuentehorainimenor.Hora_Inicio;
      }

      let horafinN: Time;
      if (fuentehorafinmayorN) {
        horafinN = fuentehorafinmayorN.Hora_Fin;
      }

      let horainiN: Time;
      if (fuentehorainimenorN) {
        horainiN = fuentehorainimenorN.Hora_Inicio;
      }

      if (horafinA != null && horainiA != null) {
        flagA = true;
      };

      if (horafinN != null && horainiN != null) {
        flagN = true;
      };

      //si es horario Normal o Anormal o un mix de horarios
      if (flagA == true && flagN == false) {
        this.HoraIniFueCom = horainiA;
        this.HoraFinFueCom = horafinA;
      } else if (flagN == true && flagA == false) {
        this.HoraIniFueCom = horainiN;
        this.HoraFinFueCom = horafinN;
      } else if (flagA == true && flagN == true) {
        if (horainiA >= horainiN && horafinA <= horafinN) {
          this.HoraIniFueCom = horainiA;
          this.HoraFinFueCom = horafinN;
        } else if (horainiA <= horainiN && horafinA >= horafinN) {
          this.HoraIniFueCom = horainiN;
          this.HoraFinFueCom = horafinN;
        }
      }
    }
  }

  validarHorarioProgramaciones(): void {
    if (this.OPE_ProgramacionPeriodicaProceso != null && this.OPE_ProgramacionPeriodicaProceso.length > 0) {
      this.OPE_ProgramacionPeriodicaProceso.forEach(p => {
        if (p.Fecha_Eliminado == null) {
          if (this.validarHorario(p.Hora_Ejecucion)) {
            if (p.Cb_Activo == 'N') {

            } else {
              p.Cb_Activo = 'N';
              this.actualizarProgramacion(p.Id_ProgramacionPeriodica, p);
            }
          }
        }
      });
    }
  }

  validarHorario(horaEjePro: Time): Boolean {
    let flag = false;
    if (this.HoraIniFueCom > this.HoraFinFueCom) {
      if (horaEjePro < this.HoraIniFueCom && horaEjePro > this.HoraFinFueCom) {
        flag = true;
      }
    } else {
      if (horaEjePro < this.HoraIniFueCom || horaEjePro > this.HoraFinFueCom) {
        flag = true;
      }
    }
    return flag;
  }

  async actualizarProgramacion(Id_ProgramacionPeriodica: number, programacion): Promise<void> {
    try {
      await this._programacionProcesoService.putProgramaconProceso(Id_ProgramacionPeriodica, programacion).toPromise();
    } catch (error) {
      this._dialogService.openAlert({ message: "Ocurrió un error actualizando la programción del proceso afectada: " + error, closeButton: 'Aceptar' });
    }
  }

  convertirHoratoFecha(hora: Time, tipocast: string): Time {
    let datein;
    let horaout: Time;

    switch (tipocast) {
      case 'L':
        datein = formatDate(new Date('2000-01-01 ' + (hora + '').substring(0, 5)), 'yyyy-MM-dd HH:mm', 'en');
        break;
      case 'C':
        datein = formatDate(new Date('2000-01-01 ' + (hora + '')), 'yyyy-MM-dd HH:mm', 'en');
        break;
    }
    horaout = datein.substring(10, 16);
    return horaout;
  }

  async getSolDemandaByProceso(Id_Proceso: number): Promise<void> {
    try {
      this.solicitudesDemanda = await this._solicitudesDemandaService.getSolicitudesByProceso(Id_Proceso).toPromise();
    } catch (error) {
      this._dialogService.openAlert({ message: "Ocurrió un error al consultar las solicitudes por demanda: " + error, closeButton: 'Aceptar' });
    }
  }

  validarHorarioSolicitudes(): void {
    if (this.solicitudesDemanda && this.solicitudesDemanda.length > 0) {
      this.solicitudesDemanda.forEach(s => {
        let fechahoraval;
        s.FechaHora_EjecucionAprobada ? fechahoraval = s.FechaHora_EjecucionAprobada : fechahoraval = s.FechaHora_Sugerida;
        let horaval = ('' + fechahoraval).substr(11, 5);
        let horadef: Time = this.convertirHoraString(horaval, 'C');
        if (this.validarHorario(horadef)) {
          if (s.Cb_Activo == 'N') {

          } else {
            s.Cb_Activo = 'N';
            this.actualizarSolicitud(s.Id_SolicitudEjecucionPorDemanda, s);
          }
        }
      });
    }
  }

  convertirHoraString(hora: string, tipocast: string): Time {
    let datein;
    let horaout: Time;
    switch (tipocast) {
      case 'L':
        datein = formatDate(new Date('2000-01-01 ' + (hora + '').substring(0, 5)), 'yyyy-MM-dd hh:mm', 'en');
        break;
      case 'C':
        datein = formatDate(new Date('2000-01-01 ' + (hora + '')), 'yyyy-MM-dd hh:mm', 'en');
        break;
    }
    horaout = datein.substring(10, 16);
    return horaout;
  }

  async actualizarSolicitud(id: number, solicitud: ISolicitudDem): Promise<void> {
    try {
      await this._solicitudesDemandaService.putSolicitudes(id, solicitud).toPromise();
    } catch (error) {
      this._dialogService.openAlert({ message: "Ocurrió un error actualizando la solicitud por demanda del proceso afectada: " + error, closeButton: 'Aceptar' });
    }
  }

  /**
   * Agrega procesos del FWK al Proceso
   * @param ProcesosFWK 
   */
  agregarProcesoTD(ProcesosFWK: any): void {
    this.relProcesoGestorAdded.splice(0, this.relProcesoGestorAdded.length);
    this.relProcesoGestorAdded2.splice(0, this.relProcesoGestorAdded2.length);
    if (ProcesosFWK) {
      for (let index = 0; index < ProcesosFWK.length; index++) {
        //if(this.procesosTD){
        var nombreProTD;

        this.procesosTD.filter((p: IProcesoTD) => {
          if (p.ProcesoCD == ProcesosFWK[index]) {
            nombreProTD = p.NombreProceso;
          }
        });

        var procesoTDAddName: any = {
          Id_ProcesoGestor: ProcesosFWK[index],
          Id_Proceso: this.Id_Proceso,
          NombreProceso: nombreProTD
        };
        this.relProcesoGestorAdded2.push(procesoTDAddName);

        var procesoTDAdd: IRelProcesoGestor = {
          Id_ProcesoGestor: ProcesosFWK[index],
          Id_Proceso: this.Id_Proceso
        };
        this.relProcesoGestorAdded.push(procesoTDAdd);
        //}
      }
    }
  }

  agregaNombreProcesoTD(relProcesoGestorAdded: any): void {
    relProcesoGestorAdded.forEach((g: IRelProcesoGestor) => {
      this.procesoTD2.push(g.Id_ProcesoGestor);
    });
  }

  cargarIdProcesoTDPre(relProcesoGestorAdded: any): void {
    this.ProcesoCD = relProcesoGestorAdded;
  }

  cambiaProGestor(): void {
    this.cbCambiaProGestor = true;
  }

  /**
   * Agrega procesos como pre-requisito
   * @param procesosPre 
   */
  async agregarProcesoPre(procesosPre: any): Promise<void> {
    this.procesoPreAdded.splice(0, this.procesoPreAdded.length);
    this.procesoPreAdded2.splice(0, this.procesoPreAdded2.length);
    if (procesosPre) {
      for (let index = 0; index < procesosPre.length; index++) {

        var nombreProcesoReq;
        if (this.procesos && this.procesos.length > 0) {
          this.procesos.filter((p: IProceso) => {
            if (p.Id_Proceso == procesosPre[index]) {
              nombreProcesoReq = p.Nombre_Proceso;
            }
          });
        }

        let idProcesoPre: number;

        this.proceso3[index] ? idProcesoPre = this.proceso3[index] : idProcesoPre = idProcesoPre;

        var procesoPreAdd: any[] = [
          {
            Id_ProcesoPrerequisito: idProcesoPre,
            Id_Proceso: this.Id_Proceso,
            Id_ProcesoRequerido: procesosPre[index],
            Nombre_ProcesoRequerido: nombreProcesoReq
          }
        ];

        this.procesoPreAdded.push(procesoPreAdd[0]);

        var procesoPreAdd2: any[] = [
          {
            Id_ProcesoPrerequisito: idProcesoPre,
            Id_Proceso: this.Id_Proceso,
            Id_ProcesoRequerido: procesosPre[index]
          }
        ];
        this.procesoPreAdded2.push(procesoPreAdd2[0]);
      }

    }

  }

  cargarIdProcesoPre(idsProPre: any): void {
    this.Id_ProcesoPre = idsProPre;
  }

  agregaNombreProcesoPre(procesoPreAdded: any, proce: any, id:number): void {
   
    procesoPreAdded.forEach((p: IProcesoPrerequisito) => {
     if(p.Id_Proceso == id)
     {
       
       proce.forEach((p1: IProceso) => {
         if(p.Id_ProcesoRequerido == p1.Id_Proceso)
         {
          this.proceso2.push(p.Id_ProcesoRequerido);
          this.proceso3.push(p.Id_ProcesoPrerequisito);
          this.proceso4.push(p.Id_ProcesoPrerequisito); 
         }
        
      
      });
      
     }
        
      
    });
    this.cargarIdProcesoPre(this.proceso2);   
   this.agregarProcesoPre(this.proceso2);
    
  }

  async CargarDatos(id:number):  Promise<void>  {
    let proP: IProcesoPrerequisito[] = await this._procesoPrerequisitoService.getProPreByProceso(id).toPromise();
    let RelProG: IRelProcesoGestor[]= await this._relProcesoGestorService.query().toPromise();
    let RutaP: IRutaPreProceso[]= await this._rutaPreProcesoService.query().toPromise();
    this.OPE_ProcesoPrerequisito = proP
    //                                  .filter(t=>t.Id_Proceso==id);
    this.OPE_RutaPrerequisitoProceso = RutaP
    //                                       .filter(t=>t.Id_Proceso==id);
    this.OPE_Rel_Proceso_ProcesoGestor = RelProG
                                                .filter(t=>t.Id_Proceso==id);
 
    this.procesoPreAdded2 = this.OPE_ProcesoPrerequisito;
    
    this.rutaPreProAdded = this.OPE_RutaPrerequisitoProceso;
    this.relProcesoGestorAdded = this.OPE_Rel_Proceso_ProcesoGestor;
    if(this.OPE_Rel_Proceso_ProcesoGestor.length)
    {
      this.agregaNombreProcesoTD(this.OPE_Rel_Proceso_ProcesoGestor);
      this.cargarIdProcesoTDPre(this.procesoTD2);
    }
    

  }

  limpiarIds(): void {
    this.proceso3 = [];
    this.cbCambiaPro = true;
  }

  /**
   * Agrega rutas al proceso
   * @param DescRutaArchivo 
   */
  agregarRutaPre(DescRutaArchivo: any) {
    if (DescRutaArchivo && DescRutaArchivo.trim() != '') {
      var rutaPreProcesoAdd: IRutaPreProceso[] = [{
        Desc_RutaArchivo: DescRutaArchivo,
        Id_Proceso: this.Id_Proceso,
        Id_RutaPrerequisito: this.Id_RutaPrerequisito
      }];
      this.rutaPreProAdded.push(rutaPreProcesoAdd[0]);
      this.DescripcionRutaArchivo = '';
    } else {
      this._dialogService.openAlert({ message: 'La ruta no puede estar vacia ', closeButton: 'Aceptar' });
    }
  }

  deleteRuta(DescRutaArchivo: any) {
    let index = this.rutaPreProAdded.findIndex(rutad => rutad.Desc_RutaArchivo == DescRutaArchivo);
    let rutadel: IRutaPreProceso = this.rutaPreProAdded.find(rutad => rutad.Desc_RutaArchivo == DescRutaArchivo);
    this.ideliminar.push(rutadel.Id_RutaPrerequisito);
    //borrar Ruta cuando se guarde el proceso
    //rutadel.Id_RutaPrerequisito? this._rutaPreProcesoService.deleteRelProRuta(rutadel.Id_RutaPrerequisito).toPromise(): rutadel;
    this.rutaPreProAdded.splice(index, 1);
  }

  goBack(): void {
    this._router.navigate(['/procesos']);
  }

  activarForm(usaParam, updateParam) {
    if (usaParam._checked == true) {
      this.disabledSlide = false;
    } else {
      this.disabledSlide = true;
      updateParam._checked = false;
      this.Cb_ActualAutomaParametros2 = false;
    }
  }

  /**
   * Elimina la relacion de proceso con fuentes
   * @param Id_Proceso 
   */
  private async _deleteProcesoFuente(Id_Proceso: number): Promise<void> {
    try {
      await this._relProcesoFuenteService.deleteRelProFuente(Id_Proceso).toPromise();
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error eliminando relación sistema fuente del proceso', closeButton: 'Aceptar' });
    } finally {
      this.cbCambiaFuente ? await this._createRelProcesoFuente(this.fuenteAdded) : this.cbCambiaFuente;
    }
  }
  /**
   * Agrega la nueva relacion proceso Fuentes
   * @param fuentesAdded 
   */
  private async _createRelProcesoFuente(fuentesAdded: any): Promise<void> {
    try {
      let relProcesofuente: IRelProcesofuente;
      let idProceso = parseInt(this.Id_Proceso.toString());
      for (let index = 0; index < fuentesAdded.length; index++) {
        relProcesofuente = {
          Id_SistemaFuente: fuentesAdded[index].Id_SistemaFuente,
          Id_Proceso: idProceso
        };
        this._relProcesoFuenteService.postCreateRelProFuente(relProcesofuente).toPromise();
      }
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error creando relación sistema fuente del proceso', closeButton: 'Aceptar' });
    }
  }
  /**
   * Elimina la relacion proceso con Proceso Pre requisito
   * @param Id_Proceso 
   */
  private async _deleteProcesoPre(procesoPrerequisito: any): Promise<void> {
    try {
      for (let index = 0; index < procesoPrerequisito.length; index++) {

        await this._procesoPrerequisitoService.deleteRelProPre(procesoPrerequisito[index]).toPromise();
      }
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error eliminando relación proceso Prerrequisito del proceso', closeButton: 'Aceptar' });
    }
  }

  /**
   * Crea la relacion proceso con Proceso Pre requisito
   * @param procesosAdded 
   */
  private async _createRelProcesoPre(procesosAdded: IProcesoPrerequisito[]): Promise<void> {
    try {
      for (let index = 0; index < procesosAdded.length; index++) {
        this._procesoPrerequisitoService.postCreateRelProPre(procesosAdded[index]).toPromise();
      }
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error creando relación preoceso Pre Requisito del proceso', closeButton: 'Aceptar' });
    }
  }

  /**
  * Elimina la relacion proceso con Proceso gestor
  * @param Id_Proceso 
  */
  private async _deleteProcesoGestor(idsprocesosTD: any): Promise<void> {
    try {
      for (let index = 0; index < idsprocesosTD.length; index++) {
        await this._relProcesoGestorService.deleteRelProRuta(idsprocesosTD[index], this.Id_Proceso).toPromise();
      }
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error eliminando relación proceso Gestor del proceso', closeButton: 'Aceptar' });
    }
  }

  private async _deleteRelProRuta(ideliminar: any): Promise<void> {
    try {
      for (let index = 0; index < ideliminar.length; index++) {
        await this._rutaPreProcesoService.deleteRelProRuta(ideliminar[index]).toPromise();
      }
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error eliminando relación proceso Gestor del proceso', closeButton: 'Aceptar' });
    }
  }

  /**
   * Crea la relacion proceso con Proceso Gestor
   * @param relProcesoGestorAdded 
   */
  private async _createRelProcesoGestor(relProcesoGestorAdded: IRelProcesoGestor[]): Promise<void> {
    try {
      for (let index = 0; index < relProcesoGestorAdded.length; index++) {
        this._relProcesoGestorService.postCreateRelProRuta(relProcesoGestorAdded[index]).toPromise();
      }
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error creando relación proceso Gestor del proceso', closeButton: 'Aceptar' });
    }
  }

  validarEspacios(input: string, inputText) {
    if (input) {
      if (input.trim().length <= 0) {
        inputText._updateValue('');
        this._dialogService.openAlert({ message: 'No se admite ingresar sólo espacios en blanco.', closeButton: 'Aceptar' });
      }
    }
  }

  validarCero(input: number, inputText) {
    if (input == 0) {
      inputText._updateValue('');
      this._dialogService.openAlert({ message: 'No se admite ingresar valor cero (0).', closeButton: 'Aceptar' });
    }
  }

}
