import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VintageService} from '../../../service/wine/vintage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vintage-create',
  templateUrl: './vintage-create.component.html',
  styleUrls: ['./vintage-create.component.scss']
})
export class VintageCreateComponent implements OnInit {

  vintageForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private vintageService: VintageService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.vintageForm = this.fb.group( {
    //   vintageYear : ['', Validators.required]
    // });
  }
  // save() {
  //   const val = this.vintageForm.value;
  //   this.vintageService.createVintage(val.vintageYear)
  //     .subscribe();
  // }

}
