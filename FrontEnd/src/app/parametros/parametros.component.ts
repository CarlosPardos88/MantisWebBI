import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdMediaService } from '@covalent/core/media';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { MatTableFilter } from 'mat-table-filter';

import { CustomPaginator } from '../custom/CustomPaginator';

import { ParametroService, IParametro, Parametro } from './services/parametros.service';
import { CryptoService } from '../../services/crypto.services';
import { formatDate } from '@angular/common';
import { NotificacionService } from '../services/notificacion.service';
@Component({
  selector: 'qs-parametros',
  templateUrl: './parametrosT.component.html',
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
  styleUrls: ['./parametros.component.scss']

})
export class ParametrosComponent implements OnInit {

  displayedColumns = ['NombreGrupoParametro', 'NombreParametro', 'ValorParametro',
    'DescripcionParametro', 'FechaCreacion', 'FechaModificacion', 'Editar'];

  displayedColumnsOperador = ['NombreGrupoParametro', 'NombreParametro', 'ValorParametro',
    'DescripcionParametro', 'FechaCreacion', 'FechaModificacion'];
  filterEntity: Parametro;
  filterType: MatTableFilter;
  dataSource: MatTableDataSource<IParametro>;
  perfilUsuario;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  parametros: IParametro[];
  filteredParametros: IParametro[];
  isLoading: boolean = true;
  areafiltro: string;

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
    private _parametroService: ParametroService,
    public media: TdMediaService, private _cryptoService: CryptoService,
    private _notificacionService: NotificacionService) {
  }

  

  ngOnInit(): void {
    this._titleService.setTitle('Parametros');
    this.filterEntity = new Parametro();
    this.filterType = MatTableFilter.ANYWHERE;
    let p = (this._cryptoService.decryptText(sessionStorage.getItem('perfil')))
    
   /* if(p == '"Operador"')
    {*/
      this.perfilUsuario = this._cryptoService.decryptText(sessionStorage.getItem('perfil'))
   /* }
    else
    {
      console.log("Perfil usuario")
    }*/
    
   
    
    this.load();
  }


  filterParametros(filterValue: string = ''): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
   
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('parametros.list');
      this.isLoading = true;
      this.areafiltro = this._cryptoService.decryptText(sessionStorage.getItem('Areas'));

      let areaObj: any[] = JSON.parse(this.areafiltro);
      console.log('Validacion par not 1');
      let area: string;
      if (Array.isArray(areaObj)) {

        area = areaObj[0];
      } else {
        let areaObj: any[] = JSON.parse(this.areafiltro);
        areaObj.forEach((a: any) => {
          area = a.area;
          console.log('Validacion par not 2');
        });
      }

      area ? this.parametros = await this._parametroService.staticQueryArea(area).toPromise() : this.parametros = await this._parametroService.staticQuery().toPromise();
      console.log('Validacion par not 3');
    } catch (error) {

    } finally {
      this.filteredParametros = Object.assign([], this.parametros);
      this.dataSource = new MatTableDataSource(this.filteredParametros);
      this.isLoading = false;
      this.afterViewInit();
      this._loadingService.resolve('parametros.list');
      console.log('Validacion par not 4');
    }
  }

 

  validarProSolActivas(): Boolean {
    console.log(3)
    return  false;
  }


  afterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //sort no case sensitive way
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (!data[sortHeaderId]) {
        return this.sort.direction === "asc" ? '3' : '1';
      }

      if (typeof data[sortHeaderId] === 'string') {
        if (sortHeaderId === 'FechaCreacion' || sortHeaderId === 'FechaModificacion') {
          switch (sortHeaderId) {
            case 'FechaCreacion':
              return '2' + this.formatFecha(data.FechaCreacion);
            case 'FechaModificacion':
              return '2' + this.formatFecha(data.FechaModificacion);
          }
        } else {
          return '2' + data[sortHeaderId].toLocaleLowerCase();
        }
      }

      return data[sortHeaderId];
    };
  }

  formatFecha(fechain: Date) {
    let fecha = fechain.toString();
    let fechaN = '';

    let fechaS = fecha.split('/');
    let anio = fechaS[2].split(' ')[0];
    let hora = fechaS[2].split(' ')[1];
    let ampm = fechaS[2].split(' ')[2];
    let horaS = hora.split(':');

    if (ampm[0] == 'p') {
      let horn = parseInt(horaS[0].toString()) + 12;
      fechaN = anio.trim() + '-' + fechaS[1] + '-' + fechaS[0] + ' ' + horn + ':' + horaS[1] + ':' + horaS[2];
    } else {
      fechaN = anio.trim() + '-' + fechaS[1] + '-' + fechaS[0] + ' ' + horaS[0] + ':' + horaS[1] + ':' + horaS[2];
    }
    return fechaN;
  }

}
