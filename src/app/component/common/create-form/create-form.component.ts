import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  @Input() listToAdd: any[];
  @Input() dialog;
  @Input() class: any;
  @Input() nameField = false;
  @Input() numberField = false;
  @Input() descriptionField = false;
  @Input() placeholderName: string;
  @Input() placeholderNumber: string;
  @Input() nameValue: string | null;
  @Input() numberValue: number | null;
  @Input() descriptionValue: string | null;

  @Output() serviceCall = new EventEmitter<any>();

  loading = true;
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.nameValue = null;
    this.numberValue = null;
  }

  ngOnInit() {

    this.createForm = this.fb.group({
      initControl : ['', Validators.required]
    });
    this.buildForm();
    this.loading = false;
  }

  buildForm() {
    this.createForm.removeControl('initControl');
    if (this.numberField) {
      this.createForm.addControl('numberControl', new FormControl('', Validators.required) );
    }
    if (this.nameField) {
      this.createForm.addControl('nameControl', new FormControl('', Validators.required) );
    }
    if (this.descriptionField) {
      this.createForm.addControl('descriptionControl', new FormControl(this.descriptionValue, Validators.required) );
    }
  }

  save() {
    const val = this.createForm.value;
    console.log('save activated = ', val);
    this.serviceCall.emit(val);


    // const val = this.createForm.value;
    // this.serviceCreate(val);
    // if (this.dialog) {
    //   this.dialog.close();
    // }
    // this.createForm.reset();
  }
}
