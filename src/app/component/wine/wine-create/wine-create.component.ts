import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {WineService} from '../../../service/wine/wine.service';
import {Wine} from '../../../class/wine/wine';

@Component({
  selector: 'app-wine-create',
  templateUrl: './wine-create.component.html',
  styleUrls: ['./wine-create.component.css']
})
export class WineCreateComponent implements OnInit {

  wineForm: FormGroup;
  categoryControl = new FormControl();
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
    console.log('val = ' + val.categoryControl);
  }

}
