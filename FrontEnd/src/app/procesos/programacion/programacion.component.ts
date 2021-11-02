import { formatDate, Time } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MatPaginatorIntl, Sort } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { MatTableFilter } from 'mat-table-filter';
import { IProgramacionProceso, ProgramacionProcesoService } from '../../../services/programacionproceso.service';
import { IProceso, ProcesoService } from '../services/procesos.service';
import { PeriodicidadService, IPeriodicidad } from '../../../services/periodicidades.service';
import { DiaSemanaService, IDiaSemana } from '../../../services/diassemana.service';
import { CustomPaginator } from '../../custom/CustomPaginator';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})
export class ProgramacionComponent implements OnInit {

  displayedColumns = ['Nombre_Periodicidad', 'Hora_Ejecucion', 'Cb_Activo', 'Editar', 'Eliminar'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterEntity: programacionProcesoView;
  filterType: MatTableFilter; 

  action: string;
  Id_Proceso: number;
  NombreProceso: string;
  isLoading: boolean;

  programacionProceso: IProgramacionProceso[];
  diasemana: IDiaSemana[];
  programacionProcesoview : IProgramacionProcesoView[] = [];
  filteredProgramacionProceso: IProgramacionProcesoView[];
  dataSource: MatTableDataSource<IProgramacionProcesoView>;
  
  OPE_PeriodicidadProceso: IPeriodicidad;
  OPE_DiaSemana: IDiaSemana[] = [];
  Id_Periodicidad: number;

  Hora_Inicio: Time;
  Hora_Fin: Time;
  Tiempo_Estimado: number;

  constructor(
    private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
    private _procesoService: ProcesoService,
    private _changeDetectorRef: ChangeDetectorRef,
    public  media: TdMediaService, 
    private _programacionProcesoService: ProgramacionProcesoService,
    private _route: ActivatedRoute,
    private _periodicidadService: PeriodicidadService,
    private _diaSemanaService: DiaSemanaService,
    private _router: Router,
  ) { }

  ngOnInit() {
    
    this._titleService.setTitle('Programación de Procesos');

    this._route.params.subscribe((params: {Id_Proceso: number, Nombre_Proceso:string}) => {
      this.Id_Proceso = params.Id_Proceso;
      this.NombreProceso = params.Nombre_Proceso;
      if (this.Id_Proceso && this.NombreProceso) {
        this.filterEntity = new programacionProcesoView();
        this.filterType = MatTableFilter.ANYWHERE;
        this.load();
      }
    });    
  }
  
  async load(): Promise<void> {
    try {
      this._loadingService.register('programacionproceso.list');
      this.isLoading = true;
      this.programacionProceso = await this._programacionProcesoService.getprogramacionprocesoById(this.Id_Proceso, this.NombreProceso).toPromise();
      this.diasemana = await this._diaSemanaService.getprogramacionprocesoById(this.Id_Proceso, this.NombreProceso).toPromise();    
     
      if(this.programacionProceso.length > 0){
        this.loadProgProcView(this.programacionProceso,this.diasemana);
        
        this.Id_Periodicidad = this.programacionProceso[0].Id_Periodicidad;
        
      }
    }catch(error){
      console.log(error);
    }finally{
      this.filteredProgramacionProceso = Object.assign([], this.programacionProcesoview);
      this.dataSource = new MatTableDataSource(this.filteredProgramacionProceso);
      this.isLoading = false;
      this.afterViewInit();
      this._loadingService.resolve('programacionproceso.list');
    }
  }

  afterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'Hora_Ejecucion', direction: 'asc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  /*
  *Proceso que carga la interface que muestra la tabla de programaciones
  */
  loadProgProcView(programacionProceso: IProgramacionProceso[], isemana : IDiaSemana[]): void {
    
    let progproview : IProgramacionProcesoView; 
    let Nombre_DiaSemana;
    let Id_DiaSemana;
    let Nombre_Periodicidad;
    let CbActivo;
    this.OPE_DiaSemana = isemana;
    if(this.OPE_DiaSemana.length > 0){
      Id_DiaSemana = this.OPE_DiaSemana[0].Id_DiaSemana;
      Nombre_DiaSemana = this.OPE_DiaSemana[0].Nombre_DiaSemana;
    }else{
      Nombre_DiaSemana = null;
      Id_DiaSemana = null;
    }
    programacionProceso.forEach((p: IProgramacionProceso) => {
      this.OPE_PeriodicidadProceso = p.OPE_PeriodicidadProceso;
      
      /*
      this.OPE_DiaSemana = p.OPE_DiaSemana;
      if(this.OPE_DiaSemana.length > 0){
        Id_DiaSemana = this.OPE_DiaSemana[0].Id_DiaSemana;
        Nombre_DiaSemana = this.OPE_DiaSemana[0].Nombre_DiaSemana;
      }else{
        Nombre_DiaSemana = null;
        Id_DiaSemana = null;
      }
      */
      if(this.OPE_PeriodicidadProceso){
        Nombre_Periodicidad = p.Nombre_Periodicidad;
      }else{
        Nombre_Periodicidad = null;
      }

      p.Cb_Activo=='S'?CbActivo='Activo':CbActivo='Inactivo';

      //let Cb_Afectado : string = this.validarHoraEje(p.Hora_Ejecucion);

      progproview = {
        Id_Proceso : p.Id_Proceso,
        NombreProceso : this.NombreProceso,
        Fecha_Eliminado : p.Fecha_Eliminado,
        Hora_Ejecucion : p.Hora_Ejecucion,
        Id_Periodicidad : p.Id_Periodicidad,
        Id_ProgramacionPeriodica : p.Id_ProgramacionPeriodica,
        Nombre_Periodicidad : Nombre_Periodicidad,
        Nombre_DiaSemana : Nombre_DiaSemana,
        Cb_Activo : CbActivo,
        Id_DiaSemana : Id_DiaSemana,
        Num_DiaMes : p.Num_DiaMes,
        Num_MesPeriodo : p.Num_MesPeriodo,
        Num_Semana : p.Num_Semana,
      
        //Cb_Afectado : Cb_Afectado
      }
      this.programacionProcesoview.push(progproview);
    });
  }

  delete(Id_ProgramacionPeriodica: number, programacion: IProgramacionProceso): void {
    let FechaEliminado = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    let cbactivo = programacion.Cb_Activo;
    programacion.Fecha_Eliminado = FechaEliminado;
    cbactivo=='Activo'? programacion.Cb_Activo = 'S': programacion.Cb_Activo = 'N';
    this._dialogService
      .openConfirm({message: '¿Está seguro de borrar esta programación?',
      acceptButton: 'Aceptar', cancelButton :'Cancelar'})
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          this._softDelete(Id_ProgramacionPeriodica, programacion);
        }
      });
  }

  private async _softDelete(Id_ProgramacionPeriodica : number, programacion: IProgramacionProceso) :Promise<void>{ 
    try {
      this._loadingService.register('programacionproceso.list');    
      await this._programacionProcesoService.putProgramaconProceso(Id_ProgramacionPeriodica, programacion).toPromise();
      this.programacionProcesoview = this.programacionProcesoview.filter((programacionProcesoview: IProgramacionProcesoView) => {
        return programacionProcesoview.Id_ProgramacionPeriodica !== Id_ProgramacionPeriodica;
      });
      this.filteredProgramacionProceso = this.filteredProgramacionProceso.filter((programacionProcesoview: IProgramacionProcesoView) => {
        return  programacionProcesoview.Id_ProgramacionPeriodica !== Id_ProgramacionPeriodica;
      });
      this.dataSource = new MatTableDataSource(this.filteredProgramacionProceso);
      this._changeDetectorRef.detectChanges();
      this._snackBarService.open('Programación del Proceso Eliminada', 'Ok',{duration:2000});
    } catch (error) {
      this._dialogService.openAlert({message: 'Ocurrió un error eliminando la programación proceso', closeButton :'Aceptar'});
    } finally {
      this._loadingService.resolve('programacionproceso.list');
    }
  }

  async getProcesoById(): Promise<void> {
    try{
      let proceso: IProceso = await this._procesoService.staticQueryId(this.Id_Proceso).toPromise();
      this.Tiempo_Estimado = proceso.Num_TiempoEstimadoEjec;
      if(proceso.OPE_SistemaFuente.length > 0){
        let test = proceso.OPE_SistemaFuente.reduce(function(prev, curr) {
          return prev.OPE_HorarioSistemaFuente[0].Hora_Fin < curr.OPE_HorarioSistemaFuente[0].Hora_Fin ? prev : curr;
        });

        let test2 = proceso.OPE_SistemaFuente.reduce(function(prev, curr) {
          return prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Inicio ? prev : curr;
        });

        this.Hora_Inicio = test2.OPE_HorarioSistemaFuente[0].Hora_Inicio;
        this.Hora_Fin = test.OPE_HorarioSistemaFuente[0].Hora_Fin;
      }
    }catch(error){

    }finally{
      this.load();
    }
  }

  validarHoraEje(Hora_Ejecucion: Time) : string{
   
    if(Hora_Ejecucion < this.Hora_Inicio){
      return 'S';
    }else if(Hora_Ejecucion > this.Hora_Fin){
      return 'S';
    }else{
      return 'N';
    }
  }

  goBack(): void {
    this._router.navigate(['/procesos']);
  }

}

export interface IProgramacionProcesoView{
  Id_ProgramacionPeriodica: number;
  Id_Periodicidad: number;
  Nombre_Periodicidad: string;
  Num_DiaMes: number;
  Num_MesPeriodo: number;
  Num_Semana: number;
  Hora_Ejecucion: Time;
  Id_Proceso: number;
  Fecha_Eliminado: String;
  NombreProceso: string;
  Cb_Activo: string;
  Id_DiaSemana: number;
  Nombre_DiaSemana: string;
  //Cb_Afectado: string;
}

export class programacionProcesoView{
  Id_ProgramacionPeriodica: number;
  Id_Periodicidad: number;
  Nombre_Periodicidad: string;
  Num_DiaMes: number;
  Num_MesPeriodo: number;
  Num_Semana: number;
  Hora_Ejecucion: Time;
  Id_Proceso: number;
  Fecha_Eliminado: String;
  NombreProceso: string;
  Cb_Activo: string;
  Id_DiaSemana: number;
  Nombre_DiaSemana: string;
  //Cb_Afectado: string;
}