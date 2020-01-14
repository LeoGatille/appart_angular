import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {Vintage} from '../../../../class/wine/vintage';
import {VintageService} from '../../../../service/wine/vintage.service';

@Component({
  selector: 'app-vintage-list-page',
  templateUrl: './vintage-list-page.component.html',
  styleUrls: ['./vintage-list-page.component.css']
})
export class VintageListPageComponent implements OnInit {

  listToAdd: Vintage[];
  class: Vintage;
  placeholderNumber: string;
  constructor(
    private vintageService: VintageService,
  ) { }

  ngOnInit() {
    this.placeholderNumber = 'Année';
    this.vintageService.getAllVintages()
      .subscribe((vintages: Vintage[]) => {
        this.listToAdd = vintages;
      });
  }
  createElement($event) {
    console.log($event);
    this.vintageService.createVintage($event.numberControl)
      .subscribe( (vintage: Vintage) => {
        this.listToAdd.push(vintage);
      });
  }

}
