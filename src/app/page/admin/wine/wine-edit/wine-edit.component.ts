import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WineService } from '../../../../service/wine/wine.service';
import { ActivatedRoute } from '@angular/router';
import { Wine } from '../../../../class/wine/wine';
import { Color } from '../../../../class/wine/color';
import { Category } from '../../../../class/wine/category';
import { Designation } from '../../../../class/wine/designation';
import { Label } from '../../../../class/wine/label';
import { Vintage } from '../../../../class/wine/vintage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColorService } from '../../../../service/wine/color.service';
import { CategoryService } from '../../../../service/wine/category.service';
import { DesignationService } from '../../../../service/wine/designation.service';
import { LabelService } from '../../../../service/wine/label.service';
import { VintageService } from '../../../../service/wine/vintage.service';
import { StatusService } from '../../../../service/wine/status.service';
import { Status } from '../../../../class/wine/status';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wine-edit',
  templateUrl: './wine-edit.component.html',
  styleUrls: ['./wine-edit.component.scss']
})
export class WineEditComponent implements OnInit {

  @Input() wine: Wine = null;
  @Input() selector: any = null;

  @Output() close = new EventEmitter<any>();

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

  edited = false;

  colorPromise: any = null;
  categoryPromise: any = null;
  designationPromise: any = null;
  labelPromise: any = null;
  vintagePromise: any = null;

  constructor(private colorService: ColorService,
    private categoryService: CategoryService,
    private designationService: DesignationService,
    private labelService: LabelService,
    private vintageService: VintageService,
    private statusService: StatusService,
    private wineService: WineService,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.getElements();
    this.createForm();
    this.loading = false;

  }
  createForm() {
    this.addSelector();
    this.colorControl = new FormControl(Object.assign(new Color(), this.wine.color), Validators.required);
    this.categoryControl = new FormControl(Object.assign(new Category(), this.wine.category), Validators.required);
    this.designationControl = new FormControl(Object.assign(new Designation(), this.wine.designation), Validators.required);
    this.labelControl = new FormControl(Object.assign(new Label(), this.wine.label), Validators.required);
    this.vintageControl = new FormControl(Object.assign(new Vintage(), this.wine.vintage), Validators.required);
    this.statusControl = new FormControl(this.wine.status, Validators.required);
    this.wineForm = this.fb.group({
      colorControl: this.colorControl,
      categoryControl: this.categoryControl,
      designationControl: this.designationControl,
      labelControl: this.labelControl,
      vintageControl: this.vintageControl,
      statusControl: ['', Validators.required],
      nameControl: [this.wine.wineName, Validators.required],
      priceControl: [this.wine.winePrice, Validators.required]
    });
    this.edited = true;
  }

  getRealPrice() {
    if (this.edited) {
      return this.wine.winePrice;
    } else {
      return this.wine.winePrice / 100;
    }
  }

  addSelector() {
    if (!this.wine.label) {
      this.wine.label = this.selector;
    }
    if (!this.wine.category) {
      this.wine.category = this.selector;
    }
    if (!this.wine.designation) {
      this.wine.designation = this.selector;
    }
    if (!this.wine.color) {
      this.wine.color = this.selector;
    }
    if (!this.wine.vintage) {
      this.wine.vintage = this.selector;
    }
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
        const toSelect = this.allStatus.find(c => c.id == this.wine.status.id);
        this.wineForm.get('statusControl').setValue(toSelect);
      });
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
      this.activateButton = this.categories.some((sample) => sample.categoryName.toLowerCase() === val.toLowerCase());
    }
  }

  validate() {
    this.wine.status = this.wineForm.value.statusControl;
    this.wine.wineName = this.wineForm.value.nameControl;
    this.wine.winePrice = this.wineForm.value.priceControl;
    this.wine.category = this.category;
    this.wine.designation = this.designation;
    this.wine.color = this.color;
    this.wine.label = this.label;
    this.wine.vintage = this.vintage;
    this.wineService.editWine(
      this.wine.category.id,
      this.wine.designation.id,
      this.wine.color.id,
      this.wine.label.id,
      this.wine.wineName,
      this.wine.winePrice * 100,
      this.wine.vintage.id,
      this.wine.status.id,
      this.wine.id,
    )
      .subscribe((success: Wine) => {
        this.wine.realPrice = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.wine.winePrice));
        this.toast.success('Modification de ' + success.wineName);
        this.close.emit();
      },

        error => {
          this.toast.error(error.error);

        });
  }
  createErrorLog(error) {
    this.errorLog = error;
    this.error = true;
  }

}
