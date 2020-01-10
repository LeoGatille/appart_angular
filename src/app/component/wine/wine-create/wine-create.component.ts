import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WineService} from '../../../service/wine/wine.service';

@Component({
  selector: 'app-wine-create',
  templateUrl: './wine-create.component.html',
  styleUrls: ['./wine-create.component.css']
})
export class WineCreateComponent implements OnInit {

  wineForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private wineService: WineService
  ) { }

  ngOnInit() {
   this.wineForm = this.fb.group( {
     categoryControl : ['', Validators.required]
   });
  }
  save() {
    const val = this.wineForm.value;
    console.log('val.id = ' + val.categoryControl);
  }

}
