import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdMediaService } from '@covalent/core/media';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { CustomPaginator } from '../custom/CustomPaginator';

import { AreasService, IArea, Area } from './services/areas.service';
import { MatTableFilter } from 'mat-table-filter';

import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'qs-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})

export class AreasComponent implements OnInit {
  filterEntity: Area;
  filterType: MatTableFilter;
  displayedColumns = ['Nombre_AreaNegocio', 'Desc_AreaNegocio', 'Nombre_CarpetaWorkflows',
    'Num_InicioRangoCodProceso', 'Num_FinRangoCodProceso', 'Editar', 'Eliminar'];

  dataSource: MatTableDataSource<IArea>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  areas: IArea[];
  filteredAreas: IArea[];
  isLoading: boolean = true;
  area: Area;

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
    private _areaService: AreasService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,
    private _notificacionService: NotificacionService) { }

  ngOnInit(): void {
    this._titleService.setTitle('Areas de Negocio');
    this.filterEntity = new Area();
    this.filterType = MatTableFilter.ANYWHERE;
    this.load();
  }

  filterAreas(Nombre_AreaNegocio: string = ''): void {
    Nombre_AreaNegocio = Nombre_AreaNegocio.trim();
    Nombre_AreaNegocio = Nombre_AreaNegocio.toLowerCase();
    this.dataSource.filter = Nombre_AreaNegocio;
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('areas.list');
      this.isLoading = true;
      this.areas = await this._areaService.query().toPromise();
    } catch (error) {
      this.areas = await this._areaService.staticQuery().toPromise();
    } finally {
      this.filteredAreas = Object.assign([], this.areas);
      this.dataSource = new MatTableDataSource(this.filteredAreas);
      this.afterViewInit();
      this._changeDetectorRef.detectChanges();
      this.isLoading = false;
      this._loadingService.resolve('areas.list');
    }
  }

  afterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //sort no case sensitive way
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    };
  }

  delete(Id_AreaNegocio: number): void {
    this._dialogService
      .openConfirm({
        message: '¿Está seguro de borrar esta Área?',
        acceptButton: 'Aceptar'
      })
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          this._delete(Id_AreaNegocio);
        }
      });
  }

  private async _delete(Id_AreaNegocio: number): Promise<void> {
    try {
      this._loadingService.register('areas.list');
      await this._areaService.deleteArea(Id_AreaNegocio).toPromise();
      this.areas = this.areas.filter((areas: IArea) => {
        return areas.Id_AreaNegocio !== Id_AreaNegocio;
      });
      this.filteredAreas = this.filteredAreas.filter((area: IArea) => {
        return area.Id_AreaNegocio !== Id_AreaNegocio;
      });
      this.dataSource = new MatTableDataSource(this.filteredAreas);
      this._changeDetectorRef.detectChanges();
      this._snackBarService.open('Área Eliminada', 'Ok', { duration: 2000 });
    } catch (error) {
      this._dialogService.openAlert({ message: 'No se puede eliminar un área con procesos asociados', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('areas.list');
    }
  }

}
