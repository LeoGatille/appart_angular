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









  colorPromise: any = null;
  categoryPromise: any = null;
  designationPromise: any = null;
  labelPromise: any = null;
  vintagePromise: any = null;

  constructor( private colorService: ColorService,
               private categoryService: CategoryService,
               private designationService: DesignationService,
               private labelService: LabelService,
               private vintageService: VintageService,
               private statusService: StatusService,
               private wineService: WineService,
               private fb: FormBuilder
  ) { }

  ngOnInit() {
  this.getElements();
  this.createForm();
  this.loading = false;

  }
  createForm() {
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

  getElements(selector = '', force = false) {
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
  }
  setCategory($event: Category) {
    if (!$event) {
      return;
    }
    this.activateNewCategory($event);
    this.category = $event;
  }
  setDesignation($event: Designation) {
    if (!$event) {
      return;
    }
    this.designation = $event;
  }
  setLabel($event: Label) {
    if (!$event) {
      return;
    }
    this.label = $event;
  }
  setVintage($event: Vintage) {
    if (!$event) {
      return;
    }
    this.vintage = $event;
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
      vin.winePrice,
      vin.vintage.id,
      vin.status.id
    )
      .subscribe(success =>  console.log('oh yes ! ', success),
        error => {
          console.log('oh my...', error);
          this.createErrorLog(error);
        });
  }
  createErrorLog(error) {
    this.errorLog = error;
    this.error = true;
  }

}
