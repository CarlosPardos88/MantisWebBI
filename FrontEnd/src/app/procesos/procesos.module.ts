import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatProgressBarModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule } from '@angular/material';
import { MatTableFilterModule } from 'mat-table-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentStepsModule } from '@covalent/core/steps';

import { SharedModule } from '../commons/shared.module';

import { ProcesosComponent } from './procesos.component';
import { ProcesosFormComponent } from './form/form.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { ProgramacionFormComponent } from './programacion/form/form.component';

import { procesosRoutes } from './procesos.routes';

import { PROCESO_PROVIDER, PROCESOS_API } from './services/procesos.service';
import { ProcesoTDService } from '../../services/procesotd.service';
import { PeriodicidadService } from '../../services/periodicidades.service';
import { DiaSemanaService } from '../../services/diassemana.service';
import { ProgramacionProcesoService } from '../../services/programacionproceso.service';
import { RelProcesoFuenteService } from '../../services/relprocesofuentes.services';
import { ProcesoPrerequisitoService } from '../../services/procesopre.service';
import { RutaPreProcesoService } from '../../services/ruta.service';
import { RelProcesoGestorService } from '../../services/relprocesogestor.service';
import { RelProcesoDiaSemanaService } from '../../services/relprodiasemana.service';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';


@NgModule({
    declarations: [
        ProcesosComponent,
        ProcesosFormComponent,
        ProgramacionComponent,
        ProgramacionFormComponent
    ], // directives, components, and pipes owned by this NgModule
    imports: [
        SharedModule,
        NotificacionesModule,
        // angular modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // material modules
        MatProgressBarModule,
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
        MatSelectModule,
        MatSortModule,
        NgxMatSelectSearchModule,
        MatTableFilterModule,
        // covalent modules
        CovalentLoadingModule,
        CovalentDialogsModule,
        CovalentMediaModule,
        CovalentLayoutModule,
        CovalentSearchModule,
        CovalentCommonModule,
        CovalentStepsModule,
        // extra
        procesosRoutes,
    ], // modules needed to run this module
    providers: [
        { provide: PROCESOS_API, useValue: '' },
        PROCESO_PROVIDER,
        ProcesoTDService,
        PeriodicidadService,
        DiaSemanaService,
        ProgramacionProcesoService,
        RelProcesoFuenteService,
        ProcesoPrerequisitoService,
        RutaPreProcesoService,
        RelProcesoGestorService,
        RelProcesoDiaSemanaService,
    ],
})
export class ProcesosModule { }
