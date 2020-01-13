import { Component, OnInit } from '@angular/core';
import {Label} from '../../class/wine/label';
import {LabelService} from '../../service/wine/label.service';
import {Color} from '../../class/wine/color';
import {ColorService} from '../../service/wine/color.service';

@Component({
  selector: 'app-sec-test-page',
  templateUrl: './sec-test-page.component.html',
  styleUrls: ['./sec-test-page.component.css']
})
export class SecTestPageComponent implements OnInit {

  listToAdd: Color[];
  class: Color;
  placeholderName: string;
  constructor(
    private colorService: ColorService,
  ) { }

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
