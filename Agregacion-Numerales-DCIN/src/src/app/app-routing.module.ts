import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        component: LoginComponent,
        path: ':username',
      },    
    ],
  }, 
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        component: HomeComponent,
        path: '',
      },
      {
        path: 'estructura',
        loadChildren: () => import('./estructura/estructura.module').then(m => m.EstructuraModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
