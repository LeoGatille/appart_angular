import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HomePageComponent} from './page/home-page/home-page.component';
import {AuthPageComponent} from './page/auth-page/auth-page.component';
import {CanAccessToGuard} from './guard/can-access-to.guard';
import {AdminHomePageComponent} from './page/admin-home-page/admin-home-page.component';
import {WineListPageComponent} from './page/admin/wine/wine-list-page/wine-list-page.component';
import {CategoryListPageComponent} from './page/admin/wine/category-list-page/category-list-page.component';
import {ColorListPageComponent} from './page/admin/wine/color-list-page/color-list-page.component';
import {DesignationListPageComponent} from './page/admin/wine/designation-list-page/designation-list-page.component';
import {LabelListPageComponent} from './page/admin/wine/label-list-page/label-list-page.component';
import {VintageListPageComponent} from './page/admin/wine/vintage-list-page/vintage-list-page.component';
import {WineCreatePageComponent} from './page/admin/wine/wine-create-page/wine-create-page.component';


const routes: Routes = [
  {
    path: 'admin/wine/create',
    component: WineCreatePageComponent,
    data: {title: 'CreateWine'}
  },
  {
    path: 'admin/wine/vintage',
    component: VintageListPageComponent,
    data: {title: 'VintageList'}
  },
  {
    path: 'admin/wine/label',
    component: LabelListPageComponent,
    data: {title: 'LabelList'}
  },
  {
    path: 'admin/wine/designation',
    component: DesignationListPageComponent,
    data: {title: 'DesignationList'}
  },
  {
    path: 'admin/wine/color',
    component: ColorListPageComponent,
    data: {title: 'ColorList'}
  },
  {
    path: 'admin/wine/category',
    component: CategoryListPageComponent,
    data: {title: 'CategoryList'}
  },
  {
    path: 'admin/wine',
    component: WineListPageComponent,
    data: {title: 'WineList'}
  },
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
