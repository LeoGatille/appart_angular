import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../class/wine/category';
import {Wine} from '../../../../class/wine/wine';
import {ColorService} from '../../../../service/wine/color.service';
import {ActivatedRoute} from '@angular/router';
import {subscribeOn} from 'rxjs/operators';
import {Color} from '../../../../class/wine/color';
import {$e} from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {

  listToAdd: Color[];
  class: Color;
  myComponent: Color;
  linkedWines: Wine[];
  placeholderName: string;
  id: number;
  loading = true;
  constructor(
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {
    console.log('toto');
    this.activatedRoute.params
      .subscribe((params) => {
        console.log('params = ', params);
        this.id = params.id;
        this.colorService.getOneColor(this.id)
        .subscribe((color: Color) => {
          this.myComponent = color;
          this.loading = false;
          this.linkedWines = this.myComponent.wines;
        });
      });
  }

  ngOnInit() { }

  editElement($event) {
    console.log($event.nameControl);
    this.colorService.editColor($event.nameControl, this.id)
      .subscribe();
  }

}
