import { Component, OnInit } from '@angular/core';
import {Wine} from '../../../class/wine/wine';
import {WineService} from '../../../service/wine/wine.service';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss']
})
export class WineListComponent implements OnInit {

  public wines: Wine[];
  constructor(
    private wineService: WineService
  ) { }

  ngOnInit() {
    this.wineService.getAllWines()
      .subscribe((wines: Wine[]) => {
        this.wines = wines;
      });
  }

}
