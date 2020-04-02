import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {ModalService} from '../component/test/modal';
import {Food} from '../class/food/food';
import {Wine} from '../class/wine/wine';
import {Event} from '../class/event';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
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
  descriptionValue: string = null;
  modal: boolean;
  food: Food = null;
  wine: Wine = null;
  selector: any = null;
  suppr = '';
  confirmation = false;
  event: Event;
  message = false;
  manySuppr: any[] = [];

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
    this.selector = data.selector;
    this.suppr = data.suppr;
    this.event = data.event;
    this.numberValue = parseInt(data.numberValue, 10);
    this.nameValue = data.nameValue;
    this.descriptionValue = data.descriptionValue;
    this.message = data.message;
    this.manySuppr = data.manySuppr;
    
  }

  ngOnInit() {
  }
  defineValue(data) {

    if (typeof data !== 'object') {
      if (this.numberField) {
        console.log('toto = ', data);
        this.numberValue = data ? data : '';
      } else {
        console.log('tutu = ', data);
        this.nameValue = data ? data : '';
      }
    }
  }

  close(event = null) {
   this.dialogRef.close(event);
  }
  validate() {
    this.confirmation = true;
    this.dialogRef.close(this.confirmation);
  }

}
