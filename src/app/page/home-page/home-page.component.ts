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
import {WineService} from '../../service/wine/wine.service';
import {ModalService} from '../../component/test/modal';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {


  listToAdd: Wine[];
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
  createCategory: boolean;
  activateButton = true;

  constructor( private colorService: ColorService,
               private categoryService: CategoryService,
               private designationService: DesignationService,
               private labelService: LabelService,
               private vintageService: VintageService,
               private statusService: StatusService,
               private wineService: WineService,
               private fb: FormBuilder,
               private modalService: ModalService,
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
      this.vin.color  = null;

      this.vin.designation = null;
      this.vin.label = null;
      this.vin.vintage  = null;
      this.vin.status  = null;

      this.colors = colors[0];
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
    this.createCategory = true;
    this.activateButton = true;
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
    this.vin.status = this.wineForm.value.statusControl;
    this.vin.wineName = this.wineForm.value.nameControl;
    this.vin.winePrice = this.wineForm.value.priceControl;
    this.vin.category = this.category;
    this.vin.designation = this.designation;
    this.vin.color = this.color;
    this.vin.label = this.label;
    this.vin.vintage = this.vintage;
    this.wineService.createWine(this.vin.category.id,
                                this.vin.designation.id,
                                this.vin.color.id,
                                this.vin.label.id,
                                this.vin.wineName,
                                this.vin.winePrice,
                                this.vin.vintage.id,
                                this.vin.status.id
                               )
      .subscribe((wine: Wine) => {
        this.listToAdd.push(wine);
      });
  }
  ngOnInit() {
    console.log('INIT START');
    this.wineService.getAllWines()
      .subscribe((wines: Wine[]) => {
        this.listToAdd = wines;
      });

  }


  ngOnDestroy() {}
}
