import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LabelService} from '../../../service/wine/label.service';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-label-create',
  templateUrl: './label-create.component.html',
  styleUrls: ['./label-create.component.css']
})
export class LabelCreateComponent implements OnInit {

  labelForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private labelService: LabelService,
  ) { }

  ngOnInit() {
    // this.labelForm = this.fb.group( {
    //   labelName : ['', Validators.required],
    // });
  }
  save() {
    // const val = this.labelForm.value;
    // this.labelService.createLabel(val.labelName)
    //   .subscribe();
  }

}
