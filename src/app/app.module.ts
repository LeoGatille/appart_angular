import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { HomePageComponent } from './page/home-page/home-page.component';
import { AuthPageComponent } from './page/auth-page/auth-page.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RequestInterceptor} from './class/request-interceptor';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import {ResponseInterceptor} from './class/response-interceptor';
import { ProfileComponent } from './component/profile/profile.component';
import { AdminHomePageComponent } from './page/admin-home-page/admin-home-page.component';
import { FoodShowComponent } from './component/food/food-show/food-show.component';
import { FoodListComponent } from './component/food/food-list/food-list.component';
import { WineListComponent } from './component/wine/wine-list/wine-list.component';
import { WineListPageComponent } from './page/admin/wine/wine-list-page/wine-list-page.component';
import { CategoryListComponent } from './component/wine/category-list/category-list.component';
import { CategoryListPageComponent } from './page/admin/wine/category-list-page/category-list-page.component';
import { ColorListComponent } from './component/wine/color-list/color-list.component';
import { ColorListPageComponent } from './page/admin/wine/color-list-page/color-list-page.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { DesignationListComponent } from './component/wine/designation-list/designation-list.component';
import { DesignationListPageComponent } from './page/admin/wine/designation-list-page/designation-list-page.component';
import { LabelListComponent } from './component/wine/label-list/label-list.component';
import { LabelListPageComponent } from './page/admin/wine/label-list-page/label-list-page.component';
import { VintageListComponent } from './component/wine/vintage-list/vintage-list.component';
import { VintageListPageComponent } from './page/admin/wine/vintage-list-page/vintage-list-page.component';
import { ColorCreateComponent } from './component/wine/color-create/color-create.component';
import { VintageCreateComponent } from './component/wine/vintage-create/vintage-create.component';
import { LabelCreateComponent } from './component/wine/label-create/label-create.component';
import { CategoryCreateComponent } from './component/wine/category-create/category-create.component';
import { DesignationCreateComponent } from './component/wine/designation-create/designation-create.component';
import { WineCreateComponent } from './component/wine/wine-create/wine-create.component';
import { WineCreatePageComponent } from './page/admin/wine/wine-create-page/wine-create-page.component';
import { CategoryAutoComponent } from './component/autocomplete/category-auto/category-auto.component';
import { DesignationAutoComponent } from './component/autocomplete/designation-auto/designation-auto.component';
import { LabelAutoComponent } from './component/autocomplete/label-auto/label-auto.component';
import { VintageAutoComponent } from './component/autocomplete/vintage-auto/vintage-auto.component';
import { AutoCompleteComponent } from './component/common/auto-complete/auto-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AuthPageComponent,
    LoginComponent,
    ProfilePageComponent,
    ProfileComponent,
    AdminHomePageComponent,
    FoodShowComponent,
    FoodListComponent,
    WineListComponent,
    WineListPageComponent,
    CategoryListComponent,
    CategoryListPageComponent,
    ColorListComponent,
    ColorListPageComponent,
    AutocompleteComponent,
    DesignationListComponent,
    DesignationListPageComponent,
    LabelListComponent,
    LabelListPageComponent,
    VintageListComponent,
    VintageListPageComponent,
    ColorCreateComponent,
    VintageCreateComponent,
    LabelCreateComponent,
    CategoryCreateComponent,
    DesignationCreateComponent,
    WineCreateComponent,
    WineCreatePageComponent,
    CategoryAutoComponent,
    DesignationAutoComponent,
    LabelAutoComponent,
    VintageAutoComponent,
    AutoCompleteComponent,
  ],
  imports: [
    MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
