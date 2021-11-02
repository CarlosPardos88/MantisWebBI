import { Component, OnInit, ChangeDetectorRef, ViewChild, NgModule, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { MatTableFilter } from 'mat-table-filter';
import { Sort } from '@angular/material/sort';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdMediaService } from '@covalent/core/media';

import { CustomPaginator } from '../custom/CustomPaginator';
import { CertificarprocesosService, ICertificar } from './services/certificarprocesos.service';

import { ResultadoService, IResultado, Resultado } from '../../services/resultado.services';
import { CryptoService } from '../../services/crypto.services';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-certificarprocesos',
  templateUrl: './certificarprocesos.component.html',
  styleUrls: ['./certificarprocesos.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})

@NgModule({
  imports: [MatDatepickerModule, MatNativeDateModule],
})

export class CertificarprocesosComponent implements OnInit {

  displayedColumns = ['Nombre_Proceso', 'Area', 'Estado', 'Fecha',
    'Hora', 'EstadoOperador', 'EstadoUsuario', 'Logs'];

  Fecha_Inicio: Date;
  Fecha_Fin: Date;
  filterEntity: Resultado;
  filterType: MatTableFilter;
  dataSource: MatTableDataSource<ICertificar>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Id_ResultadoEjecucionProgramada: number;
  certificar: ICertificar[];
  Resultado: IResultado[];
  Certificados: IResultado;
  filteredCertificar: ICertificar[];
  sortedData: ICertificar[];
  isLoading: boolean;
  show: boolean = false;
  isFromNotification: boolean = false;
  isFromNotificationOpe: boolean = false;
  action: string;
  userAprobacion: string;
  perfilAprobacion: string;

  areafiltro: string;

  constructor(private _titleService: Title,
    private _router: Router,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MatSnackBar,
    private _certificarprocesosService: CertificarprocesosService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,
    private _resultadoService: ResultadoService,
    private _cryptoService: CryptoService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this._titleService.setTitle('Certificar Procesos');
    this.filterEntity = new Resultado();
    this.filterType = MatTableFilter.ANYWHERE;

    this._route.params.subscribe((params: { action: string }) => {
      this.isFromNotification = params.action == "certificar";
      this.isFromNotificationOpe = params.action == "certificaradop";

    });

    this.load();
    this.Fecha_Inicio = new Date();
    this.Fecha_Fin = new Date();
  }

  async load(): Promise<void> {
    if (sessionStorage.getItem('Menus')) {
      this.userAprobacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
      let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
      let perfilDec = JSON.parse(perfilcipher.toString());
      this.perfilAprobacion = perfilDec;

      this.areafiltro = this._cryptoService.decryptText(sessionStorage.getItem('Areas'));

      let areaObj: any[] = JSON.parse(this.areafiltro);

      let area: string;
      if (Array.isArray(areaObj)) {
        area = areaObj[0];
      } else {
        let areaObj: any[] = JSON.parse(this.areafiltro);
        areaObj.forEach((a: any) => {
          area = a.area;
        });
      }

      try {
        this._loadingService.register('certificar.list');
        this.isLoading = true;
        this.show = true;
        console.log("area", area);
        console.log("perfil", perfilcipher.toString());

        area ? this.certificar = await this._certificarprocesosService.getEjecucionesByArea(perfilcipher.toString(), area).toPromise() : this.certificar = await this._certificarprocesosService.getEjecuciones(perfilcipher.toString()).toPromise();

      } catch (error) {

      } finally {
        this.filteredCertificar = Object.assign([], this.certificar);
        this.filteredCertificar = this.filteredCertificar.filter((item) => {
          return (!this.isFromNotification || item.Id_EstadoOperadorEjecucionProceso == 7) || (!this.isFromNotificationOpe || !item.Id_EstadoOperadorEjecucionProceso);
        });
        this.dataSource = new MatTableDataSource(this.filteredCertificar);
        this.isLoading = false;
        this.certificar ? this.show = true : this.show;
        this._changeDetectorRef.detectChanges();
        this.afterViewInit();
        this._loadingService.resolve('certificar.list');
      }
    }
  }

  async certifica(Id_ResultadoEjecucionProgramada: number, EstadoEjeInf: string): Promise<void> {

    let flagEjecucion: boolean = false;
    EstadoEjeInf == 'Exitoso' || EstadoEjeInf == 'Fallido' ? flagEjecucion = true : flagEjecucion = false;
    if (flagEjecucion == true) {
      this._dialogService
        .openConfirm({
          message: '¿Está seguro de certificar este proceso?',
          acceptButton: 'Aceptar', cancelButton: 'Cancelar'
        })
        .afterClosed().toPromise().then(async (confirm: boolean) => {
          if (confirm) {
            let resultado: IResultado = await this._resultadoService.GetResultado(Id_ResultadoEjecucionProgramada).toPromise();
            
            this._certifica(Id_ResultadoEjecucionProgramada, resultado);
          }
        });
    } else {
      this._dialogService.openAlert({ message: 'No se puede Certificar el proceso con el estado: ' + EstadoEjeInf + '.', closeButton: 'Aceptar' });
    }
  }

  async _certifica(Id_ResultadoEjecucionProgramada: number, resultado: IResultado): Promise<void> {
    try {
      this._loadingService.register('Certificados.list');
      this.isLoading = true;
      let valor = null;
      if (sessionStorage.getItem('Menus')) {
        this.userAprobacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
        let perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
        let perfilDec = JSON.parse(perfilcipher.toString());
        this.perfilAprobacion = perfilDec;

        let fechaRevision: Date = new Date(formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en'));
      

        if (perfilcipher.toString().match("Operador") || perfilcipher.toString().match("Administrador")) {

          valor = 'OperadorAdmin';
          this.Certificados = {
            FechaHora_InicioEjecucion: resultado.FechaHora_InicioEjecucion,
            FechaHora_FinEjecucion: resultado.FechaHora_FinEjecucion,
            Id_ResultadoEjecucionProgramada: resultado.Id_ResultadoEjecucionProgramada,
            Id_SolicitudEjecucionPorDemanda: resultado.Id_SolicitudEjecucionPorDemanda,
            Id_AprobacionProgramacionPeriodica: Id_ResultadoEjecucionProgramada,
            FechaHora_RevisionOperador: fechaRevision,
            FechaHora_RevisionUsuario: resultado.FechaHora_RevisionUsuario,
            Id_EstadoOperadorEjecucionProceso: 7,
            Id_EstadoUsuarioEjecucionProceso: resultado.Id_EstadoUsuarioEjecucionProceso,
            Id_EstadoEjecucionInformatica: resultado.Id_EstadoEjecucionInformatica,
            Nombre_UsuarioRevisor: resultado.Nombre_UsuarioRevisor,
            Nombre_OperadorRevisor: this.userAprobacion,
            Nombre_RolUsuarioRevisor: resultado.Nombre_RolUsuarioRevisor,
            Nombre_RolOperadorRevisor: this.perfilAprobacion
          }
          
          
        } else if (perfilcipher.toString().match("Usuario")) {
          valor = 'Usuario';
          this.Certificados = {
            FechaHora_InicioEjecucion: resultado.FechaHora_InicioEjecucion,
            FechaHora_FinEjecucion: resultado.FechaHora_FinEjecucion,
            Id_ResultadoEjecucionProgramada: resultado.Id_ResultadoEjecucionProgramada,
            Id_SolicitudEjecucionPorDemanda: resultado.Id_SolicitudEjecucionPorDemanda,
            Id_AprobacionProgramacionPeriodica: Id_ResultadoEjecucionProgramada,
            FechaHora_RevisionOperador: resultado.FechaHora_RevisionOperador,
            FechaHora_RevisionUsuario: fechaRevision,
            Id_EstadoOperadorEjecucionProceso: resultado.Id_EstadoOperadorEjecucionProceso,
            Id_EstadoUsuarioEjecucionProceso: 7,
            Id_EstadoEjecucionInformatica: resultado.Id_EstadoEjecucionInformatica,
            Nombre_UsuarioRevisor: this.userAprobacion,
            Nombre_OperadorRevisor: resultado.Nombre_OperadorRevisor,
            Nombre_RolUsuarioRevisor: this.perfilAprobacion,
            Nombre_RolOperadorRevisor: resultado.Nombre_RolOperadorRevisor
          }
        }
        console.log(this.Certificados)
        await this._resultadoService.putResultado(Id_ResultadoEjecucionProgramada, this.Certificados).toPromise();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
      this._loadingService.register('Certificados.list');
      this._snackBarService.open('Proceso Certificado Correctamente', 'Ok', { duration: 2000 });
      this.load();
    }
  }

  afterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //sort no case sensitive way
    /*this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    };*/
  }

  filterCertificar(Nombre_Proceso: string = ''): void {
    Nombre_Proceso = Nombre_Proceso.trim();
    Nombre_Proceso = Nombre_Proceso.toLowerCase();
    this.dataSource.filter = Nombre_Proceso;
  }

  goBack(): void {
    this._router.navigate(['/certificarprocesos']);
  }

  sortData(sort: Sort) {
    const data = this.certificar.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Nombre_Proceso': return compare(a.Nombre_Proceso.toLowerCase(), b.Nombre_Proceso.toLowerCase(), isAsc);
        case 'Area': return compare(a.Nombre_AreaNegocio.toLowerCase(), b.Nombre_AreaNegocio.toLowerCase(), isAsc);
        case 'Estado': return compare(a.Nombre_EstadoEjecucionInformatica.toLowerCase(), b.Nombre_EstadoEjecucionInformatica.toLowerCase(), isAsc);
        case 'Fecha': return compare(a.Fecha, b.Fecha, isAsc);
        case 'Hora': return compare(a.Hora_EjecucionProgramada + '', b.Hora_EjecucionProgramada + '', isAsc);
        case 'EstadoOperador': return compare(a.Nombre_EstadoOperadorEjecucionProceso.toLowerCase(), b.Nombre_EstadoOperadorEjecucionProceso.toLowerCase(), isAsc);
        case 'EstadoUsuario': return compare(a.Nombre_EstadoUsuarioEjecucionProceso.toLowerCase(), b.Nombre_EstadoUsuarioEjecucionProceso.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.sortedData);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}