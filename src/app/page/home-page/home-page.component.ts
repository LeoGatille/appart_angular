import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../service/wine/category.service';
import {Category} from '../../class/wine/category';
import {map, startWith} from 'rxjs/operators';
import {ColorService} from '../../service/wine/color.service';
import {Color} from '../../class/wine/color';
import {Wine} from '../../class/wine/wine';
import {DesignationService} from '../../service/wine/designation.service';
import {LabelService} from '../../service/wine/label.service';
import {VintageService} from '../../service/wine/vintage.service';
import {Designation} from '../../class/wine/designation';
import {Label} from '../../class/wine/label';
import {Vintage} from '../../class/wine/vintage';
import {Status} from '../../class/wine/status';
import {StatusService} from '../../service/wine/status.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  reservoir: any;
  wineName: string;
  winePrice: number;
  allStatus: Status[];
  status: Status;
  color: Color;
  category: Category;
  designation: Designation;
  label: Label;
  vintage: Vintage;
  vin: Wine;
  labelName: string;
  labelId: number;
  loading = true;
  colors: any[];
  categories: any[];
  designations: any[];
  labels: any[];
  vintages: any[];
  wineForm: FormGroup;
  colorControl: FormControl;
  categoryControl: FormControl;
  designationControl: FormControl;
  labelControl: FormControl;
  vintageControl: FormControl;
  statusControl: FormControl;

  constructor( private colorService: ColorService,
               private categoryService: CategoryService,
               private designationService: DesignationService,
               private labelService: LabelService,
               private vintageService: VintageService,
               private statusService: StatusService,
               private fb: FormBuilder
  ) {
    this.vin = new Wine();
    const catP = this.categoryService.getAllCategories().toPromise();
    const colorP = this.colorService.getAllColors().toPromise();
    const designationP = this.designationService.getAllDesignations().toPromise();
    const labelP = this.labelService.getAllLabels().toPromise();
    const vintageP = this.vintageService.getAllVintages().toPromise();
    const statusP = this.statusService.getAllStatus().toPromise();
    Promise.all([catP, colorP, designationP, labelP, vintageP, statusP]).then((data: any[]) => {
      console.log('PROMISE FINISHED');
      this.loading = false;
      const categories = data[0];
      const colors = data[1];

      const designations = data[2];
      const labels = data[3];
      const vintages = data[4];
      const statuses = data[5];

      this.vin.category = categories[0];
      this.vin.color = colors[0];

      this.vin.designation = designations[0];
      this.vin.label = labels[0];
      this.vin.vintage = vintages[0];
      this.vin.status = statuses[0];

      this.colors = colors;
      this.categories = categories;

      this.designations = designations;
      this.labels = labels;
      this.vintages = vintages;
      this.allStatus = statuses;

      this.colorControl = new FormControl(this.vin.color, Validators.required);
      this.categoryControl = new FormControl(this.vin.category, Validators.required);
      this.designationControl = new FormControl(this.vin.designation, Validators.required);
      this.labelControl = new FormControl(this.vin.label, Validators.required);
      this.vintageControl = new FormControl(this.vin.vintage, Validators.required);
      this.statusControl = new FormControl(this.vin.status, Validators.required);
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
    this.color = $event;
    console.log('color.id = ' + this.color.id);
    console.log('color.colorName = ' + this.color.colorName);
    console.log(this.wineForm.value);
  }
  setCategory($event: Category) {
    this.category = $event;
    console.log('category.id = ' + this.category.id);
    console.log('category.categoryName = ' + this.category.categoryName);
  }
  setDesignation($event: Designation) {
    this.designation = $event;
    console.log('designation.id = ' + this.designation.id);
    console.log('designation.designationName = ' + this.designation.designationName);
  }
  setLabel($event: Label) {
    this.label = $event;
    console.log('label.id = ' + this.label.id);
    console.log('label.labelName = ' + this.label.labelName);
  }
  setVintage($event: Vintage) {
    this.vintage = $event;
    console.log('vintage.id = ' + this.vintage.id);
    console.log('vintage.vintageYear = ' + this.vintage.vintageYear);
  }
  setStatus($event: Status) {
    this.status = $event;
    console.log('status.id = ' + this.status.id);
    console.log('status.statusName = ' + this.status.statusName);
  }
  setWineName($event: string) {
    this.vin.wineName = $event;
    console.log('wineName = ' + this.vin.wineName);
  }
  setWinePrice($event: number) {
    this.vin.winePrice = $event;
    console.log('winePrice = ' + this.vin.winePrice);
  }
  log() {
    console.log('Log');
  }

  validate() {
    console.log('wineForm = ' + this.wineForm.value);
   // this.vin.color = this.color;
   // this.vin.category = this.category;
   // this.vin.designation = this.designation;
   // this.vin.label = this.label;
   // console.log('color : ' + this.color.id);
   // console.log('color : ' + this.color.colorName);
  }



  ngOnInit() {
    console.log('INIT START');

  }

  ngOnDestroy() {}
}
