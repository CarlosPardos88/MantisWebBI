import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdMediaService } from '@covalent/core/media';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { CustomPaginator } from '../custom/CustomPaginator';
import { MatTableFilter } from 'mat-table-filter';

import { ProcesoService, IProceso, Proceso } from './services/procesos.service';
import { ProgramacionProcesoService, IProgramacionProceso } from '../../services/programacionproceso.service';
import { formatDate } from '@angular/common';
import { Area } from '../areas/services/areas.service';
import { isThisTypeNode } from 'typescript';

import { CryptoService } from '../../services/crypto.services';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})
export class ProcesosComponent implements OnInit {

  displayedColumns = ['Nombre_Proceso', 'Desc_Proceso', 'Nombre_AreaNegocio', 'Num_TiempoEstimadoEjec',
    'Cb_UtilizaParametros', 'Cb_ActualAutomaParametros', 'Programación', 'Editar', 'Eliminar'];
  filterEntity: Proceso;
  filterType: MatTableFilter;
  dataSource: MatTableDataSource<IProceso>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  procesos: IProceso[];
  filteredProcesos: IProceso[];
  isLoading: boolean = true;
  isDeleting: boolean = false;
  //nuevas variables filtrado por area
  areafiltro: string;

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
    private _procesoService: ProcesoService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,
    private _programacionProcesoService: ProgramacionProcesoService,
    private _cryptoService: CryptoService,
  ) { }

  ngOnInit() {
    this._titleService.setTitle('Procesos');
    this.filterEntity = new Proceso();
    //this.filterEntity.OPE_AreaNegocio = new Area();
    this.filterType = MatTableFilter.ANYWHERE;
    this.load();
  }

  filterProcesos(filterValue: string = '', columna: string = '') {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue + ',' + columna;
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('procesos.list');
      this.isLoading = true;
      this.procesos = await this._procesoService.staticQueryVista().toPromise();
  

    } catch (error) {
      this.procesos = await this._procesoService.staticQueryVista().toPromise();
    } finally {
      this.filteredProcesos = Object.assign([], this.procesos);
     // this.dataSource = new MatTableDataSource(this.filteredProcesos);
       //Filtrado procesos area
      this.areafiltro = this._cryptoService.decryptText(sessionStorage.getItem('Areas'));
      let areaObj: any[] = JSON.parse(this.areafiltro);
      let area: string= "";
      console.log('Validacion mod ejecuciones 1', areaObj);
      
      if (Array.isArray(areaObj)) {
        area = areaObj[0];
        console.log('Validacion mod ejecuciones 2', area,this.areafiltro);
      } else {
        let areaObj: any[] = JSON.parse(this.areafiltro);
        areaObj.forEach((a: any) => {
          area = a.area;
          console.log('Validacion mod ejecuciones 3', area);
        });
      }
      /*
      if (area.length==0 ){
        console.log('Validacion mod ejecuciones 3', area);
        this.dataSource = new MatTableDataSource(this.filteredProcesos);
      }else{
        console.log('Validacion mod ejecuciones 3', area);
        this.dataSource = new MatTableDataSource(this.filteredProcesos.filter((x)=>{ return x.Id_AreaNegocio == Number(area) }  ))
      }*/
      area ? this.dataSource = new MatTableDataSource(this.filteredProcesos.filter((x)=>{ return x.Nombre_AreaNegocio == (area) }  )): this.dataSource = new MatTableDataSource(this.filteredProcesos);
      //this._changeDetectorRef.detectChanges();
      this.isLoading = false;
      this.afterViewInit();
      this._loadingService.resolve('procesos.list');
    }
  }

  afterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //sort no case sensitive way
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string' && sortHeaderId !== 'Nombre_AreaNegocio') {
        return data[sortHeaderId].toLocaleLowerCase();
      } else {
        switch (sortHeaderId) {
          case 'Nombre_AreaNegocio':
            return data.Nombre_AreaNegocio;
        }
      }
      return data[sortHeaderId];
    };

  }

  async delete(Id_Proceso: number, proceso: IProceso) {
    
    let FechaEliminado = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    proceso.Fecha_Eliminado = FechaEliminado;
    this._dialogService
      .openConfirm({
        message: '¿Está seguro de borrar este proceso?',
        acceptButton: 'Aceptar', cancelButton: 'Cancelar'
      })
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          this.isDeleting = true;
          this._softDeteleProcess(Id_Proceso, proceso, FechaEliminado);
        }
      });
  }

  async _softDeteleProcess(Id_Proceso: number, proceso: IProceso, FechaEliminado) {
    this._loadingService.register('procesos.list');
    let proP: IProgramacionProceso;
    let pp: IProgramacionProceso[] = await this._programacionProcesoService.getProgramacionPeriodicaById(Id_Proceso).toPromise();
    
    
    if (pp) {
      for (let i = 0; i < pp.length; i++) {
        pp.forEach(p => { 
          proP = {
            Cb_Activo: p.Cb_Activo,
            Fecha_Creacion: p.Fecha_Creacion,
            Fecha_Eliminado: FechaEliminado,
            Hora_Ejecucion: p.Hora_Ejecucion,
            Id_Periodicidad: p.Id_Periodicidad,
            Id_Proceso: p.Id_Proceso,
            Id_ProgramacionPeriodica: p.Id_ProgramacionPeriodica,
            Num_DiaMes: p.Num_DiaMes,
            Num_MesPeriodo: p.Num_MesPeriodo,
            Num_Semana: p.Num_Semana,
            OPE_DiaSemana : this.getDiaSemana(p.OPE_DiaSemana),
            OPE_PeriodicidadProceso: null,
            Nombre_Periodicidad: null
          };
        });
        await this._softDeleteProgramacion(proP.Id_ProgramacionPeriodica, proP);

      }
    }  
    
    await this._softDelete(Id_Proceso, proceso);
    this.isDeleting = false;
  }

  getDiaSemana(input: any[]): any[] {
    let result = [];
    input.forEach(element => {
      result.push({ Id_DiaSemana: element.Id_DiaSemana, Nombre_DiaSemana: element.Nombre_DiaSemana });
    });
    return result;
  }

  private async _softDelete(Id_Proceso: number, proceso: IProceso): Promise<void> {
    try {
      
     
      /*
      proceso.OPE_ProgramacionPeriodicaProceso.map(element => {
        return element.OPE_DiaSemana = this.getDiaSemana(element.OPE_DiaSemana)
      });
      */
    
      await this._procesoService.putProceso(Id_Proceso, proceso).toPromise();
      this.procesos = this.procesos.filter((procesos: IProceso) => {
        return procesos.Id_Proceso !== Id_Proceso;
      });
      this.filteredProcesos = this.filteredProcesos.filter((proceso: IProceso) => {
        return proceso.Id_Proceso !== Id_Proceso;
      });

      this.areafiltro = this._cryptoService.decryptText(sessionStorage.getItem('Areas'));
      let areaObj: any[] = JSON.parse(this.areafiltro);
      let area: string= "";
      console.log('Validacion mod ejecuciones 1', areaObj);
      
      if (Array.isArray(areaObj)) {
        area = areaObj[0];
        console.log('Validacion mod ejecuciones 2', area,this.areafiltro);
      } else {
        let areaObj: any[] = JSON.parse(this.areafiltro);
        areaObj.forEach((a: any) => {
          area = a.area;
          console.log('Validacion mod ejecuciones 3', area);
        });
      }

  //    this.dataSource = new MatTableDataSource(this.filteredProcesos);
      area ? this.dataSource = new MatTableDataSource(this.filteredProcesos.filter((x)=>{ return x.Nombre_AreaNegocio == (area) }  )): this.dataSource = new MatTableDataSource(this.filteredProcesos);
      this._changeDetectorRef.detectChanges();
      this._snackBarService.open('Proceso Eliminado', 'Ok', { duration: 2000 });

    } catch (error) {

      this._dialogService.openAlert({ message: 'Ocurrió un error eliminando el proceso', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('procesos.list');
    }
  }

  private async _softDeleteProgramacion(IdProgramacionPeriodica: number, procesoProgramacion: IProgramacionProceso): Promise<void> {
    try {
     
      await this._programacionProcesoService.putProgramaconProceso(IdProgramacionPeriodica, procesoProgramacion).toPromise();
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error eliminando Programación del proceso', closeButton: 'Aceptar' });
    } finally {
    }
  }

  validarProSolActivas(idproceso: number): Boolean {    
    return this.validarProgramacion(idproceso) ? true : false;
  }

  validarProgramacion(idproceso: number): Boolean {
    let flag = false;
    let proceso: IProceso[] = this.procesos;
    proceso.forEach(p => {
      if(p.Id_Proceso == idproceso)
      {
        if(p.Fecha_Eliminado == null)
        {
          p.Cb_Activo != 'S' ? flag = true : flag = false;
          //flag = true;
        }
      }    
    });
    return flag;
  }

}