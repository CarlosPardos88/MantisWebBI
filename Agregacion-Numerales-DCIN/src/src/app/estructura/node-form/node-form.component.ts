import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdLoadingService } from '@covalent/core/loading';
import { from } from 'rxjs';
import { ItemNode, ChecklistDatabase } from '../services/node.service';
import { NumeralcambiarioService, INumeral } from '../../services/numeralcambiario.service';

export interface NodeData {
  Desc_NodoContable: string;
  Id_NodoContable: number;
  Sk_RCNumeralCambiario: number;
  idnumeralcco: string;
  childs: ItemNode[];
  formulacion: Formulacion[];
  accionEstructura: string;
}

export interface Numeral {
  idnumeralcco: number;
  NombreNum: string;
}

export interface NumeralSaf {
  idnumeralsaf: number;
  NombreNum: string;
}

export interface Formulacion {
  Nodo: string;
  Signo: string;
}

export interface Operacion {
  Descripcion: string;
  Signo: string;
}

@Component({
  selector: 'app-node-form',
  templateUrl: './node-form.component.html',
  styleUrls: ['./node-form.component.scss']
})
export class NodeFormComponent implements OnInit {

  Sk_NodoContable: number;
  Id_Estructura: number;
  Id_NodoContable: number;
  Desc_NodoContable: string;
  Sk_NodoContablePadre: number;
  Num_Nivel: number;
  Num_Orden: number;
  Nombre_UsuarioCreacion: string;
  Fecha_Creacion: Date;
  Cb_Eliminado: string;
  Fecha_Eliminado: Date;
  Nombre_UsuarioEliminacion: string;

  Sk_RCNumeralCambiario: number;
  idnumeralcco: string;
  formulacion: Formulacion[] = [];

  accionEstructura: string;

  ArrayNumeralesSAF: INumeral[] = [

  ];

  ArrayNumeralesCCO: INumeral[] = [

  ];

  ArrayOperacion: Operacion[] = [
    { Descripcion: "No Aplica", Signo: "" },
    { Descripcion: "Suma (+)", Signo: "+" },
    { Descripcion: "Resta (-)", Signo: "-" }
  ];

  nodoForm: FormGroup;

  constructor(
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NodeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NodeData,
    private _numeralcambiarioService: NumeralcambiarioService
  ) {
    this.Desc_NodoContable = data.Desc_NodoContable;
    this.Id_NodoContable = data.Id_NodoContable;
    this.Sk_RCNumeralCambiario = data.Sk_RCNumeralCambiario;
    this.idnumeralcco = data.idnumeralcco;
    if (data.formulacion && data.formulacion.length > 0) {
      this.formulacion = data.formulacion;
      this.organizarFormulacion();
    } else {
      this.formulacion = [];
    }
    this.accionEstructura = data.accionEstructura;
  }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    try {
      this._loadingService.register('nodo.form');
      this.ArrayNumeralesSAF = await this._numeralcambiarioService.getNumerales().toPromise();
    } catch (error) {
      this.Desc_NodoContable = this.data.Desc_NodoContable;
      this.Id_NodoContable = this.data.Id_NodoContable;
      this.Sk_RCNumeralCambiario = this.data.Sk_RCNumeralCambiario;
      this.idnumeralcco = this.data.idnumeralcco;

      if (this.data.formulacion && this.data.formulacion.length > 0) {
        this.formulacion = this.data.formulacion;
        this.organizarFormulacion();
      } else {
        this.formulacion = [];
      }

      this.accionEstructura = this.data.accionEstructura;
    } finally {
      this._loadingService.resolve('nodo.form');
    }

  }

  async save(): Promise<void> {
    let datos: NodeData = {
      Desc_NodoContable: this.data.Desc_NodoContable,
      Id_NodoContable: this.data.Id_NodoContable,
      childs: this.data.childs,
      formulacion: this.data.formulacion,
      idnumeralcco: this.data.idnumeralcco,
      Sk_RCNumeralCambiario: this.data.Sk_RCNumeralCambiario,
      accionEstructura: this.data.accionEstructura
    }


    this.dialogRef.close(datos);
  }

  organizarFormulacion(): void {
    let formulacion: Formulacion[] = [];

    this.data.childs.forEach(c => {
      this.formulacion.forEach(f => {
        if (f.Nodo === c.name) {
          formulacion.push(f);
        }
      })
    });

    this.data.formulacion = [];
    this.data.formulacion = formulacion;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validarChilds(): boolean {
    if (this.data.childs) {
      if (this.data.childs.length > 0) {
        return true;
      }
    }
    return false;
  }

  agregarFormula(signo: string, nodo: ItemNode): void {

    let formulacion: Formulacion = {
      Nodo: nodo.name.toString(),
      Signo: signo
    }

    this.formulacion.push(formulacion);
    this.data.formulacion = this.formulacion;
  }

}
