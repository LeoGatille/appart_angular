import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MAT_DATE_LOCALE,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule, MatTooltipModule
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
import { AutoCompleteComponent } from './component/common/auto-complete/auto-complete.component';
import { ValidateButtonComponent } from './component/common/validate-button/validate-button.component';
import { ControlLabelPipe } from './pipe/wine/control-label.pipe';
import { DialogComponent } from './dialog/dialog.component';
import { CreateFormComponent } from './component/common/create-form/create-form.component';
import { TestPageComponent } from './page/test-page/test-page.component';
import { SecTestPageComponent } from './page/sec-test-page/sec-test-page.component';
import { CategoryEditComponent } from './page/admin/wine/category-edit/category-edit.component';
import { ColorEditComponent } from './page/admin/wine/color-edit/color-edit.component';
import { DesignationEditComponent } from './page/admin/wine/designation-edit/designation-edit.component';
import { LabelEditComponent } from './page/admin/wine/label-edit/label-edit.component';
import { VintageEditComponent } from './page/admin/wine/vintage-edit/vintage-edit.component';
import { WineEditComponent } from './page/admin/wine/wine-edit/wine-edit.component';
import { WineRowComponent } from './component/wine/wine-row/wine-row.component';
import { FoodListPageComponent } from './page/admin/food/food-list-page/food-list-page.component';
import { FoodCreatePageComponent } from './page/admin/food/food-create-page/food-create-page.component';
import { AllergenListPageComponent } from './page/admin/food/allergen-list-page/allergen-list-page.component';
import { FormulaPageComponent } from './page/admin/food/formula-page/formula-page.component';
import { EventListPageComponent } from './page/admin/event/event-list-page/event-list-page.component';
import { EventEditPageComponent } from './page/admin/event/event-edit-page/event-edit-page.component';
import { GalleryListPageComponent } from './page/admin/gallery/gallery-list-page/gallery-list-page.component';
import { FoodRowComponent } from './component/food/food-row/food-row.component';
import { AllImagesComponent } from './page/gallery/all-images/all-images.component';
import { ImageComponent } from './component/gallery/image/image.component';
import { EventCreateComponent } from './page/admin/event/event-create/event-create.component';
import {DatePipe} from '@angular/common';
import { FoodEditPageComponent } from './page/admin/food/food-edit-page/food-edit-page.component';
import { ModalComponent } from './component/test/modal/modal.component';
import {ModalModule} from './component/test/modal';
import { ShortcutComponent } from './component/test/shortcut/shortcut.component';
import { MessageComponent } from './component/message/message.component';
import {NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomTooltipComponent } from './component/common/custom-tooltip/custom-tooltip.component';
import { ToolTipRendererDirective } from './directive/tool-tip-renderer.directive';
import { CarteComponent } from './page/food/carte/carte.component';
import { VinsComponent } from './page/wine/vins/vins.component';
import { SoireeComponent } from './page/event/soiree/soiree.component';
import { GalerieComponent } from './page/galerie/galerie.component';
import { ReservationComponent } from './page/reservation/reservation.component';

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
    AutoCompleteComponent,
    ValidateButtonComponent,
    ControlLabelPipe,
    DialogComponent,
    CreateFormComponent,
    TestPageComponent,
    SecTestPageComponent,
    CategoryEditComponent,
    ColorEditComponent,
    DesignationEditComponent,
    LabelEditComponent,
    VintageEditComponent,
    WineEditComponent,
    WineRowComponent,
    FoodListPageComponent,
    FoodCreatePageComponent,
    AllergenListPageComponent,
    FormulaPageComponent,
    EventListPageComponent,
    EventEditPageComponent,
    GalleryListPageComponent,
    FoodRowComponent,
    AllImagesComponent,
    ImageComponent,
    EventCreateComponent,
    FoodEditPageComponent,
    ShortcutComponent,
    MessageComponent,
    CustomTooltipComponent,
    ToolTipRendererDirective,
    CarteComponent,
    VinsComponent,
    SoireeComponent,
    GalerieComponent,
    ReservationComponent,
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
        MatDialogModule,
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ModalModule,
        MatSlideToggleModule,
        NgbModule,
        NgbButtonsModule,
        MatExpansionModule,
        MatTooltipModule,
    ],
    entryComponents: [
      DialogComponent,
      CustomTooltipComponent
    ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
