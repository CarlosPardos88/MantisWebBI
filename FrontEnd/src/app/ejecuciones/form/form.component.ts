import { Component, OnInit, ChangeDetectorRef, ViewChild, NgModule } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdMediaService } from '@covalent/core/media';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { saveAs }  from 'file-saver';
import { CustomPaginator } from '../../custom/CustomPaginator';

import { LogsService, ILogs } from '../../../services/logs.service';
import { DescargaService } from '../../../services/descargas.services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})
export class EjecucionesFormComponent implements OnInit {

  Nombre_AreaNegocio: string;
  NombreProceso: string;
  Fecha: string;

  logs: ILogs[];
  filteredLogs: ILogs[];

  file: Text;

  displayedColumns = ['NombreArchivos', 'Fecha', 'Ruta'];

  dataSource: MatTableDataSource<ILogs>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  action: string;
  isLoading: boolean = false;

  constructor(
    private _loadingService: TdLoadingService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,
    private _logsService: LogsService,
    private _descargaService: DescargaService) { }

  ngOnInit() {
   
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[2].path : 'add');
    });
    this._route.params.subscribe((params: {Nombre_Proceso: string, Nombre_AreaNegocio:string, Fecha: string}) => {
      this.Nombre_AreaNegocio = params.Nombre_AreaNegocio;
      this.NombreProceso = params.Nombre_Proceso;
      this.Fecha = params.Fecha;
      if (this.Nombre_AreaNegocio || this.NombreProceso || this.Fecha) {
        this.load();
      }
    });
  }

  async load(): Promise<void> {
    try {
      console.log(this.Nombre_AreaNegocio,this.NombreProceso,this.Fecha);
      this._loadingService.register('logs.list');
      this.isLoading = true;
      this.logs = await this._logsService.GetArchivos(this.Nombre_AreaNegocio,this.NombreProceso,this.Fecha).toPromise();
      console.log('Validacion form eje 1'); 
    } catch (error) {
    } finally {
      this.filteredLogs = Object.assign([], this.logs);
      this.dataSource = new MatTableDataSource(this.filteredLogs);
      this.afterViewInit();
      this._changeDetectorRef.detectChanges();
      this.isLoading = false;
      this._loadingService.resolve('logs.list');
      console.log('Validacion form eje 2');
    }
  }

  descargaArchivo(nonbreArchivo): void{
    try {
      this.isLoading = true;
      var FileSaver = require('file-saver');

      this._descargaService.DownloadFile(nonbreArchivo, this.Nombre_AreaNegocio).subscribe((res) => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        let archivo = resJSON._body; 
        console.log('Validacion form eje 3');
        var blob = new Blob([archivo.toString()], {type: "text/plain;charset=utf-8"});
        
        FileSaver.saveAs(blob, nonbreArchivo);
        console.log('Validacion form eje 4');
      });;
      

    } catch (error) {
     
    } finally {

      this.isLoading = false;
    }
  
  } 

  filterEjecuciones(Nombre_Proceso: string = ''): void {
    Nombre_Proceso = Nombre_Proceso.trim();
    Nombre_Proceso = Nombre_Proceso.toLowerCase();
    this.dataSource.filter = Nombre_Proceso;
  }

  afterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goBack(): void {
    this._router.navigate(['/ejecuciones']);
  }

}
