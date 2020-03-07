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
import {TestPageComponent} from './page/test-page/test-page.component';
import {SecTestPageComponent} from './page/sec-test-page/sec-test-page.component';
import {CategoryEditComponent} from './page/admin/wine/category-edit/category-edit.component';
import {ColorEditComponent} from './page/admin/wine/color-edit/color-edit.component';
import {DesignationEditComponent} from './page/admin/wine/designation-edit/designation-edit.component';
import {LabelEditComponent} from './page/admin/wine/label-edit/label-edit.component';
import {VintageEditComponent} from './page/admin/wine/vintage-edit/vintage-edit.component';
import {WineEditComponent} from './page/admin/wine/wine-edit/wine-edit.component';
import {FoodListPageComponent} from './page/admin/food/food-list-page/food-list-page.component';
import {AllergenListPageComponent} from './page/admin/food/allergen-list-page/allergen-list-page.component';
import {FormulaPageComponent} from './page/admin/food/formula-page/formula-page.component';
import {GalleryListPageComponent} from './page/admin/gallery/gallery-list-page/gallery-list-page.component';
import {EventListPageComponent} from './page/admin/event/event-list-page/event-list-page.component';
import {FoodEditPageComponent} from './page/admin/food/food-edit-page/food-edit-page.component';
import {CarteComponent} from './page/food/carte/carte.component';
import {VinsComponent} from './page/wine/vins/vins.component';
import {SoireeComponent} from './page/event/soiree/soiree.component';
import {GalerieComponent} from './page/galerie/galerie.component';
import {ReservationComponent} from './page/reservation/reservation.component';
import {MainComponent} from './page/admin/main/main.component';


const routes: Routes = [
  {
    path: 'admin',
    component: MainComponent,
    data: {title: 'Administration'}
  },
  {
    path: 'reservations',
    component: ReservationComponent,
    data: {title: 'Reservations'}
  },
  {
    path: 'carte',
    component: CarteComponent,
    data: {title: 'La carte'}
  },
  {
    path: 'vins',
    component: VinsComponent,
    data: {title: 'Les vins'}
  },
  {
    path: 'soirees',
    component: SoireeComponent,
    data: {title: 'Soirées Spéciales'}
  },
  {
    path: 'galerie',
    component: GalerieComponent,
    data: {title: 'Galerie'}
  },
  {
    path: 'admin/food/:verb/:id',
    component: FoodEditPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'FoodEdit'}
  },
  {
    path: 'admin/event',
    component: EventListPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'EventList'}
  },
  {
    path: 'admin/gallery',
    component: GalleryListPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'GalleryList'}
  },
  {
    path: 'admin/food/formula',
    component: FormulaPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'FormulaList'}
  },
  {
    path: 'admin/food/allergen',
    component: AllergenListPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'AllergensList'}
  },
  {
    path: 'admin/food',
    component: FoodListPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'FoodList'}
  },
  {
    path: 'admin/wine/:verb/:id',
    component: WineEditComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'WineModif'}
  },
  {
    path: 'admin/wine/vintage/:verb/:id',
    component: VintageEditComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'VintageModif'}
  },
  {
    path: 'admin/wine/label/:verb/:id',
    component: LabelEditComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'LabelModif'}
  },
  {
    path: 'admin/wine/designation/:verb/:id',
    component: DesignationEditComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'DesignationModif'}
  },
  {
    path: 'admin/wine/color/:verb/:id',
    component: ColorEditComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'ColorModif'}
  },
  {
    path: 'admin/wine/category/:verb/:id',
    component: CategoryEditComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'CategorieModif'}
  },
  {
    path: 'sectest',
    component: SecTestPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'SecondTestPage'}
  },
  {
    path: 'test',
    component: TestPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'TestPage'}
  },
  {
    path: 'admin/wine',
    component: WineCreatePageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'CreateWine'}
  },
  {
    path: 'admin/wine/vintage',
    component: VintageListPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'VintageList'}
  },
  {
    path: 'admin/wine/label',
    component: LabelListPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'LabelList'}
  },
  {
    path: 'admin/wine/designation',
    component: DesignationListPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'DesignationList'}
  },
  {
    path: 'admin/wine/color',
    component: ColorListPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'ColorList'}
  },
  {
    path: 'admin/wine/category',
    component: CategoryListPageComponent,
    canActivate: [ CanAccessToGuard ],
    data: {title: 'CategoryList'}
  },
  // {
  //   path: 'admin/wine',
  //   component: WineListPageComponent,
  //   canActivate: [ CanAccessToGuard ],
  //   data: {title: 'WineList'}
  // },
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
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
