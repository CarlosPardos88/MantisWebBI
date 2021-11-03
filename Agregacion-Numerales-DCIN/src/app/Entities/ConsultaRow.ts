export interface ItemFlatNode {
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