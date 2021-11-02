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
import { MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule } from '@angular/material';
import { MatTableFilterModule } from 'mat-table-filter';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';

import { ParametrosComponent } from './parametros.component';
import { ParametrosFormComponent } from './form/form.component';

import { parametrosRoutes } from './parametros.routes';
import { CovalentMenuModule, CovalentNotificationsModule } from '@covalent/core';
import { PARAMETRO_PROVIDER, PARAMETROS_API } from './services/parametros.service';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';


@NgModule({
    declarations: [
        ParametrosComponent,
        ParametrosFormComponent,
    ], // directives, components, and pipes owned by this NgModule
    imports: [
        // angular modules
        CommonModule,
        FormsModule,
        RouterModule,
        NotificacionesModule,
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
        MatSelectModule,
        MatSortModule,
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
        parametrosRoutes,
    ], // modules needed to run this module
    providers: [
        { provide: PARAMETROS_API, useValue: '' },
        PARAMETRO_PROVIDER,
    ],
})
export class ParametrosModule { }
