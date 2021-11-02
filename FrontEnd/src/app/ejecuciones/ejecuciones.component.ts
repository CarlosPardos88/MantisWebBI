import { Component, OnInit, ChangeDetectorRef, ViewChild, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl, MatNativeDateModule } from '@angular/material';
import { CustomPaginator } from '../custom/CustomPaginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableFilter } from 'mat-table-filter';

import { EjecucionesService, IEjecuciones, Ejecuciones } from './services/ejecuciones.service';
import { formatDate } from '@angular/common';
import { CryptoService } from '../../services/crypto.services';
import { Sort } from '@angular/material/sort';
import { NotificacionService } from '../services/notificacion.service';
import {SolicitudesdemandaService} from '../solicitudesdemanda/services/solicitudesdemanda.service';
import { ActivatedRoute,Router } from '@angular/router'
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-ejecuciones',
  templateUrl: './ejecuciones.component.html',
  styleUrls: ['./ejecuciones.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})

@NgModule({
  imports: [MatDatepickerModule, MatNativeDateModule],
})


export class EjecucionesComponent implements OnInit {
  
  Fecha_Inicio: Date;
  Fecha_Fin: Date;

  displayedColumns = ['Nombre_Proceso', 'Area', 'Nombre_EstadoEjecucionInformatica', 'FechaHora_InicioEjecucion',
    'EstadoOperador', 'EstadoUsuario', 'Reprogramar', 'Logs'];
  filterEntity: Ejecuciones;
  filterType: MatTableFilter;
  dataSource: MatTableDataSource<IEjecuciones>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ejecuciones: IEjecuciones[];
  filteredEjecuciones: IEjecuciones[];
  
  isLoading: boolean;
  show: boolean = false;
  sortedData: IEjecuciones[];
  isFromNotification: boolean = false;
  areafiltro: string;

 // today: string = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
 today: string = formatDate(new Date(), 'yyyy-MM-ddThh:mm', 'en');

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _router: Router,
    private _ejecucionesService: EjecucionesService,
    
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService, private _cryptoService: CryptoService,
    private _notificacionService: NotificacionService,
    private _solicitudesdemandaService: SolicitudesdemandaService, 
    private _route: ActivatedRoute) {



  }

  ngOnInit(): void {
   
    this._titleService.setTitle('Ejecuciones Programadas');
    this._route.params.subscribe((params: { action: string }) => {
      this.isFromNotification = params.action == "procesosvencidos";

    });

    this.Fecha_Inicio = new Date();
    this.Fecha_Fin = new Date();
    this.filterEntity = new Ejecuciones();
    this.filterType = MatTableFilter.ANYWHERE;
/*
    if (this.isFromNotification) {
      this.load();
    }*/
  }

  load(): void {
    let counter = 0;
    while (counter < 2) {
      this.load2();
      counter++;
    }
  }

  async load2(): Promise<void> {
    let Fecha_InicioT = formatDate(this.Fecha_Inicio, 'yyyy/MM/dd', 'en-US');
    let Fecha_FinT = formatDate(this.Fecha_Fin, 'yyyy/MM/dd', 'en-US');
    try {
      this._loadingService.register('ejecuciones.list');
      this.isLoading = true;
      this.show = true;
      this.ejecuciones = await this._ejecucionesService.getProPreByProcesoBool(Fecha_InicioT, Fecha_FinT).toPromise()
      //area ? this.ejecuciones = await this._ejecucionesService.getEjecucionesByArea(Fecha_InicioT, Fecha_FinT, area).toPromise() : this.ejecuciones = await this._ejecucionesService.getEjecuciones(Fecha_InicioT, Fecha_FinT).toPromise();
      console.log('Validacion mod ejecuciones 3');
    } catch (error) {

    } finally {      
      
      this.filteredEjecuciones = Object.assign([], this.ejecuciones);
      //filtro area
      this.areafiltro = this._cryptoService.decryptText(sessionStorage.getItem('Areas'));
      let areaObj: any[] = JSON.parse(this.areafiltro);
      let area: string;
      console.log('Validacion mod ejecuciones 1');      
      if (Array.isArray(areaObj)) {
        area = areaObj[0];
      } else {
        let areaObj: any[] = JSON.parse(this.areafiltro);
        areaObj.forEach((a: any) => {
          area = a.area;
          console.log('Validacion mod ejecuciones 2');
        });
      }
      /*
      if (this.isFromNotification) {
        this.filteredEjecuciones = this.filteredEjecuciones.filter((item) => { return item.Cb_Vencido == 'S' });
        console.log('Validacion mod ejecuciones 4');
      }*/

      area? this.dataSource = new MatTableDataSource(this.filteredEjecuciones.filter((x)=> { return x.Nombre_AreaNegocio == (area) } )): this.dataSource = new MatTableDataSource(this.filteredEjecuciones);

      //this.dataSource = new MatTableDataSource(this.filteredEjecuciones);      
      this.isLoading = false;      
      this.ejecuciones ? this.show = true : this.show;
      this.afterViewInit();
      this._changeDetectorRef.detectChanges();
      this._loadingService.resolve('ejecuciones.list');
      console.log('Validacion mod ejecuciones 6');
    }
  }

  async BuscarProceso(Nombre_Proceso: string, Id_Proceso:number,Id_EstadoEjecucionInformatica:number): Promise<void> {
    // [routerLink]="[row.Nombre_Proceso, row.Id_Proceso, row.Id_EstadoEjecucionInformatica,'reprogramar']"
    //ejecuciones/wf_rl_DW_DCIN_PersonaInversion/45/3/reprogramar
    
    console.log(Nombre_Proceso+Id_Proceso+Id_EstadoEjecucionInformatica)
    this._router.navigate(['/ejecuciones/'+Nombre_Proceso+'/'+Id_Proceso+
    '/'+Id_EstadoEjecucionInformatica+'/reprogramar']);
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
    console.log('Validacion mod ejecuciones 7');
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Nombre_Proceso': return compare(a.Nombre_Proceso.toLowerCase(), b.Nombre_Proceso.toLowerCase(), isAsc);
        case 'Area': return compare(a.Nombre_AreaNegocio.toLowerCase(), b.Nombre_AreaNegocio.toLowerCase(), isAsc);
        case 'Nombre_EstadoEjecucionInformatica': return compare(a.Nombre_EstadoEjecucionInformatica.toLowerCase(), b.Nombre_EstadoEjecucionInformatica.toLowerCase(), isAsc);
        case 'FechaHora_InicioEjecucion': return compare(a.FechaHora_InicioEjecucion.toString(), b.FechaHora_InicioEjecucion.toString(), isAsc);
        //case 'Hora': return compare(a.Hora_EjecucionProgramada+'', b.Hora_EjecucionProgramada+'', isAsc);
        case 'EstadoOperador': return compare(a.Nombre_EstadoOperadorEjecucionProceso.toLowerCase(), b.Nombre_EstadoOperadorEjecucionProceso.toLowerCase(), isAsc);
        case 'EstadoUsuario': return compare(a.Nombre_EstadoUsuarioEjecucionProceso.toLowerCase(), b.Nombre_EstadoUsuarioEjecucionProceso.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    console.log('Validacion mod ejecuciones 8');
    this.dataSource = new MatTableDataSource(this.sortedData);
    this.dataSource.paginator = this.paginator;
    this._changeDetectorRef.detectChanges();
    console.log('Validacion mod ejecuciones 9');
  }

  disableProgramacion(idProceso: number, fecha: string, idEstado: string, idProgramacionPeriodica : number) {
    let flag: Boolean = true;
    const dateToday = new Date(this.today);
    const dateObj = new Date(fecha);
    const milliseconds = dateToday.getTime() - dateObj.getTime();
    const hours = milliseconds / 36e5;

    let test =idProgramacionPeriodica.toLocaleString();
    let ejecucionesvenfall = this.ejecuciones.filter(
      e => e.Id_Proceso == idProceso && (e.Id_EstadoEjecucionInformatica == 3 || e.Id_EstadoEjecucionInformatica == 2)
    );
    console.log('INICIO');    
    console.log('ID: ', idProceso,'NUEVO:',idProgramacionPeriodica.toString());   
    
    if (ejecucionesvenfall && ejecucionesvenfall.length > 0) {      
      console.log('Encontro fallidos', idEstado, idProceso, hours)
    //if (hours > 0 && hours < 12 ) { 
     if (hours < 0) {
        console.log('Estado', idEstado,idProgramacionPeriodica.toString(), idProgramacionPeriodica)       
        if( idEstado == '3' || idEstado == '2'){
          flag = true;
          console.log('Flag 0', idProceso,idProgramacionPeriodica,'test:',test.valueOf())          
          if (test.valueOf() != '0') {      
            flag = false;            
           console.log('Flag 1', idProceso)
            return flag;
          } 
        }else {
          flag = true;
          console.log('Flag 2', idProceso)
        }
      } else {
        flag = true;
        console.log('Flag 3', idProceso)
      }
    } else {
      flag = true;
      console.log('Flag 4', idProceso)
    }
    console.log('FINAL: ', flag );
    return flag;
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}