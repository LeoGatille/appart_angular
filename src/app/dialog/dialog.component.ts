import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {ModalService} from '../component/test/modal';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

 // @Input() listToAdd: any[];
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
  }

  ngOnInit() {
  }
  defineValue(data) {
    console.log('data = ', this.numberField);
    if (typeof data !== 'object') {
      if (this.numberField) {
        console.log('toto');
        this.numberValue = data;
      } else {
        this.nameValue = data;
      }
    }
  }

  close(event) {
   this.dialogRef.close(event);
  }

}
