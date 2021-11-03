import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableFilterModule } from 'mat-table-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { TreetableModule } from 'ng-material-treetable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';

import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { CovalentTreeEchartsModule } from '@covalent/echarts/tree';

import { ConsultasFormComponent } from './form/form.component';
import { ConsultasComponent} from './consultas.component';
import { consultasRoutes} from './consultas.routes';
import {ViewFormComponent} from './view-form/view-form.component';

@NgModule({
  declarations: [ConsultasComponent, ConsultasFormComponent,ViewFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // material modules
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableFilterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule,
    TreetableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentCommonModule,
    CovalentStepsModule,
    CovalentExpansionPanelModule,

    //Covalent Charts
    CovalentBaseEchartsModule,
    CovalentTreeEchartsModule,
    consultasRoutes
  ]
})
export class ConsultasModule { }
