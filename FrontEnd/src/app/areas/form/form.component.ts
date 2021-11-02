import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';

import { AreasService, IArea } from '../services/areas.service';

@Component({
  selector: 'qs-area-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class AreasFormComponent implements OnInit {

  Id_AreaNegocio: number;
  Nombre_AreaNegocio: string;
  Desc_AreaNegocio: string;
  Nombre_CarpetaWorkflows: string;
  Num_InicioRangoCodProceso: number;
  Num_FinRangoCodProceso: number;



  area: IArea;
  action: string;

  constructor(private _areaService: AreasService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,) { }

  goBack(): void {
    this._router.navigate(['/areas']);
  }

  ngOnInit() {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: {Id_AreaNegocio: number}) => {
      this.Id_AreaNegocio = params.Id_AreaNegocio;
      if (this.Id_AreaNegocio) {
        this.load();
      }
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('area.form');
      let area: IArea = await this._areaService.get(this.Id_AreaNegocio).toPromise();
      this.Nombre_AreaNegocio = area.Nombre_AreaNegocio;
      this.Desc_AreaNegocio = area.Desc_AreaNegocio;
      this.Nombre_CarpetaWorkflows = area.Nombre_CarpetaWorkflows;
      this.Num_FinRangoCodProceso = area.Num_FinRangoCodProceso;
      this.Num_InicioRangoCodProceso = area.Num_InicioRangoCodProceso;
    } catch (error) {
      this._dialogService.openAlert({message: 'Ocurrió error cargando el area', closeButton :'Aceptar'});
    } finally {
      this._loadingService.resolve('area.form');
    }
  }

  async save(): Promise<void> {

    try {
      this._loadingService.register('area.form');
      this.area = {
        Nombre_AreaNegocio: this.Nombre_AreaNegocio,
        Desc_AreaNegocio : this.Desc_AreaNegocio,
        Nombre_CarpetaWorkflows: this.Nombre_CarpetaWorkflows,
        Num_FinRangoCodProceso: this.Num_FinRangoCodProceso,
        Num_InicioRangoCodProceso: this.Num_InicioRangoCodProceso,
        Id_AreaNegocio: this.Id_AreaNegocio,
      };
      if (this.action === 'add') {
        await this._areaService.postCreateArea(this.area).toPromise();
      } else {
        await this._areaService.putArea(this.Id_AreaNegocio, this.area).toPromise();
      }
      this._snackBarService.open('Area guardada', 'Ok',{duration:2000});
      this.goBack();
    } catch (error) {
      this._dialogService.openAlert({message: "No se puede crear el objeto: "+error, closeButton :'Aceptar'});
    } finally {
      this._loadingService.resolve('area.form');
    }
  }

  validarEspacios(input:string, inputText) {
    if(input.trim().length <= 0){
      inputText._updateValue('');
      this._dialogService.openAlert({message: 'No se admite ingresar sólo espacios en blanco.', closeButton :'Aceptar'});      
    }
  }

  validarCero(input:number, inputText) {
    if(input == 0){
      inputText._updateValue('');
      this._dialogService.openAlert({message: 'No se admite ingresar valor cero (0).', closeButton :'Aceptar'});
    }
  }
}
