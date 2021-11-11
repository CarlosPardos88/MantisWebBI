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
const CREAR_NODO = 'Crear';
const EDITAR_NODO = 'Editar';

const TREE_DATA: ItemFlatNode[] = [{
  Id_NodoContable: 0,
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
  Id_NodoContable: 1,
  name: "nivel1",
  Id_NodoContablePadre: 0,
  level: 1,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 1,
  expandable: null

},
{
  Id_NodoContable: 2,
  name: "nivel2",
  Id_NodoContablePadre: 1,
  level: 2,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 2,
  expandable: null,
  Desc_NodoContablePadre: "nivel1"
},
{
  Id_NodoContable: 3,
  name: "nivel3",
  Id_NodoContablePadre: 2,
  level: 3,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 3,
  expandable: null,
  Desc_NodoContablePadre: "nivel2"
},
{
  Id_NodoContable: 32,
  name: "nivel32",
  Id_NodoContablePadre: 2,
  level: 3,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 32,
  expandable: null,
  Desc_NodoContablePadre: "nivel2"
}, {
  Id_NodoContable: 33,
  name: "nivel33",
  Id_NodoContablePadre: 2,
  level: 3,
  childs: null,
  formulacion: null,
  idnumeralcco: "0",
  Sk_RCNumeralCambiario: 33,
  expandable: null,
  Desc_NodoContablePadre: "nivel2"

}/*,
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

}*/]
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
  levelInfo = [];
  estructura: IEstructura;
  action: string;
  Cb_EsDefinitiva2: boolean;

  stateStep1: StepState = StepState.None;
  stateStep2: StepState = StepState.None;
  stateStep3: StepState = StepState.None;
  stateStep4: StepState = StepState.None;

  disabled: boolean = false;
  enable: boolean = true;
  deactive: boolean = true;

  expandedNodes: ItemFlatNode[] = [];
  eliminatedNodes: ItemFlatNode[] = [];
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
    this.database.dataChange.next([{ name: "Nodo raiz", idNode: 0, children: null }]);

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

  hasChild = (_: number, _nodeData: ItemFlatNode) => {

    return _nodeData.expandable;
  }

  hasNoContent = (_: number, _nodeData: ItemFlatNode) => _nodeData.name === '';


  /* test ciglesias */

  buildNodeTree(obj: ItemFlatNode[]): ItemNode[] {
    let result: ItemNode[] = [];
    obj.forEach(element => {

      let nodo: ItemNode = new ItemNode();
      nodo.name = element.name;
      nodo.idNode = element.Id_NodoContable;

      nodo.children = this.findChild(obj, element.Id_NodoContable, element.name);

      if (element.level == 1) {
        result.push(nodo);
      }

    });


    return [{ name: this.Desc_Estructura, children: result, idNode: 0 }];
  }

  findChild(obj: ItemFlatNode[], idNodo, namePadre): ItemNode[] {
    let childs: ItemNode[] = [];

    obj.forEach((element, index) => {
      if (element.Id_NodoContablePadre == idNodo && element.Desc_NodoContablePadre == namePadre) {
        let child: ItemNode = new ItemNode();
        child.name = element.name;
        child.idNode = element.Id_NodoContable;
        child.children = this.findChild(obj, element.Id_NodoContable, element.name);
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

    let existingNode = this.nestedNodeMap.get(node);

    if (existingNode && (!existingNode.Id_NodoContable || existingNode.Id_NodoContable == 0
      || !existingNode.Id_NodoContablePadre || existingNode.Id_NodoContablePadre == 0)) {
      let tmpNode: ItemFlatNode[] = this.nodosconfig.filter(item => {
        return item.name == existingNode.name && item.Id_NodoContable == node.idNode
      });

      if (tmpNode && tmpNode.length > 0) {
        existingNode = tmpNode[0];
      }
    }


    const flatNode = existingNode && existingNode.name === node.name && existingNode.Id_NodoContable == node.idNode
      ? existingNode
      : new ItemFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.Id_NodoContable = node.idNode;
    if (existingNode) {
      flatNode.Id_NodoContable = existingNode.Id_NodoContable ? existingNode.Id_NodoContable : 0;
      flatNode.Id_NodoContablePadre = existingNode.Id_NodoContablePadre ? existingNode.Id_NodoContablePadre : 0;
      flatNode.Sk_RCNumeralCambiario = existingNode.Sk_RCNumeralCambiario ? existingNode.Sk_RCNumeralCambiario : 0;
      flatNode.idnumeralcco = existingNode.idnumeralcco ? existingNode.idnumeralcco : "0";
      flatNode.formulacion = existingNode.formulacion ? existingNode.formulacion : [];
      flatNode.Desc_NodoContablePadre = existingNode.Desc_NodoContablePadre;
      flatNode.orden = existingNode.orden;
    }

    flatNode.expandable = (node.children && node.children.length > 0);

    if ((!node.idNode || node.idNode == 0) && (flatNode.Id_NodoContable && flatNode.Id_NodoContable > 0)) {
      node.idNode = flatNode.Id_NodoContable;
    }

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

    let nodenew = this.database.insertItem(parentNode, { name: '' } as ItemNode);
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

    if (percentageX < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageX > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }

  }

  handleDrop(event, node) {
    event.preventDefault();
    let nodoamover: ItemFlatNode;
    let nodoItemNode: ItemFlatNode = this.dragNode;
    this.dataSource._flattenedData.forEach(n => {
      nodoamover = n.find(h => {
        return (h.name == nodoItemNode.name && h.Id_NodoContable == nodoItemNode.Id_NodoContable);
      })
    });

    let Id_NodoContable;
    let formulacion;
    let name;
    let idnumeralcco;
    let Sk_RCNumeralCambiario;
    let Desc_NodoContablePadre;

    if (nodoamover) {
      Id_NodoContable = nodoamover.Id_NodoContable;
      formulacion = nodoamover.formulacion;
      name = nodoamover.name;
      idnumeralcco = nodoamover.idnumeralcco;
      Sk_RCNumeralCambiario = nodoamover.Sk_RCNumeralCambiario;
      Desc_NodoContablePadre = nodoamover.Desc_NodoContablePadre;

    }

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
      this.dataSource._flattenedData.forEach(n => {
        nodoNew = n.find(h => h.name == newItem.name && h.Id_NodoContable == newItem.idNode)
      });

      this.database.deleteItem(this.flatNodeMap.get(this.dragNode));

      const parentNode = this.database.getParentFromNodes(newItem);

      let nodoPadre = this.nestedNodeMap.get(parentNode);

      nodoNew.Id_NodoContable = Id_NodoContable;
      nodoNew.Id_NodoContablePadre = nodoPadre.Id_NodoContable;
      nodoNew.formulacion = formulacion;
      nodoNew.idnumeralcco = idnumeralcco;
      nodoNew.Sk_RCNumeralCambiario = Sk_RCNumeralCambiario;
      nodoNew.Desc_NodoContablePadre = nodoPadre.name;


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

    this._dialogService
      .openConfirm({
        message: '¿Está seguro de borrar este nodo?',
        acceptButton: 'Aceptar', cancelButton: 'Cancelar'
      })
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          if (node.Sk_NodoContable) {
            this.eliminatedNodes.push(node);
          }

          const nestedNode = this.flatNodeMap.get(node);
          this.deleteChilds(nestedNode);

          this.deleteNodoArray(nestedNode.name, nestedNode.idNode);
          this.database.deleteItem(nestedNode);

        }
      });


  }

  deleteChilds(node: ItemNode) {
    let hijos = this.getChildren(node);
    if (hijos && hijos.length > 0) {
      hijos.forEach(h => {
        let hijos2 = this.getChildren(h);
        if (hijos2 && hijos2.length > 0) {
          this.deleteChilds(h);
        }
        let n = this.nestedNodeMap.get(h);

        if (n.Sk_NodoContable && n.Sk_NodoContable > 0) {
          n.cbEliminado = true;
          this.eliminatedNodes.push(n);
        }
        this.deleteNodoArray(h.name, h.idNode);
      });
    }
  }

  openDialog(node: ItemFlatNode, accion: string): void {

    const nestedNode = this.flatNodeMap.get(node);
    const parentNode = this.database.getParentFromNodes(nestedNode);

    let nodoPadre = this.nestedNodeMap.get(parentNode);
    let hijos;
    let descnode;
    let idNode;
    let formulacion;
    let idnumeralcco;
    let Sk_RCNumeralCambiario;
    let Id_NodoContable;
    let nodeToEdit: ItemFlatNode;

    if (CREAR_NODO === accion) {
      descnode = nestedNode.name;
      idNode = this.nodosconfig.reduce((acc, shot) => acc = acc > shot.Id_NodoContable ? acc : shot.Id_NodoContable, 0) + 1;
    } else if (EDITAR_NODO === accion) {
      let nodo = this.nodosconfig.find(n => n.name == node.name && n.Id_NodoContable == n.Id_NodoContable);

      nodeToEdit = { ...nodo }
      //console.log(nodo.formulacion);
      descnode = nodo.name;
      idNode = nodo.Id_NodoContable;
      hijos = this.getChildren(nestedNode);
      if (nodo.formulacion && nodo.formulacion.length > 0) {
          formulacion = nodo.formulacion
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
        NodoToEdit: nodeToEdit,
        Desc_NodoContable: descnode,
        Id_NodoContable: idNode,
        childs: hijos,
        formulacion: formulacion,
        idnumeralcco: idnumeralcco,
        Sk_RCNumeralCambiario: Sk_RCNumeralCambiario,
        accionEstructura: accion,
        Nodos: this.nodosconfig
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
          Id_NodoContablePadre: nodoPadre.Id_NodoContable,
          Desc_NodoContablePadre: nodoPadre.name
        }

        node.name = this.Desc_NodoContable;
        node.Id_NodoContable = this.Id_NodoContable;
        node.Sk_RCNumeralCambiario = this.Sk_RCNumeralCambiario;
        node.idnumeralcco = this.idnumeralcco;
        node.level = nivel;
        node.formulacion = this.formulacion;
        node.Id_NodoContablePadre = nodoPadre.Id_NodoContable;
        node.Desc_NodoContablePadre = nodoPadre.name;


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
          this.deleteNodoArray(descnode, idNode);
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
        this.deleteNodoArray(h.name, h.idNode);
      });
    }

    this.deleteNodoArray(nestedNode.name, nestedNode.idNode);
    this.database.deleteItem(nestedNode);
  }

  deleteNodoArray(descnode, idNodo): void {

    //elimina el antiguo del arreglo de nodos
    let nodel = this.nodosconfig.find(nodo => nodo.name === descnode && nodo.Id_NodoContable == idNodo);

    let index = this.nodosconfig.indexOf(nodel);

    if (index >= 0) {
      this.nodosconfig.splice(index, 1);
    }

  }


  ngOnInit(): void {
    try {
      if (sessionStorage.getItem('User')) {
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
  }  else 
  {
  this._router.navigate(['frmlogin']);
  }
}
catch (error) {
  this._router.navigate(['error']);
}
  }

  loadFakeData() {
    const data = this.buildNodeTree(TREE_DATA);
    this.nodosconfig = TREE_DATA;
    this.database.dataChange.next(data);

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
      // console.log(error);
      this._dialogService.openAlert({ message: 'Ocurrió error cargando la estructura', closeButton: 'Aceptar' });
      this.goBack();
    } finally {
      this.Cb_EsDefinitiva == 'S' ? this.Cb_EsDefinitiva2 = true : this.Cb_EsDefinitiva2 = false;
      this._loadingService.resolve('estructura.form');


    }
  }

  prepareData() {
    this.Cb_EsDefinitiva2 == true ? this.Cb_EsDefinitiva = 'S' : this.Cb_EsDefinitiva = 'N';

    if (sessionStorage.getItem('Menus')) {
      this.Nombre_UsuarioCreacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
      this.expandedNodes = [];

      this.dataSource._flattenedData.forEach(n => {
        n.forEach((h, index) => {

          let node: ItemFlatNode = {
            name: h.name,
            Id_NodoContable: h.Id_NodoContable,
            Id_NodoContablePadre: h.Id_NodoContablePadre,
            childs: null,
            formulacion: h.formulacion,
            idnumeralcco: h.idnumeralcco,
            Sk_RCNumeralCambiario: h.Sk_RCNumeralCambiario,
            level: h.level,
            Desc_NodoContablePadre: h.Desc_NodoContablePadre,
            orden: index
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
        this.estructura.NodosEliminados = this.eliminatedNodes;

      }

    }

    this.levelInfo = [];

    this.estructura.Nodos.forEach(a => {
      if (a.level > 0) {
        let index = this.indexOfLevel(a.level, this.levelInfo);
        if (index >= 0) {
          this.levelInfo[index] = { level: a.level, count: this.levelInfo[index].count + 1 };
        } else {
          this.levelInfo.push({ level: a.level, count: 1 });
        }
      }

    });

  }

  indexOfLevel(level, arrayInfo: any[]): number {

    let index = -1;

    if (arrayInfo.length > 0) {
      for (let i = 0; i < arrayInfo.length; i++) {
        if (arrayInfo[i].level == level) {
          index = i;
          break;
        }
      }
    }

    return index;

  }
  async save(): Promise<void> {
    try {
      this._loadingService.register('estructura.form');

      if (sessionStorage.getItem('Menus')) {


        if (this.action === 'add') {

          if (this.estructura.Nodos && this.estructura.Nodos.length > 1) {
           // console.log(this.estructura);
            let resultPost = await this._estructuraService.postCreateEstructura(this.estructura).toPromise();

            if (resultPost < 0) {
              this._snackBarService.open('Error guardando estructura guardada', 'Ok', { duration: 2000 });
            } else if (resultPost == 99) {
              this._snackBarService.open('Ya existe una estructura con el nombre: ' + this.estructura.Desc_Estructura + ", en la base de datos", 'Ok', { duration: 2000 });
            } else {
              this._snackBarService.open('Estructura guardada', 'Ok', { duration: 2000 });
              this.goBack();
            }


          } else {
            this._snackBarService.open('Debe agregar al menos un nodo a la estructura', 'Ok', { duration: 2000 });
          }

          //console.log(this.estructura);

        } else {
          if (this.estructura.Nodos && this.estructura.Nodos.length > 1) {
           // console.log(this.estructura);
            let resultPUT =  await this._estructuraService.putUpdateEstructura(this.Id_Estructura, this.estructura).toPromise();
        
            if (resultPUT < 0) {
              this._snackBarService.open('Error guardando estructura guardada', 'Ok', { duration: 2000 });
            } else if (resultPUT == 99) {
              this._snackBarService.open('Ya existe una estructura con el nombre: ' + this.estructura.Desc_Estructura + ", en la base de datos", 'Ok', { duration: 2000 });
            } else if (resultPUT == 98) {
              this._snackBarService.open('La Estructura no se puede editar, no es el usuario que la creo', 'Ok', { duration: 4000 });
            } else {
              this._snackBarService.open('Estructura guardada', 'Ok', { duration: 2000 });
              this.goBack();
            }

          } else {
            this._snackBarService.open('Debe agregar al menos un nodo a la estructura', 'Ok', { duration: 2000 });
          }

        }

      }

    } catch (error) {
      //console.log(error);
      this._dialogService.openAlert({ message: 'Error creando/editando la Estructura', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('estructura.form');
    }
  }

  updateArborl(): void {
    let nodoraiz = this.dataSource.data[0];

    this.database.updateItem(nodoraiz, 'Estructura: ' + this.Desc_NodoContable);
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

      this._dialogService
        .openConfirm({
          message: '¿Está seguro que desea salir sin guardar?',
          acceptButton: 'Aceptar'
        })
        .afterClosed().toPromise().then((confirm: boolean) => {
          if (confirm) {
            this._router.navigate(['/estructura']);
          }
        });
    }
    

  toggleCompleteStep1(): void {
    if (this.action == 'add' || this.dataSource.data.length < 2) {

      let nestedNode = this.dataSource.data[0];
      this.database.updateItem(nestedNode, 'Estructura: ' + this.Desc_Estructura)
    }
    this.stateStep1 = (this.stateStep1 === StepState.Complete ? StepState.None : StepState.Complete);
  }

  toggleCompleteStep2(): void {
    this.stateStep2 = (this.stateStep2 === StepState.Complete ? StepState.None : StepState.Complete);
  }

  toggleCompleteStep3(): void {
    this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
  }

  toggleCompleteStep4(): void {
    this.stateStep4 = (this.stateStep4 === StepState.Complete ? StepState.None : StepState.Complete);
  }
}
