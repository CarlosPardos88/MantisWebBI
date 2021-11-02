import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdMediaService } from '@covalent/core/media';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { CustomPaginator } from '../custom/CustomPaginator';
import { MatTableFilter } from 'mat-table-filter';

import { FuentesService, IFuente, Fuente } from './services/fuentes.service';
import { HorarioSFService } from '../../services/horariosf.service';
import { Time } from '@angular/common';

import { TipoFuente } from '../../services/tiposisfuente.service';
import { HorarioSF } from '../../services/horariosf.service';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-fuentes',
  templateUrl: './fuentes.component.html',
  styleUrls: ['./fuentes.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})
export class FuentesComponent implements OnInit {

  displayedColumns = ['Nombre_SistemaFuente', 'Id_TipoSistemaFuente', 'Hora_Inicio', 'Hora_Fin', 'Editar', 'Eliminar'];
  filterEntity: Fuente;
  filterType: MatTableFilter;
  dataSource: MatTableDataSource<IFuente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fuentes: IFuente[];
  filteredFuentes: IFuente[];
  isLoading: boolean = true;

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
    private _fuentesService: FuentesService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,
    private _horarioSFService: HorarioSFService,
    private _notificacionService: NotificacionService
  ) { }

  ngOnInit() {
    this._titleService.setTitle('Sistema Fuente');
    this.filterEntity = new Fuente();
    //this.filterEntity.OPE_TipoSistemaFuente = new TipoFuente();
    //this.filterEntity.OPE_HorarioSistemaFuente = new HorarioSF();
    this.filterType = MatTableFilter.ANYWHERE;

    this.load();
  }

  filterFuentes(filterValue: string = '', columna: string = ''): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue + ',' + columna;
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('fuentes.list');
      this.isLoading = true;
      this.fuentes = await this._fuentesService.query().toPromise();
      console.log('Validacion fue 1');
    } catch (error) {
      this.fuentes = await this._fuentesService.staticQuery().toPromise();
    } finally {
      this.filteredFuentes = Object.assign([], this.fuentes);
      this.dataSource = new MatTableDataSource(this.filteredFuentes);
      this.isLoading = false;
      this.afterViewInit();
      this._loadingService.resolve('fuentes.list');
      console.log('Validacion fue 2');
    }
  }

  afterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //sort Time
    /* this.dataSource.sortingDataAccessor = (item, property) => {
       switch (property) {
         case 'Hora_Inicio':
             return item.OPE_HorarioSistemaFuente[0].Hora_Inicio;
         case 'Hora_Fin':
           return item.OPE_HorarioSistemaFuente[0].Hora_Fin;
         default:
           return item[property];
       }
     }*/

    //sort no case sensitive way
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string' && sortHeaderId !== 'Hora_Inicio' && sortHeaderId !== 'Hora_Fin') {
        return data[sortHeaderId].toLocaleLowerCase();
      } else {
        switch (sortHeaderId) {
          case 'Hora_Inicio':
            return data.Hora_Inicio;
          case 'Hora_Fin':
            return data.Hora_Fin;
        }
      }
      return data[sortHeaderId];
    };

    //filter array objects
    this.dataSource.filterPredicate = (data, filter) => {
      let newA = filter.split(',');
      let columna = newA[1];
      let filtro = newA[0];
      let valid: boolean = false;

      switch (columna) {
        case 'Hora_Fin':
          valid = Object.keys(data).some(key => {
            return Object.keys(data[key]).some(keynested => {
              return keynested.toString() == columna && (JSON.stringify(data[key].Hora_Fin).includes(filtro));
            });
          });
          break;
        case 'Hora_Inicio':
          valid = Object.keys(data).some(key => {
            return Object.keys(data[key]).some(keynested => {
              return keynested.toString() == columna && (JSON.stringify(data[key].Hora_Inicio).includes(filtro));
            });
          });
          break;
        default:
          break;
      }
      console.log('Validacion fue 3');
      return valid;
      
    };
  }

  delete(Id_SistemaFuente: number, Hora_Inicio: Time): void {
    this._dialogService
      .openConfirm({
        message: '¿Está seguro de borrar este Sistema fuente?'
        , acceptButton: 'Aceptar', cancelButton: 'Cancelar'
      })
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          this.fuentes = this.fuentes.filter((fuentes: IFuente) => {
            return fuentes.Id_SistemaFuente == Id_SistemaFuente;
          });
          this._delete(Id_SistemaFuente, Hora_Inicio);
        }
      });
  }

  private async _delete(Id_SistemaFuente: number, Hora_Inicio: Time): Promise<void> {
    try {
      this._loadingService.register('fuentes.list');
      try {
        await this._deleteHorario(Id_SistemaFuente, Hora_Inicio);
      } catch (error) {
        this._dialogService.openAlert({ message: 'Ocurrió un error eliminando el Horario del sistema fuente ' + error });
      }

      await this._fuentesService.deleteFuente(Id_SistemaFuente).toPromise();
      this.fuentes = this.fuentes.filter((fuentes: IFuente) => {
        return fuentes.Id_SistemaFuente !== Id_SistemaFuente;
      });
      this.filteredFuentes = this.filteredFuentes.filter((fuente: IFuente) => {
        return fuente.Id_SistemaFuente !== Id_SistemaFuente;
      });
      this.dataSource = new MatTableDataSource(this.filteredFuentes);

      this.dataSource.paginator = this.paginator;
      this._changeDetectorRef.detectChanges();

      this._snackBarService.open('Sistema Fuente Eliminado', 'Ok', { duration: 2000 });

    } catch (error) {
      this._dialogService.openAlert({ message: 'No se puede eliminar una fuente con procesos asociados' });
    } finally {
      this._loadingService.resolve('fuentes.list');
    }
  }

  private async _deleteHorario(Id_SistemaFuente: number, Hora_Inicio: Time): Promise<void> {
    try {
      await this._horarioSFService.deleteHorarioFuente(Id_SistemaFuente, Hora_Inicio).toPromise();
    } catch (error) {

      this._dialogService.openAlert({ message: 'Ocurrió un error eliminando el horario sistema fuente' });
    }
  }
}
