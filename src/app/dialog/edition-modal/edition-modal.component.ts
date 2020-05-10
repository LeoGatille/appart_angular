import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalService } from './../../component/test/modal/modal.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edition-modal',
  templateUrl: './edition-modal.component.html',
  styleUrls: ['./edition-modal.component.scss']
})
export class EditionModalComponent implements OnInit {
  
  loading = true;
  createForm: FormGroup;
  name: string = null;
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<EditionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.name = data.name;
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      nameControl : [this.name ? this.name : '' , Validators.required]
    });
    this.loading = false;
  }

  save() {
    const val = this.createForm.value.nameControl;
    this.dialogRef.close(val);

    // const val = this.createForm.value;
    // this.serviceCreate(val);
    // if (this.dialog) {
    //   this.dialog.close();
    // }
    // this.createForm.reset();
  }
}
