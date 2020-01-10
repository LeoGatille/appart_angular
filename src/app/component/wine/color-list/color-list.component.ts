import { Component, OnInit } from '@angular/core';
import {Color} from '../../../class/wine/color';
import {ColorService} from '../../../service/wine/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  public colors: Color[];
  constructor(
    private colorService: ColorService
  ) { }

  ngOnInit() {
    this.colorService.getAllColors()
      .subscribe((colors: Color[]) => {
        this.colors = colors;
        console.log(this.colors[0].wines[0].wineName);
      });
  }

}
