import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';

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
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.numberField = data.numberField;
    this.nameField = data.nameField;
    this.descriptionField = data.descriptionField;
  }

  ngOnInit() {
    console.log(this.numberField);
  }

  close() {
    this.dialogRef.close()
  }

}
