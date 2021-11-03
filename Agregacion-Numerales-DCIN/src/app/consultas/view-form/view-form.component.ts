import { ExportService } from './../services/export.service';
import { CryptoService } from './../../../services/crypto.services';
import { ItemNode } from './../../estructura/services/node.service';
import { INodeRelation } from './../../Entities/RelationQuery';
import { ItemFlatNode } from './../../Entities/ItemFlatNode';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdLoadingService } from '@covalent/core/loading';
import { MatSnackBar } from '@angular/material/snack-bar';
import { customPaginator } from '../../custom/customPaginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { from } from 'rxjs';
import { PeriodicidadConsultasService, IPeridicidad } from '../services/PeriodicidadConsultas.service';
import { AgregacionService, IAgregacion, } from '../services/agregacion.service';
import { EstructuraService, IEstructura } from '../../estructura/services/estructura.service';
import { Consulta, ConsultaagregacionService, IConsulta } from '../services/consultaagregacion.service';
import { Resultado, ResultadosService, IResultado } from '../services/resultados.service';
import { ConsultaResultadoService } from '../services/consulta-resultado.service'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: customPaginator() }]
})
export class ViewFormComponent implements OnInit {
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
  ArrayConsulta: IConsulta[] = [];

  filterEntity: Resultado;
  filterType: MatTableFilter;
  displayedColumns = ['Id_NodoContable', 'Desc_NodoContable'];
  displayedColumnsTree = ['IdNodo'];

  dataSource: MatTableDataSource<INodeRelation>;
  resultado: INodeRelation[];
  filteredResultado: INodeRelation[];
  queryResult: ItemFlatNode[] = [];
  relations: INodeRelation[] = [];
  showableNodes: INodeRelation[] = [];
  nodeMap: any;
  deep: number;
  order: number;
  cutsNames: any[];
 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _cryptoService: CryptoService,
    private _snackBarService: MatSnackBar,
    private _ConsultaAgregacionService: ConsultaagregacionService,
    private _ResultadoService: ResultadosService,
    private _resultadoConsulta: ConsultaResultadoService,
    private _exportService: ExportService
  ) { }

  ngOnInit(): void {
    try {
      if (sessionStorage.getItem('User')) {
          this.filterEntity = new Resultado();
          this.filterType = MatTableFilter.ANYWHERE;
          this._route.url.subscribe((url: any) => {
            this.action = (url.length > 2 ? url[2].path : 'View');
          });

          this._route.params.subscribe((params: { Sk_Consulta: number, Id_Estructura: number }) => {
            this.Sk_Consulta = params.Sk_Consulta;
            this.Id_Estructura = params.Id_Estructura;
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

  async load() {
    
    try {
      this._loadingService.register('Consulta.form');
      let consulta: IConsulta[] = await this._ConsultaAgregacionService.getConsultaAgregacionBySk(this.Id_Estructura, this.Sk_Consulta).toPromise();
      this.Desc_Estructura = consulta[0].Desc_Estructura;
      this.Desc_Fuente = consulta[0].Desc_Fuente;
      this.Fecha_Consulta = consulta[0].Fecha_Consulta;
      this.Desc_Periodicidad = consulta[0].Desc_Periodicidad;
      this.Fecha_Inicial = consulta[0].Fecha_Inicial;
      this.Fecha_Final = consulta[0].Fecha_Final;
      this.Id_Estructura = consulta[0].Id_Estructura;
      this.Id_Periodicidad = consulta[0].Id_Periodicidad;


      this._resultadoConsulta
        .getNodeStructure(this.Id_Estructura, this.Desc_Estructura)
        .subscribe((data: ItemFlatNode[]) => {

          const root = {
            IdNodo: 0,
            IdNodoPadre: -1,
            NodoNombre: "root",
            children: [],
            Cuts: [],
            Depth: 0
          };

          const reciveNodes = data.map(m => {
            return {
              IdNodo: m.Id_NodoContable,
              IdNodoPadre: m.Id_NodoContablePadre,
              NodoNombre: m.name,
              children: [],
              Cuts: [],
              Depth: 0
            };
          });

          const nodes = [root, ...reciveNodes];
          
          nodes.forEach(f => {
            let nodeChilds = (nodes.filter(i => i.IdNodoPadre === f.IdNodo) || []) as INodeRelation[];
            f.children = nodeChilds;
          });

          this.showableNodes = nodes as INodeRelation[]

          this.nodeMap = nodes.reduce((map, obj) => {
            map[obj.IdNodo] = obj;
            return map;
          }, {});

          this._resultadoConsulta
            .getResultadoAgregacionById(this.Id_Estructura, this.Sk_Consulta, this.Id_Periodicidad)
            .subscribe(this.handleResponseOnLoadComponent);
        });

    } catch (error) {
      //console.log(error);
      this._dialogService.openAlert({ message: 'Error creando/editando la Estructura', closeButton: 'Aceptar' });
    } finally {
      this._loadingService.resolve('Consulta.form');
    }

  }

  getPrintable() {
 
    return this.showableNodes.filter(f => f.IdNodoPadre !== -1).map(m => {
     
      let row = { };

      row["id"] = m.IdNodo;
      row["nombre"] = m.NodoNombre;

      m.Cuts.sort((a: any, b: any) => {
        
        if (b.date > a.date) return 1;
        else if (a.date > b.date) return -1;
        else return 0;
      }).forEach(f => {

        let propertyName = `${f.date}`;

        row[propertyName] = f.value;

      });
    
      return row;
      
    })
  }

  exportToTxt(NodoNombre: string, Fecha: Date) {

    this._exportService.exportTxt(this.getPrintable(), NodoNombre + '_' + Fecha);
  }

  exportToCsv(NodoNombre: string, Fecha: Date) {

    

    this._exportService.exportCsv(this.getPrintable(), NodoNombre + '_' + Fecha);
  }

  exportToExcel(NodoNombre: string, Fecha: Date) {
   
    this._exportService.exportExcel(this.getPrintable(), NodoNombre + '_' + Fecha);
    
  }

  private getSpaces(n: number) {
    let spaces = "";
    for (let index = 0; index < (n - 1); index++) {
      spaces += " ";
    }
    return spaces
  }

  private dfs(node: INodeRelation, depth: number) {

    node.Order = this.order++;

    if (node.Depth == 0) {
      node.NodoNombre = this.getSpaces(depth) + node.NodoNombre;
    }

    node.Depth = depth;
    depth++;

    (node.children || []).forEach((f: INodeRelation) => {
      this.dfs(f, depth);
    });
  }

  private handleResponseOnLoadComponent = (s: IResultado[]) => {

    s.forEach(f => {

      let item = { date: f.Fecha_DeclaracionInicial, value: f.Cv_ValorUSD };
      let cuts = this.nodeMap[+f.Id_NodoContable].Cuts || [];
      cuts.push(item);   
 
      this.nodeMap[+f.Id_NodoContable].Cuts = cuts;
      if (!this.nodeMap[+f.Id_NodoContable].MapCuts) {
        this.nodeMap[+f.Id_NodoContable].MapCuts = {}
      }

      this.nodeMap[+f.Id_NodoContable].MapCuts[`${item.date}`] = item;

    });
 
    const first = this.showableNodes.find(f => f.IdNodo === 0);

    let cutCount = 1;

    this.cutsNames = (this.showableNodes.filter(f => f.IdNodoPadre !== -1) || [])[0].Cuts
      .map(m => {
        const actualCount = cutCount++;
                 return { cutname: `${m.date}`, cutRowDefinition: `Cut${actualCount}` } 
                   }).slice(0,12);
    

    this.displayedColumns = [...this.displayedColumns, ...this.cutsNames.map(m => m.cutRowDefinition)]
    this.displayedColumnsTree = [...this.displayedColumnsTree, ...this.cutsNames.map(m => m.cutRowDefinition)]
    this.order = 0;
    this.dfs(first, 0);

    this.showableNodes.sort((a: INodeRelation, b: INodeRelation) => {
      if (a.Order > b.Order) return 1;
      else if (b.Order > a.Order) return -1;
      else return 0;
    });

    this.showableNodes.forEach(f => {

      f.Cut1 = (f.Cuts[0] || {})["value"];
      if (f.Cut1 && !this.displayedColumns.includes("Cut1")) {
        this.displayedColumns.push("Cut1");
      }

      f.Cut2 = (f.Cuts[1] || {})["value"];
      if (f.Cut2 && !this.displayedColumns.includes("Cut2")) {
        this.displayedColumns.push("Cut2");
      }

      f.Cut3 = (f.Cuts[2] || {})["value"];
      if (f.Cut3 && !this.displayedColumns.includes("Cut3")) {
        this.displayedColumns.push("Cut3");
      }


      f.Cut4 = (f.Cuts[3] || {})["value"];
      if (f.Cut4 && !this.displayedColumns.includes("Cut4")) {
        this.displayedColumns.push("Cut4");
      }

      f.Cut5 = (f.Cuts[4] || {})["value"];
      if (f.Cut5 && !this.displayedColumns.includes("Cut5")) {
        this.displayedColumns.push("Cut5");
      }

      f.Cut6 = (f.Cuts[5] || {})["value"];
      if (f.Cut6 && !this.displayedColumns.includes("Cut6")) {
        this.displayedColumns.push("Cut6");
      }

      f.Cut7 = (f.Cuts[6] || {})["value"];
      if (f.Cut7 && !this.displayedColumns.includes("Cut7")) {
        this.displayedColumns.push("Cut7");
      }

      f.Cut8 = (f.Cuts[7] || {})["value"];
      if (f.Cut8 && !this.displayedColumns.includes("Cut8")) {
        this.displayedColumns.push("Cut8");
      }

      f.Cut9 = (f.Cuts[8] || {})["value"];
      if (f.Cut9 && !this.displayedColumns.includes("Cut9")) {
        this.displayedColumns.push("Cut9");
      }

      f.Cut10 = (f.Cuts[9] || {})["value"];
      if (f.Cut10 && !this.displayedColumns.includes("Cut10")) {
        this.displayedColumns.push("Cut10");
      }

      f.Cut11 = (f.Cuts[10] || {})["value"];
      if (f.Cut11 && !this.displayedColumns.includes("Cut11")) {
        this.displayedColumns.push("Cut11");
      }

    });

    this.filteredResultado = this.resultado = (this.showableNodes || []).filter(f => f.IdNodoPadre != -1);
    this.dataSource = new MatTableDataSource(this.filteredResultado);
    this.dataSourceTree.data = this.showableNodes.find(f => f.IdNodoPadre === -1).children;
    
   }

  private transformer = (node: INodeRelation, level: number) => {
    node.level = level;
    const result = {
      expandable: !!node.children && node.children.length > 0,
      ...node,
    };
    return result;
  }

  hasChild = (_: number, node: INodeRelation) => node.expandable;

  treeControl = new FlatTreeControl<INodeRelation>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level,
    node => node.expandable, node => node.children);

  dataSourceTree = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  async save(): Promise<void> {
    try {
      
      this._loadingService.register('Consulta.form');

      if (sessionStorage.getItem('Menus')) {

        this.Nombre_UsuarioCreacion = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');

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

          let resultPost = await this._ConsultaAgregacionService.postCreateConsulta(this.consulta).toPromise();

          if (resultPost < 0) {
            this._snackBarService.open('Error guardando consulta guardada', 'Ok', { duration: 2000 });
          } else if (resultPost == 99) {
            this._snackBarService.open('Ya existe una estructura con el nombre: ' + this.consulta.Desc_Estructura + ", en la base de datos", 'Ok', { duration: 2000 });
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

  goBack(): void {
    this._router.navigate(['/consultas']);
  }

}

