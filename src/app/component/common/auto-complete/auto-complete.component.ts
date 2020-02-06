import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Category} from '../../../class/wine/category';
import {Wine} from '../../../class/wine/wine';
import {Observable, Subscription} from 'rxjs';
import {CategoryService} from '../../../service/wine/category.service';
import {filter, map, startWith} from 'rxjs/operators';
import {Color} from '../../../class/wine/color';
import {ColorService} from '../../../service/wine/color.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../dialog/dialog.component';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input() listOfElements: any[];
  @Input() parentModel: any;
  @Input() displayFn: any;
  @Input() callBackFilter: any;
  @Input() creation = false;
  @Input() find: any;
  @Input() listToAdd: any[];
  @Input() myControl: FormControl;
  @Input() activateButton: true;
  @Input() numberField = false;
  @Input() nameField = false;
  @Input() descriptionField = false;
  @Input() title: string;
  @Input() service: any;

  @Output() controlButton = new EventEmitter<any>();
  @Output() addElement = new EventEmitter<any>();

  filteredElements: Observable<any[]>;
  constructor(
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.filteredElements = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.getOrigin(this.myControl.value);
  }

  private _filter(value: string): any[] {
    if (value && typeof value === 'string' ) {
      const filterValue = value.toLowerCase();
      return this.listOfElements.filter(this.callBackFilter(filterValue));
    }
    return this.listOfElements;
  }

  private getOrigin(value: string): any {
    if (value && typeof value === 'string' ) {
      const filterValue = value.toLowerCase();
      return this.listOfElements.filter(this.find(filterValue));
    }
  }

  sendToParent() {
     this.addElement.emit(this.myControl.value);
     this.askActivateButton(this.myControl.value);
     console.log('activateButton = ' + this.activateButton);
  }

  askActivateButton(val) {
    this.controlButton.emit(val);
  }

  launchModalCreation() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      modal: true,
      value: this.myControl.value,
      numberField: this.numberField,
      nameField: this.nameField,
      descriptionField: this.descriptionField,
      title: this.title,
    };
    this.dialog.open(DialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data => this.createElement(data)
    );

    // const dialogRef = this.dialog.open(DialogComponent, {
    //   width: '250px',
    //   data: {
    //     numberField: true
    //   }
    // });
    // const instance = dialogRef.componentInstance;
    // instance.listToAdd = this.listToAdd;
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
  createElement(data: any) {
    if (data.nameControl) {
      this.service.create(data.nameControl)
        .subscribe((res) => {
          this.listOfElements.push(res);
        });
    } else {
      this.service.create(data.numberControl)
        .subscribe((res) => {
          this.listOfElements.push(res);
        });
    }
  }
}


