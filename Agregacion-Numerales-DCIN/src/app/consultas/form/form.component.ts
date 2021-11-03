import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { CryptoService } from 'src/services/crypto.services';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdLoadingService } from '@covalent/core/loading';
import { MatSnackBar } from '@angular/material/snack-bar';


import { from } from 'rxjs';

import { PeriodicidadConsultasService, IPeridicidad } from '../services/PeriodicidadConsultas.service';
import { AgregacionService, IAgregacion, } from '../services/agregacion.service';
import { EstructuraService, IEstructura } from '../../estructura/services/estructura.service';
import { ConsultaagregacionService, IConsulta } from '../services/consultaagregacion.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})


export class ConsultasFormComponent implements OnInit {

  Sk_Consulta: number;
  Id_Estructura: number;
  Desc_Estructura: string;
  Fecha_Consulta: Date;
  Id_Fuente: number;
  Desc_Fuente: string;
  Fecha_Inicial: Date;
  Fecha_Final: Date;
  Id_Periodicidad: number;
  Desc_Periodicidad: string;
  Nombre_UsuarioCreacion: string;

  seleccionada: string;
  estructura: string;
  agregacion: string;

  action: string;
  consulta: IConsulta;
  ArrayEstructura: IEstructura[] = [];
  ArrayAgregacion: IAgregacion[] = [];
  ArrayPeriodicidad: IPeridicidad[] = [];
  minDateQueryDate: Date;
  lastDay : Date;
  fecha_start: Date;
  fechaconsulta: String;
  fechainicio: String;
  fechafin: String;
  
  constructor(
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _cryptoService: CryptoService,
    private _snackBarService: MatSnackBar,
    private _PeriodicidadConsultasService: PeriodicidadConsultasService,
    private _EstructuraService: EstructuraService,
    private _AgregacionService: AgregacionService,
    private _ConsultaAgregacionService: ConsultaagregacionService,
    
    
  ) {

  }

  ngOnInit(): void {
    try {
    if (sessionStorage.getItem('User')) {
        this._route.url.subscribe((url: any) => {
          this.action = (url.length > 2 ? url[2].path : 'add');
        });

        this.load();
      }  else 
      {
      this._router.navigate(['frmlogin']);
      }
    }
    catch (error) {
      this._router.navigate(['error']);
    }
  }

  dateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      const day = date.getDate();
      const month = date.getMonth();
      if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7|| month === 9 || month === 11 ){
        return day === 31
      }else if (month === 3 || month === 5 || month === 8 || month === 10 ){
        return day === 30
      }else{
        return day === 28 || day ===29;
      }
     
      //0 means sunday
      //6 means saturday
  }

  async load() {
    
    try {

      //cargar la data.
      this._loadingService.register('form.form');
      this.ArrayEstructura = await this._EstructuraService.getEstructuras().toPromise();
      this.ArrayAgregacion = await this._AgregacionService.getAgregacion().toPromise();
      
     
      //configurar minima fecha para consulta
      const fechastart = new Date();
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const currentDay = new Date().getDay();
      this.fecha_start = fechastart;
      this.lastDay = new Date(currentYear, currentMonth + 1, 0);
      this.minDateQueryDate = new Date(
        currentYear - 5,
        currentMonth,
        currentDay
      );

    } catch (error) {
      //console.log(error);
      this._dialogService.openAlert({ message: 'Error creando/editando la Estructura', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('form.form');
    }

  }

  async save(): Promise<void> {

    try {
      this._loadingService.register('Consulta.form');

      if (sessionStorage.getItem('Menus')) {

        this.Nombre_UsuarioCreacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
        this._snackBarService.open('Se esta procesando la información, puede dirigirse a otra pantalla si lo desea o continuar esperando', 'Ok', { duration: 100000 });

        if (this.action === 'add') {
          this.consulta = {
            Sk_Consulta: this.Sk_Consulta,
            Id_Estructura: this.Id_Estructura,
            Desc_Estructura: this.Desc_Estructura,
            Fecha_Consulta: this.Fecha_Consulta,
            Id_Fuente: this.Id_Fuente,
            Desc_Fuente: this.Desc_Fuente,
            Fecha_Inicial: this.Fecha_Inicial,
            Fecha_Final: this.Fecha_Final,
            Id_Periodicidad: this.Id_Periodicidad,
            Desc_Periodicidad: this.Desc_Periodicidad,
            Nombre_UsuarioCreacion: this.Nombre_UsuarioCreacion

          }
          const aniofeconsulta = this.Fecha_Consulta.getFullYear();
          const mesfeconsulta = this.Fecha_Consulta.getMonth() + 1;
          const diafeconsulta = this.Fecha_Consulta.getUTCDate();
          const aniofeinicio = this.Fecha_Inicial.getFullYear();
          const mesfeinicio = this.Fecha_Inicial.getMonth() + 1;
          const diafeinicio = this.Fecha_Inicial.getDate();
          const aniofefin = this.Fecha_Final.getFullYear();
          const mesfefin = this.Fecha_Final.getMonth() + 1;
          const diafefin = this.Fecha_Final.getDate();
          let ndiafeconsulta ='';
          let nmesfeconsulta ='';
          if(diafeconsulta.toString().length>1){
            ndiafeconsulta=diafeconsulta.toString();
          }else{
             ndiafeconsulta= '0'+diafeconsulta.toString();
          }
          if(mesfeconsulta.toString().length>1){
            nmesfeconsulta=mesfeconsulta.toString();
          }else{
             nmesfeconsulta= '0'+mesfeconsulta.toString();
          }
          let ndiafeinicio ='';
          let nmesfeinicio ='';
          if(diafeinicio.toString().length>1){
            ndiafeinicio=diafeinicio.toString();
          }else{
             ndiafeinicio= '0'+diafeinicio.toString();
          }
          if(mesfeinicio.toString().length>1){
            nmesfeinicio =mesfeinicio.toString();
          }else{
             nmesfeinicio= '0'+mesfeinicio.toString();
          }
          let ndiafefin ='';
          let nmesfefin ='';
          if(diafefin.toString().length>1){
            ndiafefin =diafefin.toString();
          }else{
             ndiafefin= '0'+diafefin.toString();
          }
          if(mesfefin.toString().length>1){
            nmesfefin= mesfefin.toString();
          }else{
             nmesfefin= '0'+mesfefin.toString();
          }
          
          this.fechaconsulta = aniofeconsulta  +''+ nmesfeconsulta + ''+ ndiafeconsulta ;
          this.fechainicio = aniofeinicio  + ''+ nmesfeinicio + ''+ ndiafeinicio;
          this.fechafin = aniofefin  + ''+ nmesfefin + ''+ ndiafefin ;
    
          let resultPost = await this._ConsultaAgregacionService.postCreateConsulta(this.consulta).toPromise();
          let ArraySK = await this._ConsultaAgregacionService.getSkConsultas(this.Id_Estructura, this.fechaconsulta, this.Id_Fuente, this.fechainicio, this.fechafin, this.Id_Periodicidad).toPromise();
          this.Sk_Consulta = ArraySK[0].Sk_Consulta;
          this.Id_Estructura=ArraySK[0].Id_Estructura;
          if (1==1){
            this.goBack2();
          }
         
           if (resultPost < 0) {
            this._snackBarService.open('Error guardando consulta', 'Ok', { duration: 2000 });
          } else if (resultPost == 99) {
            this._snackBarService.open('Ya existe una consulta con la parametrización solicitada en la base de datos', 'Ok', { duration: 2000 });
          } else {
            this._snackBarService.open('Consulta guardada', 'Ok', { duration: 2000 });
          
            this.goBack();
          }

        }

      }

    } catch (error) {
      //console.log(error);
      this._dialogService.openAlert({ message: 'Error creando/editando la Estructura', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('Consulta.form');
    }
  }

  async onFuenteSelection() :Promise<void> {
       this.ArrayPeriodicidad = await this._PeriodicidadConsultasService.getPeriodicidad(this.Id_Fuente).toPromise();
  }
 
  goBack(): void {
    this._router.navigate(['/consultas/'+this.Id_Estructura+'/'+this.Sk_Consulta+'/View']);
  }

  goBack2(): void {
    //console.log("entre a la funcion");
    this._router.navigate(['/consultas/']);
  }

  
}
