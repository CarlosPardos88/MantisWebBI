import { Component, OnInit, ChangeDetectorRef, ViewChild, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdMediaService } from '@covalent/core/media';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl, MatNativeDateModule, Sort } from '@angular/material';
import { CustomPaginator } from '../custom/CustomPaginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableFilter } from 'mat-table-filter';

import { AprobacionesprogramadoService, IAprobacion } from '../aprobacionesprogramado/services/aprobacionesprogramado.service';
import { EjecucionesService, IEjecuciones, Ejecuciones } from '../../services/ejecuciones.service';

import { formatDate } from '@angular/common';

import { NotificacionService } from '../services/notificacion.service';
//AREAS
import { CryptoService } from '../../services/crypto.services';

@Component({
  selector: 'app-aprobacionesdemanda',
  templateUrl: './aprobacionesdemanda.component.html',
  styleUrls: ['./aprobacionesdemanda.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})

@NgModule({
  imports: [MatDatepickerModule, MatNativeDateModule],
})

export class AprobacionesdemandaComponent implements OnInit {
  Fecha_Inicio: Date;
  Fecha_Fin: Date;
  show: boolean = false;

  displayedColumns = ['Nombre_Proceso', 'Nombre_AreaNegocio', 'Fecha',
    'Hora_EjecucionProgramada', 'Cb_ProgramacionAprobada', 'RevisarAprobar'];
  filterEntity: Ejecuciones;
  filterType: MatTableFilter;
  dataSource: MatTableDataSource<IEjecuciones>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ejecuciones: IEjecuciones[] = [];
  filteredEjecuciones: IEjecuciones[];
  isLoading: boolean;
  sortedData: IEjecuciones[];
  //nuevas variables filtrado por area
  areafiltro: string;
  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _aprobacionesprogramadoService: AprobacionesprogramadoService,
    private _ejecucionesService: EjecucionesService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,private _cryptoService: CryptoService,
    private _notificacionService: NotificacionService) { }

  ngOnInit() {
    this._titleService.setTitle('Aprobación de Procesos Demanda');
    this.Fecha_Inicio = new Date();
    this.Fecha_Fin = new Date();
    this.filterEntity = new Ejecuciones();
    this.filterType = MatTableFilter.ANYWHERE;
  }

  filterEjecuciones(Nombre_Proceso: string = ''): void {
    Nombre_Proceso = Nombre_Proceso.trim();
    Nombre_Proceso = Nombre_Proceso.toLowerCase();
    this.dataSource.filter = Nombre_Proceso;
  }

  load(): void {
    let counter = 0;
    while (counter < 2) {
      this.load2();
      counter++;
    }
  }

  async load2(): Promise<void> {
    try {
      this._loadingService.register('ejecuciones.list');
      this.isLoading = true;
      //this.ejecuciones = await this._ejecucionesService.getAprobacionProgramadaDem(formatDate(this.Fecha_Inicio, 'yyyy-MM-dd', 'en'), formatDate(this.Fecha_Fin, 'yyyy-MM-dd', 'en')).toPromise();
      this.ejecuciones = await this._ejecucionesService.getAprobacionProgramadaDem(formatDate(this.Fecha_Inicio, 'yyyy-MM-dd', 'en'), formatDate(this.Fecha_Fin, 'yyyy-MM-dd', 'en')).toPromise();
      
      this.ejecuciones.map(item => { console.log('Esta activo?', item.Cb_Activo) });
    } catch (error) {

    } finally {

      this.filteredEjecuciones = Object.assign([], this.ejecuciones);
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

      area? this.dataSource = new MatTableDataSource(this.filteredEjecuciones.filter((x)=> { return x.Nombre_AreaNegocio == (area) } )): this.dataSource = new MatTableDataSource(this.filteredEjecuciones);
      this.isLoading = false;
      this.ejecuciones ? this.show = true : this.show;
      this.afterViewInit();
      this._changeDetectorRef.detectChanges();
      this._loadingService.resolve('ejecuciones.list');
    }
  }

  afterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.ejecuciones.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Nombre_Proceso': return compare(a.Nombre_Proceso.toLowerCase(), b.Nombre_Proceso.toLowerCase(), isAsc);
        case 'Area': return compare(a.Nombre_AreaNegocio.toLowerCase(), b.Nombre_AreaNegocio.toLowerCase(), isAsc);
        case 'Fecha': return compare(a.Fecha + '', b.Fecha + '', isAsc);
        case 'Hora_EjecucionProgramada': return compare(a.Hora_EjecucionProgramada + '', b.Hora_EjecucionProgramada + '', isAsc);
        // case 'Cb_ProgramacionAprobada': return compare(a.Cb_ProgramacionAprobada.toLowerCase(), b.Cb_ProgramacionAprobada.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.sortedData);
    this.dataSource.paginator = this.paginator;
    this._changeDetectorRef.detectChanges();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}