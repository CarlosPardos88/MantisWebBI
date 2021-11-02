import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';

import { IProgramacionProceso, ProgramacionProcesoService } from '../../../../services/programacionproceso.service';
import { PeriodicidadService, IPeriodicidad } from '../../../../services/periodicidades.service';
import { DiaSemanaService, IDiaSemana } from '../../../../services/diassemana.service';
import { RelProcesoDiaSemanaService, IRelProcesoDiaSemana } from '../../../../services/relprodiasemana.service';

import { formatDate, Time } from '@angular/common';
import { IProceso, ProcesoService } from '../../services/procesos.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ProgramacionFormComponent implements OnInit {

  Nombre_Proceso: string;

  Id_ProgramacionPeriodica: number;
  Id_Periodicidad: number;
  Num_DiaMes: number;
  Num_MesPeriodo: number;
  Num_Semana: number;
  Hora_Ejecucion: Time;
  Id_Proceso: number;
  Fecha_Eliminado: String;
  Fecha_Creacion: String;
  Cb_Activo: string;

  Num_MesPeriodo2: number;

  OPE_PeriodicidadProceso: IPeriodicidad;
  OPE_DiaSemana: IDiaSemana[] = [];
  selectedDiaSemana: any[] = [];
  relProcesoDiaSemanaAdded: IRelProcesoDiaSemana[] = [];

  programacion: IProgramacionProceso;
  action: string;

  periodicidades: IPeriodicidad[] = [];
  nombrePeriodo: string;
  showP12: boolean = false;
  showP3: boolean = false;
  show: boolean = false;
  show4567: boolean = false;
  cb_DiaEspecifico: boolean = false;
  cb_SemanaEspecifica: boolean = false;
  disableS1: boolean = false;
  disableS2: boolean = false;
  showMes: boolean = false;
  showMesList: boolean = false;
  showdemand: boolean = false;
  showMes2: boolean = false;
  maxMes: number;
  diasSemana: IDiaSemana[] = [];
  diasSemanaAdded: IDiaSemana[] = [];
  mesesList: IMeses[] = [
    {
      Num_MesPeriodo: 1,
      mes_nombre: "Enero"
    },
    {
      "Num_MesPeriodo": 2,
      mes_nombre: "Febrero"
    },
    {
      "Num_MesPeriodo": 3,
      mes_nombre: "Marzo"
    },
    {
      "Num_MesPeriodo": 4,
      mes_nombre: "Abril"
    },
    {
      "Num_MesPeriodo": 5,
      mes_nombre: "Mayo"
    },
    {
      "Num_MesPeriodo": 6,
      mes_nombre: "Junio"
    },
    {
      "Num_MesPeriodo": 7,
      mes_nombre: "Julio"
    },
    {
      "Num_MesPeriodo": 8,
      mes_nombre: "Agosto"
    },
    {
      "Num_MesPeriodo": 9,
      mes_nombre: "Septiembre"
    },
    {
      "Num_MesPeriodo": 10,
      mes_nombre: "Octubre"
    },
    {
      "Num_MesPeriodo": 11,
      mes_nombre: "Noviembre"
    },
    {
      "Num_MesPeriodo": 12,
      mes_nombre: "Diciembre"
    }
  ];

  Id_DiaSemana: number;
  programacionProceso: IProgramacionProceso[];
  Cb_Demanda: boolean;
  Hora_Inicio: Time;
  Hora_Fin: Time;
  Tiempo_Estimado: number;

  constructor(
    private _programacionService: ProgramacionProcesoService,
    private _periodicidadService: PeriodicidadService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _diaSemanaService: DiaSemanaService,
    private _relProcesoDiaSemanaService: RelProcesoDiaSemanaService,
    private _procesoService: ProcesoService,
  ) { }

  ngOnInit() {
    this.loadPeriodicidades();
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 3 ? url[3].path : 'add');
    });

    if (this.action == 'add') {
      this._route.params.subscribe((params: { Id_Proceso: number, Nombre_Proceso: string }) => {
        this.Id_Proceso = params.Id_Proceso;
        this.Nombre_Proceso = params.Nombre_Proceso;
        this.initData();
      });
    } else {
      this._route.params.subscribe((params: { Id_ProgramacionPeriodica: number, Id_Proceso: number, NombreProceso: string }) => {
        this.Id_ProgramacionPeriodica = params.Id_ProgramacionPeriodica;
        this.Id_Proceso = params.Id_Proceso;
        this.Nombre_Proceso = params.NombreProceso;
        if (this.Id_ProgramacionPeriodica) {
          console.log(2);
          this.load();
        }
      });
    }
  }

  async initData() {
    this._loadingService.register('programacion.form');
    await this.loadDiasSemana();
    await this.getProcesoById();
    await this.validaDemanda();
    this._loadingService.resolve('programacion.form');
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('programacion.form');
      //this.loadPeriodicidades();
      let programacion: IProgramacionProceso = await this._programacionService.getprogramacionprocesoId(this.Id_ProgramacionPeriodica).toPromise();
      let diasSemana: IDiaSemana[] = await this._diaSemanaService.getprogramacionprocesoByIdEditar(this.Id_ProgramacionPeriodica).toPromise();
      this.Id_Periodicidad = programacion.Id_Periodicidad;
      this.Id_Proceso = programacion.Id_Proceso;
      this.Hora_Ejecucion = programacion.Hora_Ejecucion;
      this.Num_DiaMes = programacion.Num_DiaMes;
      this.Num_MesPeriodo = programacion.Num_MesPeriodo;
      this.Num_Semana = programacion.Num_Semana;
      this.Fecha_Eliminado = programacion.Fecha_Eliminado;
      this.Cb_Activo = programacion.Cb_Activo;
      this.OPE_DiaSemana = programacion.OPE_DiaSemana;
     
      this.OPE_PeriodicidadProceso = programacion.OPE_PeriodicidadProceso;
      this.Num_MesPeriodo2 = programacion.Num_MesPeriodo;
      this.Fecha_Creacion = programacion.Fecha_Creacion;
      
      diasSemana.forEach(p => {
        this.selectedDiaSemana.push(p.Id_DiaSemana);
      });
      this.diasSemanaAdded = this.diasSemana;
      if (this.selectedDiaSemana) {
        
        this.diasSemanaAdded.forEach((d: IDiaSemana) => {
         
          this.selectedDiaSemana.push(d.Id_DiaSemana);
        });
      }

      this.Id_Periodicidad === 3 ? 
      this.Id_DiaSemana = this.selectedDiaSemana[0] : this.Id_DiaSemana;

      this.showPeriodicidad(this.Id_Periodicidad);
      this.cargarMaxMes(this.Id_Periodicidad);

      if (!this.Num_Semana && this.Id_Periodicidad > 3 && this.Id_Periodicidad < 8) {
        this.showDiaEspe(this.cb_DiaEspecifico = true);
      } else if (this.Num_Semana && (this.Id_Periodicidad > 3 && this.Id_Periodicidad < 8)) {
        this.cb_DiaEspecifico = false;
        this.showSemEspe(this.cb_SemanaEspecifica = true);
      } else {
        this.cb_SemanaEspecifica = false;
      }

      switch (this.Id_Periodicidad) {
        case 4:
        case 5:
        case 6:
        case 7:
          this.cb_SemanaEspecifica == true ? this.Id_DiaSemana = this.selectedDiaSemana[0] : this.Id_DiaSemana;
          break;
        default:
          this.Id_DiaSemana;
      }
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió error cargando la programación del proceso', closeButton: 'Aceptar' });
    } finally {
      await this.initData();
      this.agregarPeriodicidad(this.Id_Periodicidad);
      this._loadingService.resolve('programacion.form');
    }
  }

  async save(): Promise<void> {
    try {
      this._loadingService.register('programacion.form');

      this.OPE_PeriodicidadProceso = {
        Id_Periodicidad: this.Id_Periodicidad,
        Nombre_Periodicidad: this.nombrePeriodo
      };
      let NumMesPeriodo: number;
      this.Id_Periodicidad == 8 ? NumMesPeriodo = this.Num_MesPeriodo2 : NumMesPeriodo = this.Num_MesPeriodo;

      if (this.selectedDiaSemana.length > 0) {
        this.agregarDias(this.selectedDiaSemana);
      } else {
        this.selectedDiaSemana[0] = this.Id_DiaSemana;
        this.agregarDias(this.selectedDiaSemana);
      }

      this.programacion = {
        Cb_Activo: 'S',
        Fecha_Creacion: this.Fecha_Creacion,
        Fecha_Eliminado: null,
        Hora_Ejecucion: this.Hora_Ejecucion,
        Id_Periodicidad: this.Id_Periodicidad,
        Id_Proceso: this.Id_Proceso,
        Id_ProgramacionPeriodica: this.Id_ProgramacionPeriodica,
        Num_DiaMes: this.Num_DiaMes,
        Num_MesPeriodo: NumMesPeriodo,
        Num_Semana: this.Num_Semana,
        OPE_DiaSemana: this.OPE_DiaSemana,
        OPE_PeriodicidadProceso: this.OPE_PeriodicidadProceso,
        Nombre_Periodicidad: null
        
      };

      if (this.action === 'add') {
        await this._programacionService.postCreateProgramacion(this.programacion).toPromise();

      } else {
        await this._programacionService.putProgramaconProceso(this.Id_ProgramacionPeriodica, this.programacion).toPromise();
        await this._deleteRelProDiaSemana(this.Id_ProgramacionPeriodica);
        await this._createRelProDiaSemana(this.relProcesoDiaSemanaAdded);
      }

      this._snackBarService.open('Programación guardada', 'Ok', { duration: 2000 });
      this.goBack(this.Id_Proceso, this.Nombre_Proceso);
    } catch (error) {
      this._dialogService.openAlert({ message: "No se puede crear/editar la programación: " + error, closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('programacion.form');
    }
  }


  async loadPeriodicidades(): Promise<void> {
    try {
      this._loadingService.register('periodicidades.list');
      this.periodicidades = await this._periodicidadService.query().toPromise();
    } catch (error) {
      this.periodicidades = await this._periodicidadService.staticQuery().toPromise();
    } finally {
      this._loadingService.resolve('periodicidades.list');
    }
  }

  async loadDiasSemana(): Promise<void> {
    try {
      this._loadingService.register('diasSemana.list');
      this.diasSemana = await this._diaSemanaService.query().toPromise();
    } catch (error) {
      this.diasSemana = await this._diaSemanaService.staticQuery().toPromise();
    } finally {
      this._loadingService.resolve('diasSemana.list');
    }
  }

  async getProcesoById(): Promise<void> {
    let proceso: IProceso = await this._procesoService.staticQueryIdProceso(this.Id_Proceso).toPromise();  
    //let proceso: IProceso = await this._procesoService.get(this.Id_Proceso).toPromise();
    this.Tiempo_Estimado = proceso.Num_TiempoEstimadoEjec;
    if (proceso.Id_TipoSistemaFuente != null) {
      
      let fuentehorafinmayor;
      let fuentehorainimenor;

      let fuentehorainimenorN;
      let fuentehorafinmayorN;
      
      //si solo existe una fuente
      if (proceso.OPE_SistemaFuente.length == 1) {
        
        
        if (proceso.OPE_SistemaFuente[0].OPE_HorarioSistemaFuente[0].Hora_Inicio > proceso.OPE_SistemaFuente[0].OPE_HorarioSistemaFuente[0].Hora_Fin) {
         
          fuentehorafinmayor = proceso.OPE_SistemaFuente[0];
          fuentehorainimenor = proceso.OPE_SistemaFuente[0];
        } else if (proceso.OPE_SistemaFuente[0].OPE_HorarioSistemaFuente[0].Hora_Inicio < proceso.OPE_SistemaFuente[0].OPE_HorarioSistemaFuente[0].Hora_Fin) {
          fuentehorainimenorN = proceso.OPE_SistemaFuente[0];
          fuentehorafinmayorN = proceso.OPE_SistemaFuente[0];
        }
      } else {
        //Fuentes con horario Fecha fin menor a fecha inicio
        let fuentesMayor = proceso.OPE_SistemaFuente.filter(
          f => f.OPE_HorarioSistemaFuente[0].Hora_Inicio > f.OPE_HorarioSistemaFuente[0].Hora_Fin
        );

        if (fuentesMayor.length > 1) {
          //si contiene más de una fuente
          fuentehorafinmayor = fuentesMayor.reduce(function (prev, curr) {
            if (prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > prev.OPE_HorarioSistemaFuente[0].Hora_Fin &&
              curr.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Fin) {
              return prev.OPE_HorarioSistemaFuente[0].Hora_Fin < curr.OPE_HorarioSistemaFuente[0].Hora_Fin ? prev : curr;
            }
          });

          fuentehorainimenor = fuentesMayor.reduce(function (prev, curr) {
            if (prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > prev.OPE_HorarioSistemaFuente[0].Hora_Fin &&
              curr.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Fin) {
              return prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Inicio ? prev : curr;
            }
          });
        } else {
          fuentehorafinmayor = fuentesMayor[0];
          fuentehorainimenor = fuentesMayor[0];
        }

        //Fuentes con horario normal
        let fuentesNormal = proceso.OPE_SistemaFuente.filter(
          f => (f.OPE_HorarioSistemaFuente[0].Hora_Inicio < f.OPE_HorarioSistemaFuente[0].Hora_Fin)
        );

        let fuentesNormal2;
        if (fuentesNormal.length > 0 && fuentesNormal != null) {
          fuentesNormal2 = fuentesNormal.filter(
            f => (f.OPE_HorarioSistemaFuente[0].Hora_Inicio + '' != '00:00:00' && f.OPE_HorarioSistemaFuente[0].Hora_Fin + '' != '23:59:00')
          );

          if (fuentesNormal2.length > 1 && fuentesNormal2 != null) {
            fuentehorafinmayorN = fuentesNormal2.reduce(function (prev, curr) {
              if (prev.OPE_HorarioSistemaFuente[0].Hora_Inicio < prev.OPE_HorarioSistemaFuente[0].Hora_Fin &&
                curr.OPE_HorarioSistemaFuente[0].Hora_Inicio < curr.OPE_HorarioSistemaFuente[0].Hora_Fin) {
                return prev.OPE_HorarioSistemaFuente[0].Hora_Fin < curr.OPE_HorarioSistemaFuente[0].Hora_Fin ? prev : curr;
              }
            });

            fuentehorainimenorN = fuentesNormal2.reduce(function (prev, curr) {
              if (prev.OPE_HorarioSistemaFuente[0].Hora_Inicio < prev.OPE_HorarioSistemaFuente[0].Hora_Fin &&
                curr.OPE_HorarioSistemaFuente[0].Hora_Inicio < curr.OPE_HorarioSistemaFuente[0].Hora_Fin) {
                return prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Inicio ? prev : curr;
              }
            });
          } else {
            fuentehorainimenorN = fuentesNormal2[0];
            fuentehorafinmayorN = fuentesNormal2[0];
          }
        }
      }

      let flagA: Boolean = false;
      let flagN: Boolean = false;

      let horafinA: Time;
      if (fuentehorafinmayor) {
        horafinA = fuentehorafinmayor.OPE_HorarioSistemaFuente[0].Hora_Fin;
      }

      let horainiA: Time;
      if (fuentehorainimenor) {
        horainiA = fuentehorainimenor.OPE_HorarioSistemaFuente[0].Hora_Inicio;
      }

      let horafinN: Time;
      if (fuentehorafinmayorN) {
        horafinN = fuentehorafinmayorN.OPE_HorarioSistemaFuente[0].Hora_Fin;
      }

      let horainiN: Time;
      if (fuentehorainimenorN) {
        horainiN = fuentehorainimenorN.OPE_HorarioSistemaFuente[0].Hora_Inicio;
      }

      if (horafinA != null && horainiA != null) {
        flagA = true;
      };

      if (horafinN != null && horainiN != null) {
        flagN = true;
      };

      //si es horario Normal o Anormal o un mix de horarios
      if (flagA == true && flagN == false) {
        this.Hora_Inicio = horainiA;
        this.Hora_Fin = horafinA;
        
      } else if (flagN == true && flagA == false) {
        this.Hora_Inicio = horainiN;
        this.Hora_Fin = horafinN;
      } else if (flagA == true && flagN == true) {
        if (horainiA >= horainiN && horafinA <= horafinN) {
          this.Hora_Inicio = horainiA;
          this.Hora_Fin = horafinN;
        } else if (horainiA <= horainiN && horafinA >= horafinN) {
          this.Hora_Inicio = horainiN;
          this.Hora_Fin = horafinN;
        }
      }
    }
  }

  validarHoraEje() {

    if (this.Hora_Inicio > this.Hora_Fin) {
      console.log('validar Hora 1');
      if (this.Hora_Ejecucion < this.Hora_Inicio && this.Hora_Ejecucion > this.Hora_Fin) {
        console.log('validar Hora 2');
        this.Hora_Ejecucion = null;
        this._dialogService.openAlert({ message: 'No se admite ingresar fecha de ejecución en el horario: ' + this.Hora_Fin + ' - ' + this.Hora_Inicio, closeButton: 'Aceptar' });
      }
    } else {
      if (this.Hora_Ejecucion < this.Hora_Inicio) {
        console.log('validar Hora 3');
        this.Hora_Ejecucion = null;
        this._dialogService.openAlert({ message: 'No se admite ingresar fecha de ejecución menor a ' + this.Hora_Inicio, closeButton: 'Aceptar' });
      } else if (this.Hora_Ejecucion > this.Hora_Fin) {
        console.log('validar Hora 4');
        this.Hora_Ejecucion = null;
        this._dialogService.openAlert({ message: 'No se admite ingresar fecha de ejecución mayor a ' + this.Hora_Fin, closeButton: 'Aceptar' });
      }
    }
  }

  async validaDemanda(): Promise<void> {
    this.programacionProceso = await this._programacionService.getprogramacionprocesoById(this.Id_Proceso, this.Nombre_Proceso).toPromise();
    if (this.programacionProceso && this.programacionProceso.length > 0) {
      let demanda = this.programacionProceso.find(p => p.Id_Periodicidad == 9);
      if (demanda == null && this.action == 'edit' && this.programacionProceso.length == 1) {
        this.Cb_Demanda = true;
      } else if (this.action == 'add' && this.programacionProceso.length == 0) {
        this.Cb_Demanda = true;
      } else {
        this.Cb_Demanda = false;
      }
    }

  }

  validaHorarioProgramacion(): void {
    let programacionesFiltered: IProgramacionProceso[];
    console.log('validar preceso y prerreq 1');
    if (this.Id_ProgramacionPeriodica) {
     // programacionesFiltered = this.programacionProceso.filter(p => p.Id_ProgramacionPeriodica != this.Id_ProgramacionPeriodica);

      let prerrequisito = p => p.Id_ProgramacionPeriodica;
      programacionesFiltered = this.programacionProceso.filter(p => p.Id_ProgramacionPeriodica != this.Id_ProgramacionPeriodica);

      console.log('Datos de prerrequisito', prerrequisito);
      console.log('posicion', this.programacionProceso[0].Id_ProgramacionPeriodica);
      
      console.log('validar proceso y prerreq 2');
    } else {
      programacionesFiltered = this.programacionProceso;
      console.log('validar proceso y prerreq 3');
    }

    let horaFalla: Time;
    let HoraEjeProTEE2: Time;
    let HoraEjePro2: Time;
    let counter = 0;

    let mensaje: string;

    if (programacionesFiltered != null) {
      console.log('validar proceso y prerreq 4');
      if (programacionesFiltered.length > 0) {
        console.log('validar preceso y prerreq 5');
        programacionesFiltered.forEach(p => {
          console.log('validar preceso y prerreq 6');
          let HoraEjePro: Time;
          let HoraEjeProTEE: Time;
          let HoraEjeSel: Time;

          HoraEjePro = this.convertirHoratoFecha(p.Hora_Ejecucion, 'L');
          console.log('validar preceso y prerreq 7', HoraEjePro);
          HoraEjeProTEE = this.convertirHoratoFecha(p.Hora_Ejecucion, 'S');
          
          console.log('validar preceso y prerreq 8',HoraEjeProTEE);

          try {
            HoraEjeSel = this.convertirHoratoFecha(this.Hora_Ejecucion, 'C');
            console.log('validar preceso y prerreq 9',HoraEjeSel);
          } catch (error) {
          }

          //si el horario de la programación supera el día
          if (HoraEjeProTEE < HoraEjePro) {
            console.log('validar preceso y prerreq 10');
            if ((HoraEjeSel >= HoraEjePro && HoraEjeSel + '' <= '23:59') || (HoraEjeSel + '' >= '00:00' && HoraEjeSel <= HoraEjeProTEE)) {
              console.log('validar preceso y prerreq 11');
              horaFalla = HoraEjeSel;
              HoraEjePro2 = HoraEjePro;
              HoraEjeProTEE2 = HoraEjeProTEE;
              counter++;
              console.log('validar preceso y prerreq 12');
            }
          } else {
            if (HoraEjeSel >= HoraEjePro && HoraEjeSel <= HoraEjeProTEE && this.Id_Periodicidad == p.Id_Periodicidad ) {
              console.log('validar preceso y prerreq 13', this.Id_Periodicidad, p.Id_Periodicidad);
              
              horaFalla = HoraEjeSel;
              HoraEjePro2 = HoraEjePro;
              HoraEjeProTEE2 = HoraEjeProTEE;
              counter++;
              console.log('validar preceso y prerreq 14');
            }
          }
        });
      }
    }


    if (counter == 1) {
      mensaje = 'No se admite ingresar valor ' + horaFalla + '. Ya existe otra programación con horario: ' + HoraEjePro2 + ' - ' + HoraEjeProTEE2;
      this._dialogService.openAlert({ message: mensaje, closeButton: 'Aceptar' });
      this.Hora_Ejecucion = null;
      console.log('Validacion programacion', counter);
    } else if (counter > 1) {
      mensaje = 'Se encontraron ' + counter + ' programaciones que ya cuentan con este horario! Ingrese otro horario.';
      this._dialogService.openAlert({ message: mensaje, closeButton: 'Aceptar' });
      this.Hora_Ejecucion = null;
      
    }
  }

  convertirHoratoFecha(hora: Time, tipocast: string): Time {
    let datein;
    let horaout: Time;

    switch (tipocast) {
      case 'L':
        datein = formatDate(new Date('2000-01-01 ' + (hora + '').substring(0, 5)), 'yyyy-MM-dd HH:mm', 'en');
        break;
      case 'C':
        datein = formatDate(new Date('2000-01-01 ' + (hora + '')), 'yyyy-MM-dd HH:mm', 'en');
        break;
      case 'S':
        let horacorta: number = +(hora + '').substring(3, 5).valueOf();
        let temp = new Date('2000-01-01 ' + (hora + '').substring(0, 5)).setMinutes(horacorta + this.Tiempo_Estimado);
        datein = formatDate(temp, 'yyyy-MM-dd HH:mm', 'en');
        break;
    }
    horaout = datein.substring(10, 16);
    return horaout;
  }

  agregarPeriodicidad(idPeriodicidad: number): void {
    let periodo: any;
    periodo = this.periodicidades.filter(periodo => periodo.Id_Periodicidad == idPeriodicidad);
    this.nombrePeriodo = periodo[0].Nombre_Periodicidad;
    this.showPeriodicidad(idPeriodicidad);
    this.cargarMaxMes(idPeriodicidad);
    let OPEPeriodicidadProceso: IPeriodicidad = {
      Id_Periodicidad: idPeriodicidad,
      Nombre_Periodicidad: this.nombrePeriodo
    };
    this.OPE_PeriodicidadProceso = OPEPeriodicidadProceso;
    this.validarMesPeriodo(1);
    this.validarNumDiaMes(1);
    this.validarNumSemana(1);
  }

  showPeriodicidad(idPeriodicidad) {
    this.show = true;
    switch (idPeriodicidad) {
      case 1:
        this.showMes2 = true;
        this.showP3 = false;
        this.show4567 = false;
        this.cb_SemanaEspecifica = false;
        this.cb_DiaEspecifico = false;
        this.showMesList = false;
        this.showdemand = true;
        break;
      case 2:
        this.showMes = false;
        this.showP3 = false;
        this.show4567 = false;
        this.cb_SemanaEspecifica = false;
        this.cb_DiaEspecifico = false;
        this.showMesList = false;
        this.showdemand = true;
        this.showMes2 = false;
        break;
      case 9:
        this.showMes = false;
        this.showP3 = false;
        this.show4567 = false;
        this.cb_SemanaEspecifica = false;
        this.cb_DiaEspecifico = false;
        this.showMesList = false;
        this.showdemand = false;
        this.showMes2 = false;
        this.Hora_Ejecucion = null;
        break;
      case 3:
        this.showP3 = true;
        this.show4567 = false;
        this.cb_SemanaEspecifica = false;
        this.cb_DiaEspecifico = false;
        this.showMesList = false;
        this.showdemand = true;
        this.showMes2 = false;
        this.showMes = false;
        this.selectedDiaSemana = [];
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        //this.cb_DiaEspecifico = true;
        this.show4567 = true;
        this.showMesList = false;
        //this.cb_SemanaEspecifica == false && this.cb_DiaEspecifico == false? this.showMes = false: this.showMes = true;
        this.cb_SemanaEspecifica == true || this.cb_DiaEspecifico == true ? this.showdemand = true : this.showdemand = false;
        this.cb_SemanaEspecifica == true ? this.showP3 = true : this.showP3 = false;
        this.showMes2 = false;
        break;
      case 8:
        this.showP12 = false;
        this.showP3 = false;
        this.show4567 = false;
        this.showMes = false;
        this.cb_DiaEspecifico = true;
        this.cb_SemanaEspecifica = false;
        this.showMesList = true;
        this.showdemand = true;
        this.showMes2 = false;
        break;
      default:
        this.showP12 = false;
        this.showP3 = false;
        this.show4567 = false;
        this.cb_SemanaEspecifica = false;
        this.cb_DiaEspecifico = false;
        this.showMesList = false;
        this.showdemand = false;
        this.showMes2 = false;
    }
  }

  cargarMaxMes(idPeriodicidad): void {
    switch (idPeriodicidad) {
      case 4:
        this.maxMes = 1;
        this.Num_MesPeriodo = 1;
        break;
      case 5:
        this.maxMes = 2;
        break;
      case 6:
        this.maxMes = 3;
        break;
      case 7:
        this.maxMes = 6;
        break;
      default:
        this.maxMes = 0;
    }
  }

  validarMesPeriodo(flag: number) {
    if (this.Num_MesPeriodo > this.maxMes) {
      this.Num_MesPeriodo = this.maxMes;
      if (flag == 0) {
        this._dialogService.openAlert({ message: 'No se admite ingresar valor mayor a ' + this.maxMes + '.', closeButton: 'Aceptar' });
      }
    }
  }

  validarNumSemana(flag: number) {
    if (this.Num_Semana > 4) {
      this.Num_Semana = 4;
      if (flag == 0) {
        this._dialogService.openAlert({ message: 'No se admite ingresar valor mayor a 4.', closeButton: 'Aceptar' });
      }
    }
  }

  validarNumDiaMes(flag: number) {
    if (this.Num_DiaMes > 31) {
      this.Num_DiaMes = 31;
      if (flag == 0) {
        this._dialogService.openAlert({ message: 'No se admite ingresar valor mayor a 31.', closeButton: 'Aceptar' });
      }
    }
  }

  validarEspacios(input: string, inputText) {
    if (input) {
      if (input.trim().length <= 0) {
        inputText._updateValue('');
        this._dialogService.openAlert({ message: 'No se admite ingresar sólo espacios en blanco.', closeButton: 'Aceptar' });
      }
    }
  }

  validarCero(input: number, inputText) {
    if (input == 0) {
      inputText._updateValue('');
      this._dialogService.openAlert({ message: 'No se admite ingresar valor cero (0).', closeButton: 'Aceptar' });
    }
  }

  showDiaEspe(cbDiaEspecifico): void {
    this.cb_SemanaEspecifica == true || this.cb_DiaEspecifico == true ? this.showdemand = true : this.showdemand = false;
    if (cbDiaEspecifico == true) {
      this.cb_DiaEspecifico = true;
      this.cb_SemanaEspecifica = false;
      this.disableS2 = true;
      this.showP3 = false;
      this.showMes = true;
      this.Num_Semana = null;
    } else {
      this.showMes = false;
    }
  }

  showSemEspe(cbSemanaEspecifica): void {
    if (cbSemanaEspecifica) {
      this.cb_DiaEspecifico = false;
      this.cb_SemanaEspecifica = true;
      this.disableS1 = true;
      this.showP3 = true;
      this.showMes = true;
      this.showdemand = true;
      this.Num_DiaMes = null;
    } else {
      this.showMes = false;
      this.showP3 = false;
    }
  }

  cambiaDiaSelected(diaSemana: number): void {
    this.selectedDiaSemana.splice(0, this.selectedDiaSemana.length);
    let diasSemana4: any[] = [diaSemana];
    this.selectedDiaSemana = diasSemana4;
  }

  agregarDias(diasSemana: any[]): void {
    this.relProcesoDiaSemanaAdded ? this.relProcesoDiaSemanaAdded.splice(0, this.relProcesoDiaSemanaAdded.length) : this.relProcesoDiaSemanaAdded;
    this.OPE_DiaSemana ? this.OPE_DiaSemana.splice(0, this.OPE_DiaSemana.length) : this.OPE_DiaSemana;
    if (diasSemana) {
      for (let index = 0; index < diasSemana.length; index++) {
        let relprodiasemana: IRelProcesoDiaSemana;
        let opediasemana: IDiaSemana;

        this.diasSemana.filter((d: IDiaSemana) => {
          if (d.Id_DiaSemana === diasSemana[index]) {
            relprodiasemana = {
              Id_DiaSemana: d.Id_DiaSemana,
              Id_ProgramacionPeriodica: this.Id_ProgramacionPeriodica
            };

            opediasemana = {
              Id_DiaSemana: d.Id_DiaSemana,
              Nombre_DiaSemana: d.Nombre_DiaSemana
            }

            this.relProcesoDiaSemanaAdded.push(relprodiasemana);
            this.OPE_DiaSemana.push(opediasemana);
          }
        });
      }
    }
  }

  private async _deleteRelProDiaSemana(IdProgramacionPeriodica: number): Promise<void> {
    try {
      await this._relProcesoDiaSemanaService.deleteRelProDiaSemana(IdProgramacionPeriodica).toPromise();
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrió un error eliminando relación programacion proceso día semana', closeButton: 'Aceptar' });
    }
  }

  private async _createRelProDiaSemana(relProDiaSemanaAdded: IRelProcesoDiaSemana[]): Promise<void> {
    try {
      for (let index = 0; index < relProDiaSemanaAdded.length; index++) {
        this._relProcesoDiaSemanaService.postCreateRelProDiaSemana(relProDiaSemanaAdded[index]).toPromise();
      }
    } catch (error) {
      console.log(error);
      this._dialogService.openAlert({ message: 'Ocurrió un error creando relación preoceso Pre Requisito del proceso', closeButton: 'Aceptar' });
    }
  }

  goBack(IdProceso, NombreProceso): void {
    this._router.navigate(['/procesos/' + IdProceso + '/' + NombreProceso + '/programacion']);
  }
}

export interface IMeses {
  Num_MesPeriodo: number,
  mes_nombre: string
}
