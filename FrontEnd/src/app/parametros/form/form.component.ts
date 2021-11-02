import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';

import { ParametroService, IParametro } from '../services/parametros.service';

import { AreasService, IArea } from '../../areas/services/areas.service';

@Component({
  selector: 'qs-parametro-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class ParametrosFormComponent implements OnInit {

  nombreParametro: string;
  nombreGrupoParametro: string;
  descripcionParametro: string;
  valorParametro: string;
  parametro: IParametro;
  action: string;
  idParametro: number;

  areas: IArea[];

  constructor(private _parametroService: ParametroService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _areaService: AreasService) { }

  goBack(): void {
    this._router.navigate(['/parametros']);

  }

  ngOnInit(): void {
    this.loadAreas();
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add') == 'add' ? 'agregar' : 'editar';
    });
    this._route.params.subscribe((params: { id: number }) => {
      this.idParametro = params.id;
      if (this.idParametro) {
        this.load();
      }
    });
  }

  async load(): Promise<void> {

    try {
      this._loadingService.register('parametro.form');
      let parametro: IParametro = await this._parametroService.getParametro(this.idParametro).toPromise();
      this.nombreGrupoParametro = parametro.NombreGrupoParametro;
      this.nombreParametro = parametro.NombreParametro;
      this.descripcionParametro = parametro.DescripcionParametro;
      this.valorParametro = parametro.ValorParametro;

      console.log('Validacion form not 1');
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrio un error cargando el parámetro', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('parametro.form');
      console.log('Validacion form not 2');
    }
  }

  async loadAreas(): Promise<void> {
    try {
      this._loadingService.register('areas.list');
      this.areas = await this._areaService.query().toPromise();
    } catch (error) {
      this.areas = await this._areaService.staticQuery().toPromise();
    } finally {
      this._loadingService.resolve('areas.list');
    }
  }


  async save(): Promise<void> {
    try {
      this._loadingService.register('parametro.form');
      this.parametro = {
        NombreGrupoParametro: this.nombreGrupoParametro,
        NombreParametro: this.nombreParametro,
        ValorParametro: this.valorParametro,
        Id_Parametro: this.idParametro,
        FechaCreacion: null,
        FechaModificacion: null,
        DescripcionParametro: this.descripcionParametro
      };
      console.log('Validacion form not 3');
      if (this.action === 'agregar') {
        await this._parametroService.add(this.parametro).toPromise();
        console.log('Validacion form not 4');
      } else {
        await this._parametroService.edit(this.parametro).toPromise();
        console.log('Validacion form not 5');
      }
      this._snackBarService.open('Parámetro Guardado', 'Ok', { duration: 2000 });
      this.goBack();
    } catch (error) {
      this._dialogService.openAlert({ message: 'Ocurrio un error guardando el parámetro.' , closeButton :'Aceptar'});
    } finally {
      this._loadingService.resolve('parametro.form');
    }

  }

  validarEspacios(input:string, inputText) {
    if(input.trim().length <= 0){
      inputText._updateValue('');
      this._dialogService.openAlert({message: 'No se admite ingresar sólo espacios en blanco.', closeButton :'Aceptar'});      
    }
  }
}
