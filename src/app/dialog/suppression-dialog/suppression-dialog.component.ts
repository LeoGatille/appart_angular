import { log } from 'util';
import { ModalService } from './../../component/test/modal/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-suppression-dialog',
  templateUrl: './suppression-dialog.component.html',
  styleUrls: ['./suppression-dialog.component.scss']
})

export class SuppressionDialogComponent implements OnInit {
  name: string = null;
  constructor(
    private modalService: ModalService,
    public dialogRef: MatDialogRef<SuppressionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.name = data.name
    }
  ngOnInit() {}
  confirmation(confirm: boolean) {
    this.dialogRef.close(confirm);
  }

}
