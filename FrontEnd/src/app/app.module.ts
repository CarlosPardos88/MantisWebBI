import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SimplePdfViewerModule } from 'simple-pdf-viewer';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableFilterModule } from 'mat-table-filter';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentHttpModule } from '@covalent/http-deprec';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentVirtualScrollModule } from '@covalent/core/virtual-scroll';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentBreadcrumbsModule } from '@covalent/core/breadcrumbs';
import { CovalentNotificationsModule, CovalentMenuModule } from '@covalent/core';


import { NgxChartsModule } from '@swimlane/ngx-charts';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { MOCK_API, MOCK_HUB } from '../config/api.config';

import { AREA_PROVIDER, AREAS_API } from './areas';
import { PARAMETRO_PROVIDER, PARAMETROS_API } from './parametros';
import { FUENTE_PROVIDER, FUENTES_API } from './fuentes';
import { PROCESO_PROVIDER, PROCESOS_API } from './procesos';
import { EJECUCIONES_PROVIDER, EJECUCIONES_API } from './ejecuciones';
import { APROBACION_PROVIDER, APROBACIONES_API } from './aprobacionesprogramado';
import { APROBACIONDEM_PROVIDER, APROBACIONESDEM_API } from './aprobacionesdemanda';
import { SOLICITUDDEM_PROVIDER, SOLICITUDESDEM_API } from './solicitudesdemanda';
import { TIPOJUSTIFICACION_PROVIDER, TIPOJUSTIFICACION_API } from './services/tipojustificacion.service';

import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { Menu } from "../app/models/menu.model";
import { ErrorComponent } from './error/error.component';

import { SignalRConfiguration, SignalRModule } from 'ng2-signalr';

import { CryptoService } from '../services/crypto.services';

import { NotificacionesModule } from './notificaciones/notificaciones.module';
const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

export function getAPI(): string {
  return MOCK_API;
}

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'NotificacionHub';

  c.url = MOCK_HUB;
  c.logging = true;


  c.executeEventsInZone = true;
  c.executeErrorsInZone = false;
  c.executeStatusChangeInZone = true;
  return c;
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    ErrorComponent

  ], // directives, components, and pipes owned by this NgModule
  imports: [
    NotificacionesModule,
    // angular modules
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // material modules
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    SimplePdfViewerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableFilterModule,
    // covalent modules
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentDataTableModule,
    CovalentExpansionPanelModule,
    CovalentVirtualScrollModule,
    CovalentDialogsModule,
    CovalentStepsModule,
    CovalentSearchModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentBreadcrumbsModule,
    SignalRModule.forRoot(createConfig),
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    // external modules
    NgxChartsModule,
    // routes
    appRoutes
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    CryptoService,
    Title,
    {
      provide: AREAS_API, useFactory: getAPI,
    },
    {
      provide: PARAMETROS_API, useFactory: getAPI,
    },
    {
      provide: FUENTES_API, useFactory: getAPI,
    },
    {
      provide: PROCESOS_API, useFactory: getAPI,
    },
    {
      provide: EJECUCIONES_API, useFactory: getAPI,
    },
    {
      provide: APROBACIONES_API, useFactory: getAPI,
    },
    {
      provide: APROBACIONESDEM_API, useFactory: getAPI,
    },
    {
      provide: SOLICITUDESDEM_API, useFactory: getAPI,
    },
    {
      provide: TIPOJUSTIFICACION_API, useFactory: getAPI,
    },
    AREA_PROVIDER,
    PARAMETRO_PROVIDER,
    FUENTE_PROVIDER,
    PROCESO_PROVIDER,
    EJECUCIONES_PROVIDER,
    APROBACION_PROVIDER,
    APROBACIONDEM_PROVIDER,
    SOLICITUDDEM_PROVIDER,
    TIPOJUSTIFICACION_PROVIDER,
    Menu,
  ], // additional providers needed for this module
  entryComponents: [],

  bootstrap: [AppComponent],
})
export class AppModule { }
