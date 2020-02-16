import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {ModalService} from '../component/test/modal';
import {Food} from '../class/food/food';
import {Wine} from '../class/wine/wine';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  dialog: this;
  numberField: boolean;
  nameField: boolean;
  descriptionField: boolean;
  title: string;
  service: any;
  value: any;
  numberValue: any = null;
  nameValue: string = null;
  modal: boolean;
  food: Food = null;
  wine: Wine = null;

  @Output() sendData = new EventEmitter<any>();

  constructor(
    private modalService: ModalService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modal = data.modal;
    this.numberField = data.numberField;
    this.nameField = data.nameField;
    this.descriptionField = data.descriptionField;
    this.title = data.title;
    this.service = data.service;
    this.defineValue(data.value);
    this.food = data.food;
    this.wine = data.wine;
  }

  ngOnInit() {
  }
  defineValue(data) {
    console.log('data = ', this.numberField);
    if (typeof data !== 'object') {
      if (this.numberField) {
        console.log('toto');
        this.numberValue = data ? data : '';
      } else {
        this.nameValue = data ? data : '';
      }
    }
  }

  close(event = null) {
   this.dialogRef.close(event);
  }

}
