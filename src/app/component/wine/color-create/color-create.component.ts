import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColorService} from '../../../service/wine/color.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-color-create',
  templateUrl: './color-create.component.html',
  styleUrls: ['./color-create.component.css']
})
export class ColorCreateComponent implements OnInit {
  colorForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.colorForm = this.fb.group( {
      colorName : ['',  Validators.required],
    });
  }
  save() {
    const val = this.colorForm.value;
    // console.log('val = ' + val.order);
    this.colorService.createColor(val.colorName)
      .subscribe();
  }
}
