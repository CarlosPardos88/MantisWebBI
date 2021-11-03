import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdLoadingService } from '@covalent/core/loading';
import { StepState } from '@covalent/core/steps';
import { CryptoService } from 'src/services/crypto.services';
import { IEstructura, EstructuraService } from '../services/estructura.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import * as echarts from 'echarts/lib/echarts';

import { ChecklistDatabase, ItemFlatNode, ItemNode } from '../services/node.service';
import { NodeFormComponent } from '../node-form/node-form.component';
import { Observable } from 'rxjs';
import { NodoDBService } from 'src/app/services/nodo-db.service';

export interface Formulacion {
  Nodo: string;
  Signo: string;
  IdNodo?: number;
  IdNodoPadre?: number;
}

//Constantes
const CREAR_NODO = 'crear';
const EDITAR_NODO = 'editar';

const TREE_DATA: ItemFlatNode[] = [{
  Id_NodoContable: 1,
  name: "nodo 1",
  Id_NodoContablePadre: null,
  level: 0,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 0,
  expandable: null

},
{
  Id_NodoContable: 2,
  name: "nodo 2",
  Id_NodoContablePadre: 1,
  level: 1,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 0,
  expandable: null

},
{
  Id_NodoContable: 3,
  name: "hijo 2-3",
  Id_NodoContablePadre: 2,
  level: 2,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 0,
  expandable: null
},
{
  Id_NodoContable: 5,
  name: "hijo 2-5",
  Id_NodoContablePadre: 2,
  level: 2,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 0,
  expandable: null
},
{
  Id_NodoContable: 6,
  name: "hijo 2-6",
  Id_NodoContablePadre: 2,
  level: 2,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 0,
  expandable: null
}, {
  Id_NodoContable: 7,
  name: "hijo 2-7",
  Id_NodoContablePadre: 2,
  level: 2,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 0,
  expandable: null
},
{
  Id_NodoContable: 4,
  name: "hijo 7-4",
  Id_NodoContablePadre: 7,
  level: 3,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 0,
  expandable: null
},
{
  Id_NodoContable: 41,
  name: "hijo segundo",
  Id_NodoContablePadre: 7,
  level: 4,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 0,
  expandable: null
},
{
  Id_NodoContable: 23,
  name: "nodo 23",
  Id_NodoContablePadre: 1,
  level: 1,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 0,
  expandable: null

}]
  ;


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ChecklistDatabase]
})



export class EstructuraFormComponent implements OnInit {

  Id_Estructura: number;
  Desc_Estructura: string;
  Fecha_InicioVigencia: Date;
  Fecha_FinVigencia: Date;
  Cb_EsDefinitiva: string;
  Nombre_UsuarioCreacion: string;
  Cb_Eliminado: string;
  Nombre_UsuarioEliminacion: string;
  Fecha_Creacion: string;

  estructura: IEstructura;
  action: string;
  Cb_EsDefinitiva2: boolean;

  stateStep1: StepState = StepState.Required;
  stateStep2: StepState = StepState.None;
  stateStep3: StepState = StepState.None;

  disabled: boolean = false;
  enable: boolean = true;
  deactive: boolean = true;

  expandedNodes: ItemFlatNode[] = [];

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ItemFlatNode, ItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<ItemNode, ItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: ItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<ItemFlatNode>;

  treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;

  dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ItemFlatNode>(true /* multiple */);

  /* Drag and drop */
  dragNode: any;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number;
  dragNodeExpandOverArea: string;

  /**
 * The Json object for to-do list data.
 */


  @ViewChild('emptyItem', { static: false }) emptyItem: ElementRef;

  constructor(
    private _estructuraService: EstructuraService,
    private _nodoService: NodoDBService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MatSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _cryptoService: CryptoService,
    private database: ChecklistDatabase,
    public dialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = [];
    database.dataChange.subscribe(data => {
      this.dataSource.data = [];
      this.dataSource.data = data;
    });


  }

  show: boolean = false;

  type: any;
  count: number = 0;
  Desc_NodoContable: string;
  Id_NodoContable: number;
  Sk_RCNumeralCambiario: number;
  idnumeralcco: string;
  tnselected: string;
  signo: string;
  label: number;
  formulacion: Formulacion[] = [];
  Id_NodoContablePadre: number;

  nodosconfig: ItemFlatNode[] = [];

  /*
  * Gráfica de Árbol
  */
  options: any;
  data: any[] = [];

  getLevel = (node: ItemFlatNode) => node.level;

  isExpandable = (node: ItemFlatNode) => node.expandable;

  getChildren = (node: ItemNode): ItemNode[] => node.children;

  hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: ItemFlatNode) => _nodeData.name === '';


  /* test ciglesias */

  buildNodeTree(obj: ItemFlatNode[]): ItemNode[] {
    let result: ItemNode[] = [];
    obj.forEach(element => {
      let nodo: ItemNode = new ItemNode();
      nodo.name = element.name;
      nodo.children = this.findChild(obj, element.Id_NodoContable);
      if (element.level == 1) {
        result.push(nodo);
      }
    });


    return [{ name: this.Desc_Estructura, children: result }];
  }

  findChild(obj: ItemFlatNode[], idNodo): ItemNode[] {
    let childs: ItemNode[] = [];
    obj.forEach((element, index) => {

      if (element.Id_NodoContablePadre == idNodo) {
        let child: ItemNode = new ItemNode();
        child.name = element.name;
        child.children = this.findChild(obj, element.Id_NodoContable);
        childs.push(child);
      }
    });
    return childs.length > 0 ? childs : null;
  }

  /* end test ciglesias*/
  /**
  * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
  */
  transformer = (node: ItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : new ItemFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    if (existingNode) {
      flatNode.Id_NodoContable = existingNode.Id_NodoContable ? existingNode.Id_NodoContable : 0;
      flatNode.Id_NodoContablePadre = existingNode.Id_NodoContablePadre ? existingNode.Id_NodoContablePadre : 0;
      flatNode.Sk_RCNumeralCambiario = existingNode.Sk_RCNumeralCambiario ? existingNode.Sk_RCNumeralCambiario : 0;
      flatNode.idnumeralcco = existingNode.idnumeralcco ? existingNode.idnumeralcco : "0";
      flatNode.formulacion = existingNode.formulacion ? existingNode.formulacion : [];
    }

    flatNode.expandable = (node.children && node.children.length > 0);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  ItemSelectionToggle(node: ItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: ItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    let nodenew = this.database.insertItem(parentNode, '');
    this.treeControl.expand(node);
    let nodeIFN = this.nestedNodeMap.get(nodenew);
    this.openDialog(nodeIFN, CREAR_NODO);
  }

  /** Save the node to database */
  saveNode(node: ItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);

    //this.database.updateItem(nestedNode, itemValue);
    //this.openDialog(node);
  }

  handleDragStart(event, node) {
    event.dataTransfer.setData('foo', 'bar');
    event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

  handleDragOver(event, node) {
    event.preventDefault();
    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
        if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
          this.treeControl.expand(node);
        }
      }
    } else {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }

    // Handle drag area
    const percentageX = event.offsetX / event.target.clientWidth;
    const percentageY = event.offsetY / event.target.clientHeight;
    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageY > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  handleDrop(event, node) {
    event.preventDefault();
    let nodoamover: ItemFlatNode;
    let nodoItemNode: ItemNode = this.dragNode;
    this.dataSource._expandedData.forEach(n => {
      nodoamover = n.find(h => h.name == nodoItemNode.name)
    });

    let Id_NodoContable = nodoamover.Id_NodoContable;
    let formulacion = nodoamover.formulacion;
    let name = nodoamover.name;
    let idnumeralcco = nodoamover.idnumeralcco;
    let Sk_RCNumeralCambiario = nodoamover.Sk_RCNumeralCambiario;

    if (node !== this.dragNode) {
      let newItem: ItemNode;
      if (this.dragNodeExpandOverArea === 'above') {
        newItem = this.database.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } else if (this.dragNodeExpandOverArea === 'below') {
        newItem = this.database.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } else {
        newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      }

      let nodoNew: ItemFlatNode;
      this.dataSource._expandedData.forEach(n => {
        nodoNew = n.find(h => h.name == newItem.name)
      });

      this.database.deleteItem(this.flatNodeMap.get(this.dragNode));

      const parentNode = this.database.getParentFromNodes(newItem);
      let nodoPadre = this.nestedNodeMap.get(parentNode);

      nodoNew.Id_NodoContable = Id_NodoContable;
      nodoNew.Id_NodoContablePadre = nodoPadre.Id_NodoContable;
      nodoNew.formulacion = formulacion;
      nodoNew.idnumeralcco = idnumeralcco;
      nodoNew.Sk_RCNumeralCambiario = Sk_RCNumeralCambiario;

      this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
    }
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  handleDragEnd(event) {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  editItem(node: ItemFlatNode) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode, 'nuevo');
  }

  deleteItem2(node: ItemFlatNode) {
    //let FechaEliminado = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    //proceso.Fecha_Eliminado = FechaEliminado;
    this._dialogService
      .openConfirm({
        message: '¿Está seguro de borrar este nodo?',
        acceptButton: 'Aceptar', cancelButton: 'Cancelar'
      })
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          const nestedNode = this.flatNodeMap.get(node);
          let hijos = this.getChildren(nestedNode);
          if (hijos && hijos.length > 0) {
            hijos.forEach(h => {
              this.deleteNodoArray(h.name);
            });
          }

          this.deleteNodoArray(nestedNode.name);
          this.database.deleteItem(nestedNode);
        }
      });


  }

  openDialog(node: ItemFlatNode, accion: string): void {
    
    const nestedNode = this.flatNodeMap.get(node);
    const parentNode = this.database.getParentFromNodes(nestedNode);
    
    let nodoPadre = this.nestedNodeMap.get(parentNode);
    let hijos;
    let descnode;
    let formulacion;
    let idnumeralcco;
    let Sk_RCNumeralCambiario;
    let Id_NodoContable;

    if (CREAR_NODO === accion) {
      descnode = nestedNode.name;
    } else if (EDITAR_NODO === accion) {
      let nodo = this.nodosconfig.find(n => n.name == node.name);

      descnode = nodo.name;
      hijos = this.getChildren(nestedNode);
      if (nodo.formulacion && nodo.formulacion.length > 0) {
        formulacion = nodo.formulacion;
      } else {
        formulacion = [];
      }

      idnumeralcco = nodo.idnumeralcco;
      Sk_RCNumeralCambiario = nodo.Sk_RCNumeralCambiario;
      Id_NodoContable = nodo.Id_NodoContable;
    }

    this._dialogService.open(NodeFormComponent, {
      width: '50%',
      data: {
        Desc_NodoContable: descnode, Id_NodoContable: Id_NodoContable, childs: hijos, formulacion: formulacion,
        idnumeralcco: idnumeralcco, Sk_RCNumeralCambiario: Sk_RCNumeralCambiario, accionEstructura: this.action
      }
    }).afterClosed().subscribe(result => {
      if (result) {

        this.Desc_NodoContable = result ? result.Desc_NodoContable : this.Desc_NodoContable;
        this.Id_NodoContable = result ? result.Id_NodoContable : this.Id_NodoContable;
        this.Sk_RCNumeralCambiario = result ? result.Sk_RCNumeralCambiario : this.Sk_RCNumeralCambiario;
        this.idnumeralcco = result ? result.idnumeralcco : this.idnumeralcco;
        this.formulacion = result ? result.formulacion : this.formulacion;


        let nivel = this.getLevel(node);
        let nodoconfig: ItemFlatNode = {
          name: this.Desc_NodoContable,
          Id_NodoContable: this.Id_NodoContable,
          Sk_RCNumeralCambiario: this.Sk_RCNumeralCambiario,
          idnumeralcco: this.idnumeralcco,
          level: nivel,
          childs: null,
          formulacion: this.formulacion,
          Id_NodoContablePadre: nodoPadre.Id_NodoContable
        }

        node.name = this.Desc_NodoContable;
        node.Id_NodoContable = this.Id_NodoContable;
        node.Sk_RCNumeralCambiario = this.Sk_RCNumeralCambiario;
        node.idnumeralcco = this.idnumeralcco;
        node.level = nivel;
        node.formulacion = this.formulacion;
        node.Id_NodoContablePadre = nodoPadre.Id_NodoContable;


        if (CREAR_NODO === accion) {
          //si no existe el nodo y la descripción no es vacía agrega el nodo
          if (nodoconfig.name) {
            this.nodosconfig.push(nodoconfig);
            this.database.updateItem(nestedNode, nodoconfig.name);
          }
        } else if (EDITAR_NODO === accion) {
          //si existe el nodo y la descripción no es vacía actualizada el nodo
          if (nodoconfig.name) {
            this.database.updateItem(nestedNode, nodoconfig.name);
            this.nodosconfig.push(nodoconfig);
          }
          //elimina el anterior del arreglo de nodos
          this.deleteNodoArray(descnode);
        } else {

          //se elimina el nodo que se creó sin datos
          this.deleteItem2(node);
        }


      } else {
        if (accion == CREAR_NODO) {
          this.deleteNodeEmpty(node);
        }

      }
      this._changeDetectorRef.detectChanges();
    });
  }

  deleteNodeEmpty(node: ItemFlatNode) {

    const nestedNode = this.flatNodeMap.get(node);
    let hijos = this.getChildren(nestedNode);
    if (hijos && hijos.length > 0) {
      hijos.forEach(h => {
        this.deleteNodoArray(h.name);
      });
    }

    this.deleteNodoArray(nestedNode.name);
    this.database.deleteItem(nestedNode);
  }

  deleteNodoArray(descnode): void {

    //elimina el antiguo del arreglo de nodos
    let nodel = this.nodosconfig.find(nodo => nodo.name === descnode);
    let index = this.nodosconfig.indexOf(nodel);
    if (index > 0) {
      this.nodosconfig.splice(index, 1);
    }

  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 2 ? url[2].path : 'add');
    });
    this._route.params.subscribe((params: { Id_Estructura: number, Desc_Estructura: string }) => {
      this.Id_Estructura = params.Id_Estructura;
      this.Desc_Estructura = params.Desc_Estructura;
      if (this.Id_Estructura && this.Desc_Estructura) {
        this.load();
      }
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('estructura.form');
      let estructura: IEstructura[] = await this._estructuraService.getEstructuraByIdName(this.Id_Estructura, this.Desc_Estructura).toPromise();
      this.Fecha_InicioVigencia = estructura[0].Fecha_InicioVigencia;
      this.Fecha_FinVigencia = estructura[0].Fecha_FinVigencia;
      this.Cb_EsDefinitiva = estructura[0].Cb_EsDefinitiva;
      this.Nombre_UsuarioCreacion = estructura[0].Nombre_UsuarioCreacion;
      this.Cb_Eliminado = estructura[0].Cb_Eliminado;
      this.Nombre_UsuarioEliminacion = estructura[0].Nombre_UsuarioEliminacion;
      this.Fecha_Creacion = estructura[0].Fecha_Creacion;
      this.estructura = estructura[0];
      this.estructura.Nodos = await this._nodoService.getNodo(this.Id_Estructura, this.Desc_Estructura).toPromise();

      const data = this.buildNodeTree(this.estructura.Nodos);
      this.nodosconfig = this.estructura.Nodos;
      this.database.dataChange.next(data);

    } catch (error) {
      console.log(error);
      this._dialogService.openAlert({ message: 'Ocurrió error cargando la estructura', closeButton: 'Aceptar' });
    } finally {
      this.Cb_EsDefinitiva == 'S' ? this.Cb_EsDefinitiva2 = true : this.Cb_EsDefinitiva2 = false;
      this._loadingService.resolve('estructura.form');


    }
  }

  async save(): Promise<void> {
    try {
      this._loadingService.register('estructuraForm.form');
      this.Cb_EsDefinitiva2 == true ? this.Cb_EsDefinitiva = 'S' : this.Cb_EsDefinitiva = 'N';

      if (sessionStorage.getItem('Menus')) {
        this.Nombre_UsuarioCreacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
        this.expandedNodes = [];

        this.dataSource._flattenedData.forEach(n => {
          n.forEach(h => {

            let node: ItemFlatNode = {
              name: h.name,
              Id_NodoContable: h.Id_NodoContable,
              Id_NodoContablePadre: h.Id_NodoContablePadre,
              childs: null,
              formulacion: h.formulacion,
              idnumeralcco: h.idnumeralcco,
              Sk_RCNumeralCambiario: h.Sk_RCNumeralCambiario,
              level: h.level
            };
            this.expandedNodes.push(node);
          });
        });

        if (this.action === 'add') {
          this.estructura = {
            Id_Estructura: this.Id_Estructura,
            Cb_Eliminado: 'N',
            Cb_EsDefinitiva: this.Cb_EsDefinitiva,
            Desc_Estructura: this.Desc_Estructura,
            Fecha_Creacion: null,
            Fecha_FinVigencia: this.Fecha_FinVigencia,
            Fecha_InicioVigencia: this.Fecha_InicioVigencia,
            Nombre_UsuarioCreacion: this.Nombre_UsuarioCreacion,
            Nombre_UsuarioEliminacion: null,
            Nodos: this.expandedNodes
          }
          
          await this._estructuraService.postCreateEstructura(this.estructura).toPromise();
        } else {
          this.estructura = {
            Id_Estructura: this.Id_Estructura,
            Cb_Eliminado: this.Cb_Eliminado,
            Cb_EsDefinitiva: this.Cb_EsDefinitiva,
            Desc_Estructura: this.Desc_Estructura,
            Fecha_Creacion: this.Fecha_Creacion,
            Fecha_FinVigencia: this.Fecha_FinVigencia,
            Fecha_InicioVigencia: this.Fecha_InicioVigencia,
            Nombre_UsuarioCreacion: this.Nombre_UsuarioCreacion,
            Nombre_UsuarioEliminacion: this.Nombre_UsuarioEliminacion,
            Nodos: this.expandedNodes
          }
          
        }

      }
      this._snackBarService.open('Estructura guardada', 'Ok', { duration: 2000 });
      this.goBack();
    } catch (error) {
      console.log(error);
      this._dialogService.openAlert({ message: 'Error creando/editando la Estructura', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('estructuraForm.form');
    }
  }

  updateArborl(): void {
    let nodoraiz = this.dataSource.data[0];
    this.database.updateItem(nodoraiz, this.Desc_NodoContable);
  }

  isRoot(nodo: ItemFlatNode): Boolean {
    if (nodo.name == this.dataSource.data[0].name) {
      return true;
    } else {
      return false;
    }
  }


  /*
  * Configuración de la gráfica
  */
  configurarGrafica(): void {

    this.data = [];
    this._changeDetectorRef.detectChanges();

    this.data = this.dataSource.data;

    this._changeDetectorRef.detectChanges();

    echarts.util.each(this.data[0].children, (datum: any, index: number) => {
      return index % 2 === 0 && (datum.collapsed = true);
    });

    this._changeDetectorRef.detectChanges();
  }

  goBack(): void {
    this._router.navigate(['/estructura']);
  }

  toggleCompleteStep1(): void {
    if (this.action == 'add' || this.dataSource.data.length < 2) {
      let nestedNode = this.dataSource.data[0];
      this.database.updateItem(nestedNode, this.Desc_Estructura)
    }
    this.stateStep1 = (this.stateStep1 === StepState.Complete ? StepState.Required : StepState.Complete);
  }

  toggleCompleteStep2(): void {
    this.stateStep2 = (this.stateStep2 === StepState.Complete ? StepState.None : StepState.Complete);
  }

  toggleCompleteStep3(): void {
    this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
  }
}
