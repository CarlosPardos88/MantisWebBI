import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdLoadingService } from '@covalent/core/loading';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ItemNode, ChecklistDatabase, ItemFlatNode } from '../services/node.service';
import { NumeralcambiarioService, INumeral } from '../../services/numeralcambiario.service';

export interface NodeData {
  Desc_NodoContable: string;
  Id_NodoContable: number;
  Sk_RCNumeralCambiario: number;
  idnumeralcco: string;
  childs: ItemNode[];
  formulacion: Formulacion[];
  accionEstructura: string;
  Nodos?: ItemFlatNode[];
  nodeToEdit: ItemFlatNode;
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
  Id_NodoContable: number;
  Signo: string;
  name: string;
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
  Desc_NodoContableAnt: string;
  Sk_NodoContablePadre: number;
  Num_Nivel: number;
  Num_Orden: number;
  Nombre_UsuarioCreacion: string;
  Fecha_Creacion: Date;
  Cb_Eliminado: string;
  Fecha_Eliminado: Date;
  Nombre_UsuarioEliminacion: string;
  Nodos: ItemFlatNode[] = [];

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
  nodeToEdit: ItemFlatNode;

  constructor(
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private fb: FormBuilder,
    private _snackBarService: MatSnackBar,
    public dialogRef: MatDialogRef<NodeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NodeData,
    private _numeralcambiarioService: NumeralcambiarioService
  ) {
    this.Desc_NodoContable = data.Desc_NodoContable;
    this.Desc_NodoContableAnt = data.Desc_NodoContable;
    this.Id_NodoContable = data.Id_NodoContable;
    this.Sk_RCNumeralCambiario = data.Sk_RCNumeralCambiario;
    this.idnumeralcco = data.idnumeralcco;
    this.Nodos = data.Nodos;

    if(data.nodeToEdit) {
      this.Desc_NodoContable = data.nodeToEdit.name;
      this.Id_NodoContable = data.nodeToEdit.Id_NodoContable;
      this.Sk_RCNumeralCambiario = data.nodeToEdit.Sk_RCNumeralCambiario;
      this.idnumeralcco = data.nodeToEdit.idnumeralcco;
    }

    if (data.formulacion && data.formulacion.length > 0 && this.data.childs && this.data.childs.length > 0) {
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
      console.log(error);
    } finally {
      this._loadingService.resolve('nodo.form');
    }

  }

  async save(): Promise<void> {

    let cloneData = { ...this.data }
    const { Nodos, ...datos } = cloneData;

   

    if (this.accionEstructura == 'Crear') {
    
      if (this.Nodos.some(f=>f.Id_NodoContable==datos.Id_NodoContable)) {

        this._snackBarService.open('Ya existe un nodo con Id_NodoContable: ' + this.data.Id_NodoContable , 'Ok', { duration: 3000 });
        return;
        
      }


      if (this.exist()) {
        this._snackBarService.open('Ya existe un nodo con Id_NodoContable: ' + this.data.Id_NodoContable + ' y Desc_NodoContable: ' + this.data.Desc_NodoContable + ', en esta estructura.', 'Ok', { duration: 3000 });
        return;
      } else {
        this.dialogRef.close(datos);
      }

    } if (this.accionEstructura == 'Editar') {

      const nodo = this.Nodos.find(f => f.Id_NodoContable === datos.Id_NodoContable)

      if (this.existDuplicate(datos.Id_NodoContable, datos.Desc_NodoContable)) {
        this._snackBarService.open('Ya existe un nodo con Desc_NodoContable: ' + this.data.Desc_NodoContable + ', en esta estructura.', 'Ok', { duration: 3000 });
        return;
      }


      if (nodo) {
        nodo.Desc_NodoContablePadre = datos.Desc_NodoContable;
        nodo.Sk_RCNumeralCambiario = datos.Sk_RCNumeralCambiario;
        nodo.idnumeralcco = datos.idnumeralcco;
        this.dialogRef.close(datos);
      }
    }
    else {

      const nodo = this.Nodos.find(f => f.Id_NodoContable === datos.Id_NodoContable)

      if (this.existDuplicate(datos.Id_NodoContable, datos.Desc_NodoContable)) {
        this._snackBarService.open('Ya existe un nodo con Desc_NodoContable: ' + this.data.Desc_NodoContable + ', en esta estructura.', 'Ok', { duration: 3000 });
        return;
      } else {
        this.dialogRef.close(datos);
      }
    }
  }

  exist(): boolean {
    return (this.Nodos || []).some(nodo => {
      
      return this.data.Id_NodoContable === nodo.Id_NodoContable || this.data.Desc_NodoContable === nodo.name
    });
  }

  existDuplicate = (id: number, name: string) =>
    (this.Nodos || []).some(s => s.name === name && s.Id_NodoContable !== id);

  existDuplicatesIds = (id: number) => 
    (this.Nodos || []).filter(f => f.Id_NodoContable === id).length > 1 

  organizarFormulacion(): void {
    let formulacion: Formulacion[] = [];
    this.data.childs.forEach(c => {
      this.formulacion.forEach(f => {

        if (f.name === c.name) {
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
      name: nodo.name.toString(),
      Signo: signo,
      Id_NodoContable: nodo.idNode
    }
    this.formulacion = this.formulacion.filter(item=>item.Id_NodoContable != nodo.idNode);
    this.formulacion.push(formulacion);
    this.data.formulacion = this.formulacion;
  }

  getFormulacion(node: ItemNode) {
    let form = this.data.formulacion.find((f) => { return f.Id_NodoContable == node.idNode && f.name == node.name });

    let signo = "";
    if (form) {
      signo = form.Signo
    }

    return signo;
  }
}
