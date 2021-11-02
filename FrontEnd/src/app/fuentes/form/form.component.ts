import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';

import { FuentesService, IFuente, Fuente } from '../services/fuentes.service';
import { TiposisfuenteService, ITipoFuente } from '../../../services/tiposisfuente.service';
import { HorarioSFService, IHorarioSF } from '../../../services/horariosf.service';
import { RelProcesoFuenteService, IRelProcesofuente } from '../../../services/relprocesofuentes.services';
import { IProceso, ProcesoService } from '../../procesos/services/procesos.service';
import { IProgramacionProceso, ProgramacionProcesoService } from '../../../services/programacionproceso.service';
import { ISolicitudDem, SolicitudesdemandaService } from '../../solicitudesdemanda/services/solicitudesdemanda.service';

import { formatDate, Time } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FuentesFormComponent implements OnInit {

  Id_SistemaFuente: number;
  Nombre_SistemaFuente: string;
  Id_TipoSistemaFuente: number;
  OPE_TipoSistemaFuente: ITipoFuente;
  TipoSistemaFuenteFilter: ITipoFuente[];
  OPE_TipoSistemaFuente2: ITipoFuente;
  OPE_HorarioSistemaFuente: IHorarioSF;
  OPE_HorarioSistemaFuenteold: IHorarioSF[];
  OPE_HorarioSistemaFuente2: IHorarioSF[];

  fuente: IFuente;
  action: string;
  SelectedTipoFuente: string;

  tiposfuente: ITipoFuente[];
  horaInicio: Time;
  horaFin: Time;

  relprofuente: IRelProcesofuente[];
  procesos: IProceso[] = [];
  programacionProceso: IProgramacionProceso[];
  solicitudesDemanda: ISolicitudDem[] = [];

  constructor(private _fuentesService: FuentesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _tipoFuenteService: TiposisfuenteService,
    private _horarioSFService: HorarioSFService,
    private _fuentesProceso: RelProcesoFuenteService,
    private _procesoService: ProcesoService,
    private _programacionProcesoService: ProgramacionProcesoService,
    private _solicitudesDemandaService: SolicitudesdemandaService,) { }

  goBack(): void {
    this._router.navigate(['/fuentes']);
  }

  ngOnInit() {
    
    this.loadTipoFuente();
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: { Id_SistemaFuente: number }) => {
      this.Id_SistemaFuente = params.Id_SistemaFuente;
      if (this.Id_SistemaFuente) {
        this.initData();
      }
    });
  }

  async initData(): Promise<void> {
    this._loadingService.register('fuente.form');
    await this.load();
    await this.obtieneProcesosFuente();
    this._loadingService.resolve('fuente.form');
  }
  async load(): Promise<void> {
    try {

      let fuente: IFuente = await this._fuentesService.get(this.Id_SistemaFuente).toPromise();
      this.Nombre_SistemaFuente = fuente.Nombre_SistemaFuente;
      this.Id_TipoSistemaFuente = fuente.Id_TipoSistemaFuente;
      //this.OPE_TipoSistemaFuente = fuente.OPE_TipoSistemaFuente;


      //this.OPE_HorarioSistemaFuenteold = fuente.OPE_HorarioSistemaFuente;
      //this.OPE_HorarioSistemaFuente2 = fuente.OPE_HorarioSistemaFuente;
      this.horaInicio = fuente.Hora_Inicio;
      this.horaFin = fuente.Hora_Fin;

      this.OPE_HorarioSistemaFuenteold = [{
        Hora_Inicio: fuente.Hora_Inicio,
        Hora_Fin: fuente.Hora_Fin,
        Id_SistemaFuente: this.Id_SistemaFuente,
      }];

      console.log('Validacion form fue 1');
      this.OPE_HorarioSistemaFuente2 = [{
        Hora_Inicio: fuente.Hora_Inicio,
        Hora_Fin: fuente.Hora_Fin,
        Id_SistemaFuente: this.Id_SistemaFuente,
      }];

      console.log('Validacion form fue 2');
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió error cargando la fuente', closeButton: 'Aceptar' });
    }
  }

  async loadTipoFuente(): Promise<void> {
    try {
      this._loadingService.register('tiposfuente.list');
      this.tiposfuente = await this._tipoFuenteService.query().toPromise();
      console.log('Validacion form fue 3');
    } catch (error) {
      this.tiposfuente = await this._tipoFuenteService.staticQuery().toPromise();
    } finally {
      this._loadingService.resolve('tiposfuente.list');
    }
    console.log('Validacion form fue 4');
  }

  async save(): Promise<void> {
    try {
      this._loadingService.register('fuente.form');

      this.OPE_HorarioSistemaFuente2 = [{
        Hora_Inicio: this.horaInicio,
        Hora_Fin: this.horaFin,
        Id_SistemaFuente: this.Id_SistemaFuente,
      }];

      console.log('Validacion form fue 5');

      this.TipoSistemaFuenteFilter = this.tiposfuente.filter((tipoFuenteNew: ITipoFuente) => {
        return tipoFuenteNew.Id_TipoSistemaFuente === this.Id_TipoSistemaFuente;
      });

      console.log('Validacion form fue 6');

      this.OPE_TipoSistemaFuente2 = {
        Id_TipoSistemaFuente: this.TipoSistemaFuenteFilter[0].Id_TipoSistemaFuente,
        Nombre_TipoSistemaFuente: this.TipoSistemaFuenteFilter[0].Nombre_TipoSistemaFuente
      };

      console.log('Validacion form fue 7');

      this.fuente = {
        Nombre_SistemaFuente: this.Nombre_SistemaFuente,
        Id_TipoSistemaFuente: this.Id_TipoSistemaFuente,
        Id_SistemaFuente: this.Id_SistemaFuente,
        OPE_TipoSistemaFuente: this.OPE_TipoSistemaFuente2,
        OPE_HorarioSistemaFuente: this.OPE_HorarioSistemaFuente2,
        OPE_HorarioSistemaFuenteold: this.OPE_HorarioSistemaFuenteold,

        Nombre_TipoSistemaFuente: null,
        //Hora_Inicio: null,
        //Hora_Fin:null,
      };

      if (this.action === 'add') {
        await this._fuentesService.postCreateFuente(this.fuente).toPromise();
      } else {
        if (this.fuente.OPE_HorarioSistemaFuente[0].Hora_Inicio != this.OPE_HorarioSistemaFuenteold[0].Hora_Inicio) {

          this._deleteHorario(this.fuente.OPE_HorarioSistemaFuenteold[0].Id_SistemaFuente, this.fuente.OPE_HorarioSistemaFuenteold[0].Hora_Inicio);

          this.OPE_HorarioSistemaFuente = {
            Hora_Fin: this.fuente.OPE_HorarioSistemaFuente[0].Hora_Fin,
            Hora_Inicio: this.fuente.OPE_HorarioSistemaFuente[0].Hora_Inicio,
            Id_SistemaFuente: this.Id_SistemaFuente
            
          }

          console.log('Validacion form fue 8');

          await this._horarioSFService.postCreateHorarioFuente(this.OPE_HorarioSistemaFuente).toPromise();
        } else {
          this.OPE_HorarioSistemaFuente = {
            Hora_Fin: this.fuente.OPE_HorarioSistemaFuente[0].Hora_Fin,
            Hora_Inicio: this.fuente.OPE_HorarioSistemaFuente[0].Hora_Inicio,
            Id_SistemaFuente: this.Id_SistemaFuente
          }
          await this._horarioSFService.putHorarioFuente(this.Id_SistemaFuente, this.fuente.OPE_HorarioSistemaFuente[0].Hora_Inicio, this.OPE_HorarioSistemaFuente).toPromise();
          console.log('Validacion form fue 9');
        }

        this.validarHorarioProgramacion();
       
        this.validarHorarioSolicitudes();
        
        this._fuentesService.putFuente(this.Id_SistemaFuente, this.fuente).toPromise();

      }

      this._snackBarService.open('Fuente guardada', 'Ok', { duration: 2000 });
      this.goBack();
    } catch (error) {
      this._dialogService.openAlert({ message: "No se puede crear el objeto: " + error, closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('fuente.form');
    }
  }

  private async _deleteHorario(Id_SistemaFuente: number, Hora_Inicio: Time): Promise<void> {
    try {
      await this._horarioSFService.deleteHorarioFuente(Id_SistemaFuente, Hora_Inicio).toPromise();
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error eliminando el horario sistema fuente', closeButton: 'Aceptar' });
    }
  }

  validarEspacios(input: string, inputText) {
    if (input.trim().length <= 0) {
      inputText._updateValue('');
      this._dialogService.openAlert({ message: 'No se admite ingresar sólo espacios en blanco.', closeButton: 'Aceptar' });
    }
  }

  async obtieneProcesosFuente(): Promise<void> {
    try {
      this.relprofuente = await this._fuentesProceso.getProPreByFuente(this.Id_SistemaFuente).toPromise();
      let procesos: any[] = [];
      if (this.relprofuente.length > 0) {
        this.relprofuente.forEach(p => {
          procesos.push(p.Id_Proceso);
        });

        await this.getProcesosInfo(procesos);
        console.log('Validacion form fue 10');
      }
    } catch (error) {

    }
  }

  async getProcesosInfo(procesos: any[]): Promise<void> {
    for (let i = 0; i < procesos.length; i++) {
      await this.getProcesoById(procesos[i]);
    }
  }

  async actualizarSolicitud(id: number, solicitud: ISolicitudDem): Promise<void> {
    try {
      await this._solicitudesDemandaService.putSolicitudes(id, solicitud).toPromise();
      console.log('Validacion form fue 11');
    } catch (error) {
      this._dialogService.openAlert({ message: "Ocurrió un error actualizando la solicitud por demanda del proceso afectada: " + error, closeButton: 'Aceptar' });
    }
  }

  async getProcesoById(Id_Proceso: number): Promise<void> {
    try {
      let proceso: IProceso = await this._procesoService.get(Id_Proceso).toPromise();
      let procesof = proceso.OPE_SistemaFuente.find(s => s.Id_SistemaFuente == this.Id_SistemaFuente);
      console.log('Validacion form fue 12');
      if (procesof) {

        let programaciones: IProgramacionProceso[] = proceso.OPE_ProgramacionPeriodicaProceso;
        this.programacionProceso = programaciones.filter(p => p.Fecha_Eliminado == null);
        this.getSolDemandaByProceso(proceso.Id_Proceso);
        console.log('Validacion form fue 13');
      }
    } catch (error) {
      this._dialogService.openAlert({ message: "Ocurrió un error al consultar el proceso: " + error, closeButton: 'Aceptar' });
    } finally {
      //this.load();
    }
  }

  async getSolDemandaByProceso(Id_Proceso: number): Promise<void> {
    try {
      let list: ISolicitudDem[] = await this._solicitudesDemandaService.getSolicitudesByProceso(Id_Proceso).toPromise();
      if (list && list.length > 0) {
        list.forEach(element => {
          this.solicitudesDemanda.push(element);
        });
      }

    } catch (error) {
      this._dialogService.openAlert({ message: "Ocurrió un error al consultar las solicitudes por demanda: " + error, closeButton: 'Aceptar' });
    }
  }

  validarHorarioSolicitudes(): void {
    
    let contador: number = 0;
    
    if (this.solicitudesDemanda && this.solicitudesDemanda.length > 0) {
      let today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

      this.solicitudesDemanda.forEach(s => {
        let fechahoraval;
        s.FechaHora_EjecucionAprobada ? fechahoraval = s.FechaHora_EjecucionAprobada : fechahoraval = s.FechaHora_Sugerida;

        let fecha = ('' + fechahoraval).substr(0, 10);
        if (fecha == today) {
          let horaval = ('' + fechahoraval).substr(11, 5);
          let horadef: Time = this.convertirHoratoFecha(horaval, 'C');
          if (this.horaInicio < this.horaFin) {
            if (horadef <= this.horaInicio || horadef >= this.horaFin) {
              if (s.Cb_Activo == 'N') {
                contador++;
              } else {
                s.Cb_Activo = 'N';
                contador++;
                this.actualizaSolicitudesDemanda(s.Id_SolicitudEjecucionPorDemanda, s);
                console.log('Validacion form fue 14');
              }
            }
          } else if (this.horaFin < this.horaInicio) {
            let horafintmp: Time = this.convertirHoratoFecha('23:59', 'C');
            let horainitmp: Time = this.convertirHoratoFecha('00:00', 'C');

            if (!((horadef >= this.horaInicio && horadef <= horafintmp) || (horadef >= horainitmp && horadef <= this.horaFin))) {
              if (s.Cb_Activo == 'N') {
                contador++;
              } else {
                s.Cb_Activo = 'N';
                contador++;
                this.actualizaSolicitudesDemanda(s.Id_SolicitudEjecucionPorDemanda, s);
                console.log('Validacion form fue 15');
              }
            }
          }
        }
      });

      if (contador > 0) {
        this._dialogService.openAlert({ message: "Se afectaron " + contador + " Solicitudes por Demanda de procesos relacionados a esta fuente. Por favor valide las solicitudes por demanda.", closeButton: 'Aceptar' });
      }
    }
  }

  validarHorarioProgramacion(): void {
    let contador: number = 0;
    if (this.programacionProceso && this.programacionProceso.length > 0) {
      this.programacionProceso.forEach(p => {

        if (this.horaInicio < this.horaFin) {
          if (p.Hora_Ejecucion <= this.horaInicio || p.Hora_Ejecucion >= this.horaFin) {

            if (p.Cb_Activo == 'N') {
              contador++;
            } else {
              p.Cb_Activo = 'N';
              contador++;
              this.actualizarProgramacion(p.Id_ProgramacionPeriodica, p);
              console.log('Validacion form fue 16');
            }
          } else {
            p.Cb_Activo = 'S';
            this.actualizarProgramacion(p.Id_ProgramacionPeriodica, p);
          }
        } else if (this.horaFin < this.horaInicio) {
          let horafintmp: Time = this.convertirHoratoFecha('23:59', 'C');
          let horainitmp: Time = this.convertirHoratoFecha('00:00', 'C');

          if (!((p.Hora_Ejecucion >= this.horaInicio && p.Hora_Ejecucion <= horafintmp) || (p.Hora_Ejecucion >= horainitmp && p.Hora_Ejecucion <= this.horaFin))) {
            if (p.Cb_Activo == 'N') {
              contador++;
            } else {
              p.Cb_Activo = 'N';
              contador++;
              p.Cb_Activo != 'S' ? this.actualizarProgramacion(p.Id_ProgramacionPeriodica, p) : null;
              console.log('Validacion form fue 17');
            }
          } else {
            p.Cb_Activo = 'S';
            this.actualizarProgramacion(p.Id_ProgramacionPeriodica, p);
          }
        }
      });
      if (contador > 0) {
        this._dialogService.openAlert({ message: "Se afectaron " + contador + " Programaciones relacionadas a esta fuente. Por favor valide las programaciones de los procesos.", closeButton: 'Aceptar' });
      }
    }
  }

  validarHoras() {
    let hi = this.horaInicio + '';
    let his = hi.split(':');

    let hf = this.horaFin + '';
    let hfs = hf.split(':');

    if (parseInt(his[0]) == parseInt(hfs[0]) && parseInt(his[1]) == parseInt(hfs[1]) && this.horaFin != null && this.horaInicio != null) {
      this.horaFin = null;
      this._dialogService.openAlert({ message: 'La hora Inicio no puede ser igual a la hora Fin.', closeButton: 'Aceptar' });
    }
  }

  async actualizarProgramacion(Id_ProgramacionPeriodica: number, programacion): Promise<void> {
    try {
      await this._programacionProcesoService.putProgramaconProceso(Id_ProgramacionPeriodica, programacion).toPromise();
      console.log('Validacion form fue 18');
    } catch (error) {
      this._dialogService.openAlert({ message: "Ocurrió un error actualizando la programación del proceso afectado: " + error, closeButton: 'Aceptar' });
    }
  }

  async actualizaSolicitudesDemanda(Id_SolicitudEjecucionPorDemanda: number, solicitud: ISolicitudDem): Promise<void> {
    try {
      await this._solicitudesDemandaService.putSolicitudes(Id_SolicitudEjecucionPorDemanda, solicitud).toPromise();
      console.log('Validacion form fue 19');
    } catch (error) {
      this._dialogService.openAlert({ message: "Ocurrió un error actualizando la solicitud por demanda del proceso afectado: " + error, closeButton: 'Aceptar' });
    }
  }

  convertirHoratoFecha(hora: string, tipocast: string): Time {
    let datein;
    let horaout: Time;
    switch (tipocast) {
      case 'L':
        //datein = formatDate(new Date('2000-01-01 ' + (hora + '').substring(0, 5)), 'yyyy-MM-dd hh:mm', 'en');
        datein = formatDate(new Date('2000-01-01 ' + (hora + '').substring(0, 5)), 'yyyy-MM-ddThh:mm', 'en');
        break;
      case 'C':
        //datein = formatDate(new Date('2000-01-01 ' + (hora + '')), 'yyyy-MM-dd hh:mm', 'en');
        datein = formatDate(new Date('2000-01-01 ' + (hora + '')), 'yyyy-MM-ddThh:mm', 'en');
        break;
    }
    horaout = datein.substring(10, 16);
    return horaout;
  }

}
