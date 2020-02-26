import { Component, OnInit } from '@angular/core';
import {Category} from '../../../class/wine/category';
import {Label} from '../../../class/wine/label';
import {Designation} from '../../../class/wine/designation';
import {Color} from '../../../class/wine/color';
import {Vintage} from '../../../class/wine/vintage';
import {Status} from '../../../class/wine/status';
import {ColorService} from '../../../service/wine/color.service';
import {CategoryService} from '../../../service/wine/category.service';
import {DesignationService} from '../../../service/wine/designation.service';
import {LabelService} from '../../../service/wine/label.service';
import {VintageService} from '../../../service/wine/vintage.service';
import {StatusService} from '../../../service/wine/status.service';
import {WineService} from '../../../service/wine/wine.service';
import {Wine} from '../../../class/wine/wine';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../dialog/dialog.component';

@Component({
  selector: 'app-vins',
  templateUrl: './vins.component.html',
  styleUrls: ['./vins.component.scss']
})
export class VinsComponent implements OnInit {

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

  categoryControl: FormControl;

  statusControl: FormControl;

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
  ) { }

  ngOnInit() {
    // this.getAllWines();
    this.getElements();

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

}
