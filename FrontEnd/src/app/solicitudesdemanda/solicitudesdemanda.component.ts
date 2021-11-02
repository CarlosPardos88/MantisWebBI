import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdMediaService } from '@covalent/core/media';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl } from '@angular/material';

import { ProcesoService, IProceso, Proceso } from '../procesos/services/procesos.service';
import { AreasService, IArea, Area } from '../areas/services/areas.service';
import { formatDate, getLocaleDateTimeFormat } from '@angular/common';
import { SolicitudesdemandaService, ISolicitudDem } from './services/solicitudesdemanda.service';
import { CryptoService } from '../../services/crypto.services';
import { CustomPaginator } from '../custom/CustomPaginator';
import { MatTableFilter } from 'mat-table-filter';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-solicitudesdemanda',
  templateUrl: './solicitudesdemanda.component.html',
  styleUrls: ['./solicitudesdemanda.component.scss']
})
export class SolicitudesdemandaComponent implements OnInit {

  displayedColumns = ['Nombre_Proceso', 'Nombre_AreaNegocio', 'Num_TiempoEstimadoEjec',
    'Editar'];
  filterEntity: Proceso;
  filterType: MatTableFilter;
  dataSource: MatTableDataSource<IProceso>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  filteredProcesos: IProceso[];


  procesos: IProceso[] = [];
  procesos2: IProceso[];
  Id_Proceso: number;
  Nombre_Proceso: string;
  Cb_ActualAutomaParametros: string;
  Cb_UtilizaParametros: string;

  areaNegocio: IArea[];
  Id_AreaNegocio: number;
  Nombre_AreaNegocio: string;
  Num_InicioRangoCodProceso: number;
  Num_FinRangoCodProceso: number;

  areas: IArea[];

  OPE_SistemaFuente: any[];

  isLoading: boolean = true;
  isLoading2: boolean = true;
  show: boolean = false;

  areafiltro: string;
  perfil: string;

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
    private _procesoService: ProcesoService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService, private _areaService: AreasService,
    private _solicitudesdemandaService: SolicitudesdemandaService, private _cryptoService: CryptoService,
    private _notificacionService: NotificacionService) { }

  ngOnInit() {
    this._titleService.setTitle('Solicitud Ejecución Proceso');
    this.filterEntity = new Proceso();
    //this.filterEntity.OPE_AreaNegocio = new Area();
    this.filterType = MatTableFilter.ANYWHERE;
    let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
    console.log(perfilcipher)
    this.load();
  }

  async load(): Promise<void> {
    try {
      let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
      this.perfil = JSON.parse(perfilcipher.toString());

      this._loadingService.register('procesos.list');
      this.isLoading = true;
      this.isLoading2 = false;
      this.procesos2 = await this._procesoService.staticQuerySolicitudDemanda().toPromise();

      this.areafiltro = this._cryptoService.decryptText(sessionStorage.getItem('Areas'));
      console.log(this.areafiltro)
      let areaObj: any[] = JSON.parse(this.areafiltro);
      console.log('Validacion proce 1111');
      let area: string;
      if (Array.isArray(areaObj)) {
        area = areaObj[0];
      } else {
        let areaObj: any[] = JSON.parse(this.areafiltro);
        areaObj.forEach((a: any) => {
          area = a.area;
        });
      }
      console.log('Validacion proce 2');
      //consulta que trae todas las areas
      this.areas = await this._areaService.staticQuery().toPromise();

      let areaF = this.areas.find(element => element.Nombre_AreaNegocio === area);
      console.log(area)
      this.procesos2.filter((p: IProceso) => {
        
        if (p.Id_AreaNegocio === areaF.Id_AreaNegocio && (!(this.perfil == 'Operador') || p.Cb_PermitirSolicitudOperador == 'S')) {
          this.procesos.push(p);
        }
        console.log('Validacion proce 3');
      });

    } catch (error) {
      this.procesos2 = await this._procesoService.staticQuerySolicitudDemanda().toPromise();
      this.procesos = this.procesos2.filter(item => {
        return (!(this.perfil == 'Operador') || item.Cb_PermitirSolicitudOperador == 'S')
      });
    } finally {
      this.filteredProcesos = Object.assign([], this.procesos);
      this.dataSource = new MatTableDataSource(this.filteredProcesos);
      this.afterViewInit();
      this.isLoading = false;
      this._loadingService.resolve('procesos.list');
      console.log('Validacion proce 4');
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

      let area: IArea = await this._areaService.get(this.Id_AreaNegocio).toPromise();
      this.Nombre_AreaNegocio = area.Nombre_AreaNegocio;
      this.Num_FinRangoCodProceso = area.Num_FinRangoCodProceso;
      this.Num_InicioRangoCodProceso = area.Num_InicioRangoCodProceso;
      console.log('Validacion proce 5');
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió error cargando el proceso', closeButton: 'Aceptar' });
    } finally {
      this.show = true;
      this.isLoading2 = false;
      this._loadingService.resolve('solicitudForm.form');
      console.log('Validacion proce 6');
    }
  }

}
