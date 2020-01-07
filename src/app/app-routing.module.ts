import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HomePageComponent} from './page/home-page/home-page.component';
import {AuthPageComponent} from './page/auth-page/auth-page.component';
import {CanAccessToGuard} from './guard/can-access-to.guard';
import {AdminHomePageComponent} from './page/admin-home-page/admin-home-page.component';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent,
    data : { title: 'Authentification'}
  },
  {
    path: 'gestion',
    component: AdminHomePageComponent,
    canActivate: [ CanAccessToGuard ],
    data : { title: 'Gestion'}
  },
  {
    path: 'home',
    component: HomePageComponent,
    data : { title: 'Accueil'}
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
