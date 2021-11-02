import { Component, OnInit, ChangeDetectorRef, ViewChild, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl, MatNativeDateModule } from '@angular/material';
import { CustomPaginator } from '../custom/CustomPaginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableFilter } from 'mat-table-filter';
import { Sort } from '@angular/material/sort';

import { EjecucionesService, IEjecuciones, Ejecuciones } from '../../services/ejecuciones.service';

import { formatDate } from '@angular/common';
import { NotificacionService } from '../services/notificacion.service';
//AREAS
import { CryptoService } from '../../services/crypto.services';


@Component({
  selector: 'app-aprobacionesprogramado',
  templateUrl: './aprobacionesprogramado.component.html',
  styleUrls: ['./aprobacionesprogramado.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})

@NgModule({
  imports: [MatDatepickerModule, MatNativeDateModule],
})

export class AprobacionesprogramadoComponent implements OnInit {

  Fecha_Inicio: Date;
  Fecha_Fin: Date;
  show: boolean = false;

  displayedColumns = ['Nombre_Proceso', 'Nombre_AreaNegocio', 'Fecha', 'Hora_EjecucionProgramada',
    'Cb_ProgramacionAprobada', 'RevisarAprobar'];

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
    private _ejecucionesService: EjecucionesService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,private _cryptoService: CryptoService,
    private _notificacionService: NotificacionService) { }

  ngOnInit() {
    this._titleService.setTitle('Aprobación de Procesos');
    this.Fecha_Inicio = new Date();
    this.Fecha_Fin = new Date();
    this.filterEntity = new Ejecuciones();
    this.filterType = MatTableFilter.ANYWHERE;
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
      this.ejecuciones = await this._ejecucionesService.getAprobacionProgramada(formatDate(this.Fecha_Inicio, 'yyyy-MM-dd', 'en'), formatDate(this.Fecha_Fin, 'yyyy-MM-dd', 'en')).toPromise();
      console.log('Validacion form apr prg 1'); 
    } catch (error) {
    } finally {
      //filtrado por areas 

      this.areafiltro = this._cryptoService.decryptText(sessionStorage.getItem('Areas'));
      let areaObj: any[] = JSON.parse(this.areafiltro);
      let area: string= "";     

      area = areaObj[0];
      
      this.filteredEjecuciones = Object.assign([], this.ejecuciones);
      area ? this.dataSource = new MatTableDataSource(this.filteredEjecuciones.filter((x)=> { return x.Nombre_AreaNegocio == (area) } )): this.dataSource = new MatTableDataSource(this.filteredEjecuciones);

      this.isLoading = false;
      this.ejecuciones ? this.show = true : this.show;      
      this.afterViewInit();
      this._changeDetectorRef.detectChanges();

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
        //  case 'Cb_ProgramacionAprobada': return compare(a.Cb_ProgramacionAprobada.toLowerCase(), b.Cb_ProgramacionAprobada.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.sortedData);
    this.dataSource.paginator = this.paginator;
    this._changeDetectorRef.detectChanges();
    console.log('Validacion form apr prg 4');
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}