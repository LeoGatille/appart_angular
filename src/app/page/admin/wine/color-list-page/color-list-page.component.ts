import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-color-list-page',
  templateUrl: './color-list-page.component.html',
  styleUrls: ['./color-list-page.component.css']
})
export class ColorListPageComponent implements OnInit {

  listToAdd: Color[];
  class: Color;
  placeholderName: string;
  constructor(
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .subscribe();
  }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.colorService.getAllColors()
      .subscribe((colors: Color[]) => {
        this.listToAdd = colors;
      });
  }
  createElement($event) {
    console.log($event);
    this.colorService.createColor($event.nameControl, $event.numberControl)
      .subscribe( (color: Color) => {
        this.listToAdd.push(color);
      });
  }

}
