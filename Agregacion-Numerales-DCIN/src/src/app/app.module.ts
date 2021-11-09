import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableFilterModule } from 'mat-table-filter';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentHttpModule, ITdHttpInterceptor } from '@covalent/http';
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


//logout_inactivity
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';

//echarts
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';

//interceptor
import { RequestInterceptor } from '../config/interceptors/request.interceptors';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { MOCK_API } from 'src/config/api.config';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { ESTRUCTURA_API, ESTRUCTURA_PROVIDER } from './estructura';
import { NUMERALES_API, NUMERALES_PROVIDER} from  './services/numeralcambiario.service'
import { ErrorComponent } from './error/error.component';

const httpInterceptorProviders: Type<ITdHttpInterceptor>[] = [
  RequestInterceptor,
];

export function getAPI(): string {
  return MOCK_API;
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    //logout_inactivity
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
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
    CovalentBreadcrumbsModule,
    //echarts
    CovalentBaseEchartsModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    //routes
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    Title,
    {
      provide: ESTRUCTURA_API, useFactory: getAPI, 
    },
    ESTRUCTURA_PROVIDER,
    {
      provide: NUMERALES_API, useFactory: getAPI,
    }, 
    NUMERALES_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
