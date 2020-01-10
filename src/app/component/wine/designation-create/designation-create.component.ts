import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DesignationService} from '../../../service/wine/designation.service';

@Component({
  selector: 'app-designation-create',
  templateUrl: './designation-create.component.html',
  styleUrls: ['./designation-create.component.css']
})
export class DesignationCreateComponent implements OnInit {

  designationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private designationService: DesignationService
  ) { }

  ngOnInit() {
    this.designationForm = this.fb.group( {
      designationName: ['', Validators.required]
    });
  }
  save() {
    const val = this.designationForm.value;
    console.log('designationForm = ' + this.designationForm.value.designationName);
    this.designationService.createDesignation(val.designationName)
      .subscribe();
    this.designationForm.reset();
  }

}
