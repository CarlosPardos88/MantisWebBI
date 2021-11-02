import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';
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
import { MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableFilterModule } from 'mat-table-filter';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { EjecucionesComponent } from './ejecuciones.component';
import { EjecucionesFormComponent } from './form/form.component';
import { ejecucionesRoutes } from './ejecuciones.routes';
import { EJECUCIONES_PROVIDER, EJECUCIONES_API } from './services/ejecuciones.service';
import { DescargaService } from '../../services/descargas.services';

import { LogsService } from '../../services/logs.service';
import { ReprogramacionprocesoComponent } from './reprogramacionproceso/reprogramacionproceso.component';
import { CovalentMenuModule, CovalentNotificationsModule } from '@covalent/core';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@NgModule({
  declarations: [
    EjecucionesComponent,
    EjecucionesFormComponent,
    ReprogramacionprocesoComponent,
  ],
  imports: [
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
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableFilterModule,
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentCommonModule,
    CovalentMenuModule,
    CovalentNotificationsModule,
    // extra
    NotificacionesModule,
    ejecucionesRoutes,
  ],
  providers: [
    { provide: EJECUCIONES_API, useValue: '' },
    EJECUCIONES_PROVIDER,
    LogsService,
    DescargaService,
  ]
})
export class EjecucionesModule { }
