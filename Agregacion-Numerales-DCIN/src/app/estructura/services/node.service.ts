import { Injectable, ɵConsole } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';
import { BehaviorSubject } from 'rxjs';


/**
 * Node for to-do name
 */
export class ItemNode {
  children?: ItemNode[];
  name: string;
  idNode: number;
}

/** Flat to-do item node with expandable and level information */
export class ItemFlatNode {
  name?: string;
  level?: number;
  Id_NodoContable?: number;
  Id_NodoContablePadre?: number;
  Desc_NodoContablePadre?: string;
  Sk_RCNumeralCambiario?: number;
  idnumeralcco?: string;
  formulacion?: any[];
  expandable?: boolean;
  childs?: any;
  cbEliminado?: boolean;
  fechaEliminado?: string;
  Sk_NodoContable?: number;
  orden?: number;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<ItemNode[]>([]);

  get data(): ItemNode[] { return this.dataChange.value; }

  constructor(
    private _dialogService: TdDialogService,
  ) {
    this.dataChange.subscribe((datos) => {

    });
  }

  /** Add an item to to-do list */
  insertItem(parent: ItemNode, newItem: ItemNode): ItemNode {
    if (!parent.children) {
      parent.children = [];
    }

    parent.children.push(newItem);
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemAbove(node: ItemNode, newItem: ItemNode): ItemNode {

    const parentNode = this.getParentFromNodes(node);

    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node), 0, { name: newItem.name, idNode: newItem.idNode, children: newItem.children } as ItemNode);
    } else {
      this.data.splice(this.data.indexOf(node), 0, { name: newItem.name, idNode: newItem.idNode, children: newItem.children } as ItemNode);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemBelow(node: ItemNode, newItem: ItemNode): ItemNode {

    const parentNode = this.getParentFromNodes(node);

    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, { name: newItem.name, idNode: newItem.idNode, children: newItem.children } as ItemNode);
    } else {
      this.data.splice(this.data.indexOf(node) + 1, 0, { name: newItem.name, idNode: newItem.idNode, children: newItem.children } as ItemNode);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  getParentFromNodes(node: ItemNode): ItemNode {

    for (let i = 0; i < this.data.length; ++i) {
      const currentRoot = this.data[i];
      const parent = this.getParent(currentRoot, node);
      if (parent != null) {
        return parent;
      }
    }
    return null;
  }

  getParent(currentRoot: ItemNode, node: ItemNode): ItemNode {

    if (currentRoot.children && currentRoot.children.length > 0) {
      for (let i = 0; i < currentRoot.children.length; ++i) {
        const child = currentRoot.children[i];
        if ((child.idNode == node.idNode && child.name == node.name)) {
          return currentRoot;
        } else if (child.children && child.children.length > 0) {
          const parent = this.getParent(child, node);
          if (parent != null) {
            return parent;
          }
        }
      }
    }
    return null;
  }

  updateItem(node: ItemNode, name: string) {

    node.name = name;
    this.dataChange.next(this.data);
  }

  deleteItem(node: ItemNode) {

    this.deleteNode(this.data, node);
    this.dataChange.next(this.data);
  }

  copyPasteItem(from: ItemNode, to: ItemNode): ItemNode {

    const newItem = this.insertItem(to, from);

   
    if (from.children) {
      from.children.forEach(child => {
        if (!this.existChild(child, newItem.children)) {
          this.copyPasteItem(child, newItem);
        }

      });
    }
    return newItem;
  }

  existChild(child: ItemNode, children: ItemNode[]): boolean {
    let result = false;
    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        let element: ItemNode = children[i];

        if (element.idNode == child.idNode && element.name == child.name) {
          result = true;
          break;
        }
      }

    }
    return result;
  }
  copyPasteItemAbove(from: ItemNode, to: ItemNode): ItemNode {

    const newItem = this.insertItemAbove(to, from);
    if (from.children) {
      newItem.children = [];
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemBelow(from: ItemNode, to: ItemNode): ItemNode {

    const newItem = this.insertItemBelow(to, from);

    if (from.children) {
      newItem.children = [];
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  deleteNode(nodes: ItemNode[], nodeToDelete: ItemNode) {
    
    const index = nodes.indexOf(nodeToDelete, 0);
    if (index > -1) {
      nodes.splice(index, 1);
    } else {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          this.deleteNode(node.children, nodeToDelete);
        }
      });
    }
  }
}