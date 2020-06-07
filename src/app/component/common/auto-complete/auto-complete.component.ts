import { CrudInterface } from './../../../class/curdInterface';
import { log } from 'util';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from '../../../class/wine/category';
import { Wine } from '../../../class/wine/wine';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../../service/wine/category.service';
import { filter, map, startWith } from 'rxjs/operators';
import { Color } from '../../../class/wine/color';
import { ColorService } from '../../../service/wine/color.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../../../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { AutoCompleteInterface } from 'src/app/class/autoCompleteInteface';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  //  @Input() listOfElements: any[];
  @Input() arrayPromise: any;
  @Input() parentModel: any;
  @Input() displayFn: any;
  @Input() callBackFilter: any;
  @Input() creation = false;
  @Input() find: any;
  @Input() listToAdd: any[];
  @Input() myControl: FormControl;
  activateButton = false;
  @Input() numberField = false;
  @Input() nameField = false;
  @Input() descriptionField = false;
  @Input() title: string;
  @Input() service: any;

  @Output() controlButton = new EventEmitter<any>();
  @Output() addElement = new EventEmitter<any>();

  filteredElements: Observable<AutoCompleteInterface[]>;
  listOfElements: any[];
  constructor(
    public dialog: MatDialog,
    private toast: ToastrService,
  ) { }
  ngOnInit() {
    this.getElements();
  }
  getElements() {
    this.arrayPromise().then((data: AutoCompleteInterface[]) => {
      console.log('DATA = ', data)
      this.listOfElements = data;
      this.filteredElements = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }
  sortList(list: CrudInterface[]) {
    list.sort(function (a, b) {
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
  private _filter(value: string): AutoCompleteInterface[] {
    // this.sortList(this.listOfElements);
    if (value && typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.listOfElements.filter((element: AutoCompleteInterface) => {
        return element.getName().toLowerCase().includes(filterValue);
      });
    }
    return this.listOfElements;
  }
  newDisplayFn(toDisplay: AutoCompleteInterface): string {
    return toDisplay ? toDisplay.getName() : '';
  }
  sendToParent() {
    if (typeof this.myControl.value === "object") {
      this.addElement.emit(this.myControl.value);
    }
    if (this.myControl.value && this.myControl.value !== '') {
      this.btnLightUp();
    }
  }
  btnLightUp() {
    if (!this.redundancyControl(this.myControl.value)) {
      this.activateButton = true;
    } else {
      this.activateButton = false;
    }
  }
  launchModalCreation() {
    console.log('the typeof = ', typeof this.myControl.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modal: true,
      nameValue: isNaN(this.myControl.value) ? this.myControl.value : null,
      numberValue: !isNaN(this.myControl.value) ? this.myControl.value : null,
      numberField: this.numberField,
      nameField: this.nameField,
      descriptionField: this.descriptionField,
      title: this.title,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => this.createElement(data)
    );
  }
  redundancyControl(data) {
    let stringToTest: string = '';
    switch (typeof data) {
      case ('number'):
        stringToTest = data.toString();
        break;
      case ('string'):
        stringToTest = data;
        break;
      default:
        stringToTest = data.getName();
    }
    return this.listOfElements.find(listItem => listItem.getName().toLowerCase() === stringToTest.toLowerCase());
  }
  createElement(data: any) {
    if (data.nameControl) {
      if (!this.redundancyControl(data.nameControl)) {
        this.service.create(data.nameControl)
          .subscribe((res) => {
            this.toast.success('Ajout de ' + data.nameControl);
            this.listOfElements.push(res);
            this.addElement.emit(res);
            this.activateButton = false;
            this.myControl.patchValue(res);
            this.getElements();
          });
      } else {
        this.toast.error('l\'élément envoyé existe déja')
      }
    } else {
      this.service.create(data.numberControl)
        .subscribe((res) => {
          this.toast.success('Ajout de ' + data.numberControl);
          this.listOfElements.push(res);
          this.addElement.emit(res);
          this.activateButton = false;
          this.getElements();
        });
    }
  }
}
