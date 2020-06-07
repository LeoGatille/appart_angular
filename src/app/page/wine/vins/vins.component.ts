import { AuthService } from './../../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CrudInterface } from './../../../class/curdInterface';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../class/wine/category';
import { Label } from '../../../class/wine/label';
import { Designation } from '../../../class/wine/designation';
import { Color } from '../../../class/wine/color';
import { Vintage } from '../../../class/wine/vintage';
import { Status } from '../../../class/wine/status';
import { ColorService } from '../../../service/wine/color.service';
import { CategoryService } from '../../../service/wine/category.service';
import { DesignationService } from '../../../service/wine/designation.service';
import { LabelService } from '../../../service/wine/label.service';
import { VintageService } from '../../../service/wine/vintage.service';
import { StatusService } from '../../../service/wine/status.service';
import { WineService } from '../../../service/wine/wine.service';
import { Wine } from '../../../class/wine/wine';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../../../dialog/dialog.component';

@Component({
  selector: 'app-vins',
  templateUrl: './vins.component.html',
  styleUrls: ['./vins.component.scss']
})
export class VinsComponent implements OnInit {

  loading = true;

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
  wineForm: FormGroup;
  colorControl: FormControl;
  categoryControl: FormControl;
  designationControl: FormControl;
  labelControl: FormControl;
  vintageControl: FormControl;
  statusControl: FormControl;

  wines: Wine[];
  colorPromise: any = null;
  categoryPromise: any = null;
  designationPromise: any = null;
  labelPromise: any = null;
  vintagePromise: any = null;


  wineItemsMap = new Map();
  selector: CrudInterface[] = [];
  option: any = null;

  promiseContainer = {
    colorPromise: (force) => this.colorService.getAllColors(force),
    categoryPromise: (force) => this.categoryService.getAllCategories(force),
    designationPromise: (force) => this.designationService.getAllDesignations(force),
    labelPromise: (force) => this.labelService.getAllLabels(force),
    vintagePromise: (force) => this.vintageService.getAllVintages(force),
    status: this.statusService.getAllStatus()
      .subscribe((status: Status[]) => {
        this.allStatus = status;
      })
  }

  refreshElements = (key) => {
    return new Promise((resolve) => {
      resolve(this.getElements(key, true));
    }).then(data => { return data });
  }
  constructor(
    private colorService: ColorService,
    private categoryService: CategoryService,
    private designationService: DesignationService,
    private labelService: LabelService,
    private vintageService: VintageService,
    private statusService: StatusService,
    private wineService: WineService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toast: ToastrService,
    private auth: AuthService,
  ) { }
  ngOnInit() {
    this.createForm();
    this.getSelector('categoryPromise', true);
    this.loading = false;
  }

  getSelector(key: string, force = false) {
    this.option = key;
    if (force) {
      const elementPromise = this.refreshElements(key);
      elementPromise.then((data: any) => {
        data(force).then((tab: CrudInterface[]) => {
          this.selector = tab;
        });
      });
    } else {
      const elementPromise = this.getElements(key);
      elementPromise().then((elementTab: any[]) => {
        this.selector = elementTab;
      })
    }
  }
  getElements(key: string = 'category', force = false) {
    return this.promiseContainer[key];
  }

  sortWines(wineTab: Wine[]): Wine[] {
    return wineTab.sort((a: Wine, b: Wine) => {
      let textA = a.wineName.toUpperCase();
      let textB = b.wineName.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  }
  sortList(list: CrudInterface[]) {
    return list.sort(function (a, b) {
      if (isNaN(parseInt(a.getName(), 10))) {
        let textA = a.getName().toUpperCase();
        let textB = b.getName().toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      } else {
        let numA = parseInt(a.getName(), 10);
        let numB = parseInt(b.getName(), 10);
        return numA - numB;
      }
    });
  }
  createForm() {
    this.colorControl = new FormControl('', Validators.required);
    this.categoryControl = new FormControl('', Validators.required);
    this.designationControl = new FormControl('', Validators.required);
    this.labelControl = new FormControl('', Validators.required);
    this.vintageControl = new FormControl('', Validators.required);
    this.statusControl = new FormControl('', Validators.required);
    this.wineForm = this.fb.group({
      colorControl: this.colorControl,
      categoryControl: this.categoryControl,
      designationControl: this.designationControl,
      labelControl: this.labelControl,
      vintageControl: this.vintageControl,
      statusControl: ['', Validators.required],
      nameControl: ['', Validators.required],
      priceControl: ['', Validators.required]
    });
  }
  stockWineItems(key: string, item) {
    if (!item) {
      return;
    }
    this.wineItemsMap.set(key, item);
    this.getSelector('categoryPromise');
  }
  setNewWine() {
    const newWine = new Wine();
    newWine.status = this.wineForm.value.statusControl;
    newWine.wineName = this.wineForm.value.nameControl;
    newWine.winePrice = this.wineForm.value.priceControl;
    newWine.category = this.wineItemsMap.get('category');
    newWine.designation = this.wineItemsMap.get('designation');
    newWine.color = this.wineItemsMap.get('color');
    newWine.label = this.wineItemsMap.get('label');
    newWine.vintage = this.wineItemsMap.get('vintage');
    return newWine;
  }
  validate() {
    const vin = this.setNewWine();
    this.wineService.createWine(
      vin.category.id,
      vin.designation.id,
      vin.color.id,
      vin.label.id,
      vin.wineName,
      vin.winePrice * 100,
      vin.vintage.id,
      vin.status.id
    ).subscribe((success: Wine) => {
      this.toast.success('Ajout de ' + success.wineName);
      this.createForm();
      //this.getSelector(this.option, true);
      this.refreshAll();
      this.resetValues();
    },
      error => {
        this.toast.error(error.error);
      });
  }
  resetValues() {
    this.wineItemsMap.clear()
  }
  delete($event) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      suppr: $event.wineName,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.wineService.deleteWine($event.id)
            .subscribe(() => {
              this.toast.success('Suppression effectuée');
              //this.getSelector(this.option, true);
              this.refreshAll();
            });
        }
      }
    );
  }
  isConnected(): boolean {
    //this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }
  refreshAll() {
    this.getSelector(this.option, true);

    if ('colorPromise' !== this.option) {
      console.log('COLOR');
      const elementPromise = this.refreshElements("colorPromise");
      elementPromise.then((data: any) => {
        data(true).then((tab: CrudInterface[]) => {
        });
      });
    }
    if ('categoryPromise' !== this.option) {
      const elementPromise = this.refreshElements("colorPromise");
      elementPromise.then((data: any) => {
        data(true).then((tab: CrudInterface[]) => {

        });
      });
    }
    if ('designationPromise' !== this.option) {
      const elementPromise = this.refreshElements("designationPromise");
      elementPromise.then((data: any) => {
        data(true).then((tab: CrudInterface[]) => {

        });
      });
    }
    if ('labelPromise' !== this.option) {
      const elementPromise = this.refreshElements("labelPromise");
      elementPromise.then((data: any) => {
        data(true).then((tab: CrudInterface[]) => {

        });
      });
    }
    if ('vintagePromise' !== this.option) {
      const elementPromise = this.refreshElements("vintagePromise");
      elementPromise.then((data: any) => {
        data(true).then((tab: CrudInterface[]) => {

        });
      });
    }

  }
}
