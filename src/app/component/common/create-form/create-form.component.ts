import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  @Input() placeholderName: string;
  @Input() placeholderNumber: string;
  @Input() nameValue: string | null;
  @Input() numberValue: number | null;
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
    this.loading = false;
    this.createForm = this.buildForm();
  }

  buildForm() {
    if (this.nameField && !this.numberField) {
      return this.fb.group({
        nameControl : ['', Validators.required]
      });
    } else {
      if (this.nameField && this.numberField) {
        return this.fb.group({
          nameControl : ['', Validators.required],
          numberControl: ['', Validators.required]
        });
      } else {
        return this.fb.group({
          numberControl: ['', Validators.required]
        });
      }
    }
  }

  save() {

    const val = this.createForm.value;
    console.log('save activated = ' + val.nameControl);
    this.serviceCall.emit(val);


    // const val = this.createForm.value;
    // this.serviceCreate(val);
    // if (this.dialog) {
    //   this.dialog.close();
    // }
    // this.createForm.reset();
  }
}
