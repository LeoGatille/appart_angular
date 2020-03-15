import { Component, OnInit } from '@angular/core';
import {Wine} from '../../../../class/wine/wine';
import {Status} from '../../../../class/wine/status';
import {Color} from '../../../../class/wine/color';
import {Category} from '../../../../class/wine/category';
import {Designation} from '../../../../class/wine/designation';
import {Label} from '../../../../class/wine/label';
import {Vintage} from '../../../../class/wine/vintage';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ColorService} from '../../../../service/wine/color.service';
import {CategoryService} from '../../../../service/wine/category.service';
import {DesignationService} from '../../../../service/wine/designation.service';
import {LabelService} from '../../../../service/wine/label.service';
import {VintageService} from '../../../../service/wine/vintage.service';
import {StatusService} from '../../../../service/wine/status.service';
import {WineService} from '../../../../service/wine/wine.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-wine-create-page',
  templateUrl: './wine-create-page.component.html',
  styleUrls: ['./wine-create-page.component.scss']
})
export class WineCreatePageComponent implements OnInit {


  errorLog: string;
  error = false;
  listToAdd: Wine[];
  allStatus: Status[];
  status: Status;
  color: Color;
  category: Category;
  designation: Designation;
  label: Label;
  vintage: Vintage;
  labelName: string;
  loading = true;
  colors: any[];
  categories: any[];
  wineForm: FormGroup;
  colorControl: FormControl;
  categoryControl: FormControl;
  designationControl: FormControl;
  labelControl: FormControl;
  vintageControl: FormControl;
  statusControl: FormControl;
  activateButton = true;





  newColor: Color = null;
  newCategory: Category = null;
  newDesignation: Designation = null;
  newVintage: Vintage = null;
  newLabel: Label = null;
  wines: Wine[];
  colorPromise: any = null;
  categoryPromise: any = null;
  designationPromise: any = null;
  labelPromise: any = null;
  vintagePromise: any = null;

  selector: any[] = [];
  option = 'category';

  constructor( private colorService: ColorService,
               private categoryService: CategoryService,
               private designationService: DesignationService,
               private labelService: LabelService,
               private vintageService: VintageService,
               private statusService: StatusService,
               private wineService: WineService,
               private fb: FormBuilder,
               private dialog: MatDialog,
               private toast: ToastrService,

) { }

  ngOnInit() {
  // this.getAllWines();
  this.getElements();
  this.createForm();
  this.getSelector(this.option);
  this.loading = false;
  }
  getSelector(option, force = false) {
    if (force) {
      this.getElements(force);
    }
    if (option === 'category') {
      this.categoryPromise().then((data: Category[]) => {
        this.selector = data;
      });
    }
    if (option === 'label') {
      this.labelPromise().then((data: Label[]) => {
        this.selector = data;
      });
    }
    if (option === 'designation') {
      this.designationPromise().then((data: Designation[]) => {
        this.selector = data;
      });
    }
    if (option === 'color') {
      this.colorPromise().then((data: Color[]) => {
        this.selector = data;
      });
    }
    if (option === 'vintage') {
      this.vintagePromise().then((data: Vintage[]) => {
        this.selector = data;
      });
    }
  }


  // getAllWines() {
  //   console.log('getAllaWines');
  //   this.wineService.getAllWines()
  //     .subscribe((wines: Wine[]) => {
  //       this.wines = wines;
  //     });
  // }

  delete($event) {
    console.log('event = ', $event);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      suppr: $event.wineName,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  {
        console.log('data === ', data);
        if (data) {
          this.wineService.deleteWine($event.id)
            .subscribe(() => {
              this.toast.success('Suppression effectuée');
              this.getSelector(this.option, true);
            });
        }
      }
    );
  }
  createForm() {
    console.log('createForm');
    this.colorControl = new FormControl('', Validators.required);
    this.categoryControl = new FormControl('', Validators.required);
    this.designationControl = new FormControl('', Validators.required);
    this.labelControl = new FormControl('', Validators.required);
    this.vintageControl = new FormControl('', Validators.required);
    this.statusControl = new FormControl('', Validators.required);
    this.wineForm = this.fb.group({
      colorControl : this.colorControl,
      categoryControl : this.categoryControl,
      designationControl : this.designationControl,
      labelControl : this.labelControl,
      vintageControl : this.vintageControl,
      statusControl : ['', Validators.required],
      nameControl : ['', Validators.required],
      priceControl : ['', Validators.required]
    });
  }

  getElements(force = false) {
      this.colorPromise = (bool) => this.colorService.getAllColors(force);
      this.categoryPromise = (bool) => this.categoryService.getAllCategories(force);
      this.designationPromise = (bool) => this.designationService.getAllDesignations(force);
      this.labelPromise = (bool) => this.labelService.getAllLabels(force);
      this.vintagePromise = (bool) => this.vintageService.getAllVintages(force);
      this.statusService.getAllStatus()
        .subscribe((status: Status[]) => {
        this.allStatus = status;
      });
  }
  displayFn(color: Color): string {
    return color ? color.colorName : '';
  }
  displayFnCategory(category: Category): string {
    return category ? category.categoryName : '';
  }
  displayFnDesignation(designation: Designation): string {
    return designation ? designation.designationName : '';
  }
  displayFnLabel(label: Label): string {
    return label ? label.labelName : '';
  }
  displayFnVintage(vintage: Vintage): any {
    return vintage ? vintage.vintageYear : '';
  }

  callBackFilter(filterValue) {
    return (color) => {
      return color.colorName.toLowerCase().includes(filterValue);
    };
  }
  callBackFilterCat(filterValue) {
    return (category) => {
      return category.categoryName.toLowerCase().includes(filterValue);
    };
  }
  callBackFilterDesignation(filterValue) {
    return (designation) => {
      return designation.designationName.toLowerCase().includes(filterValue);
    };
  }
  callBackFilterLabel(filterValue) {
    return (label) => {
      return label.labelName.toLowerCase().includes(filterValue);
    };
  }
  callBackFilterVintage(filterValue) {
    return (vintage) => {
      return vintage.vintageYear.includes(filterValue);
    };
  }
  setColor($event: Color) {
    if (!$event) {
      return;
    }
    this.color = $event;
    this.newColor = $event;
  }
  setCategory($event: Category) {
    if (!$event) {
      return;
    }
    this.activateNewCategory($event);
    this.category = $event;
    this.newCategory = $event;
  }
  setDesignation($event: Designation) {
    if (!$event) {
      return;
    }
    this.designation = $event;
    this.newDesignation = $event;
  }
  setLabel($event: Label) {
    if (!$event) {
      return;
    }
    this.label = $event;
    this.newLabel = $event;
  }
  setVintage($event: Vintage) {
    if (!$event) {
      return;
    }
    this.vintage = $event;
    this.newVintage = $event;
  }

  activateNewCategory(val) {
    if (typeof val === 'string') {
      console.log('activateNewCategory = ' + this.categories.some((sample) => sample.categoryName === val));
      this.activateButton =  this.categories.some((sample) => sample.categoryName.toLowerCase() === val.toLowerCase());
    }
  }

  validate() {
    const vin = new Wine();
    vin.status = this.wineForm.value.statusControl;
    vin.wineName = this.wineForm.value.nameControl;
    vin.winePrice = this.wineForm.value.priceControl;
    vin.category = this.category;
    vin.designation = this.designation;
    vin.color = this.color;
    vin.label = this.label;
    vin.vintage = this.vintage;
    this.wineService.createWine(
      vin.category.id,
      vin.designation.id,
      vin.color.id,
      vin.label.id,
      vin.wineName,
      vin.winePrice * 100,
      vin.vintage.id,
      vin.status.id
    )
      .subscribe((success: Wine) =>  {
          this.toast.success('Ajout de ' + success.wineName);
          console.log(success);
          this.createForm();
          this.getSelector(this.option, true);
          this.resetValues();
        },
        error => {
          this.toast.error(error.error);
          console.log('oh my...', error);
          //this.createErrorLog(error);

        });
  }

  resetValues() {
    this.color
    this.category
    this.designation
this.label
this.vintage
  }

  createErrorLog(error) {
    this.errorLog = error;
    this.error = true;
  }

}
