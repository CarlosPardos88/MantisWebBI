import { Injectable } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';
import { BehaviorSubject } from 'rxjs';


/**
 * Node for to-do name
 */
export class ItemNode {
  children: ItemNode[];
  name: string;

}

/** Flat to-do item node with expandable and level information */
export class ItemFlatNode {
  name?: string;
  level?: number;
  Id_NodoContable?: number;
  Id_NodoContablePadre?: number;
  Sk_RCNumeralCambiario?: number;
  idnumeralcco?: string;
  formulacion?: any[];
  expandable?: boolean;
  childs?: any;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = { Nodo1: {} };

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
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `ItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `ItemNode`.
   */
  buildFileTree(obj: object, level: number): ItemNode[] {
    return Object.keys(obj).reduce<ItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new ItemNode();
      node.name = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.name = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: ItemNode, name: string): ItemNode {
    if (!parent.children) {
      parent.children = [];
    }
    const newItem = { name: name } as ItemNode;
    parent.children.push(newItem);
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemAbove(node: ItemNode, name: string): ItemNode {
    const parentNode = this.getParentFromNodes(node);
    const newItem = { name: name } as ItemNode;
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node), 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemBelow(node: ItemNode, name: string): ItemNode {
    const parentNode = this.getParentFromNodes(node);
    const newItem = { name: name } as ItemNode;
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
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
        if (child === node) {
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
    const newItem = this.insertItem(to, from.name);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemAbove(from: ItemNode, to: ItemNode): ItemNode {
    const newItem = this.insertItemAbove(to, from.name);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemBelow(from: ItemNode, to: ItemNode): ItemNode {
    const newItem = this.insertItemBelow(to, from.name);
    if (from.children) {
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