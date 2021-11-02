import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableFilterModule } from 'mat-table-filter';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';


import { AprobacionesdemandaComponent } from './aprobacionesdemanda.component';
import { AprobacionesDemFormComponent } from './form/form.component';

import { ProcesoPrerequisitoService } from '../../services/procesopre.service';
import { RutaPreProcesoService } from '../../services/ruta.service';
import { CryptoService } from '../../services/crypto.services';

import { aprobacionDemRoutes } from './aprobacionesdemanda.routes';
import { SharedModule } from '../commons/shared.module';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

import { APROBACIONDEM_PROVIDER, APROBACIONESDEM_API } from './services/aprobacionesdemanda.service';

import { LogsService } from '../../services/logs.service';

import { EjecucionesService } from '../../services/ejecuciones.service';


@NgModule({
  declarations: [
    AprobacionesdemandaComponent,
    AprobacionesDemFormComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    NotificacionesModule,
    SharedModule,
    // angular modules
    CommonModule,
    FormsModule,
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
    MatNativeDateModule,
    MatDatepickerModule,
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentCommonModule,
    CovalentExpansionPanelModule,
    MatTableFilterModule,

    // extra
    aprobacionDemRoutes,
  ], // modules needed to run this module
  providers: [
    { provide: APROBACIONESDEM_API, useValue: '' },
    APROBACIONDEM_PROVIDER,
    LogsService,
    ProcesoPrerequisitoService,
    RutaPreProcesoService,
    CryptoService,
    EjecucionesService,
  ],
})

export class AprobacionesdemandaModule { }
