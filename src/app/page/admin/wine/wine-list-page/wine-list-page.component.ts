import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Wine} from '../../../../class/wine/wine';
import {WineService} from '../../../../service/wine/wine.service';

@Component({
  selector: 'app-wine-list-page',
  templateUrl: './wine-list-page.component.html',
  styleUrls: ['./wine-list-page.component.css']
})
export class WineListPageComponent implements OnInit {

  action = 'List';
  wines: Wine[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private wineService: WineService
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log(params);
        if (params && params.verb) {
          this.action = params.verb;
        }
      });
  }

  ngOnInit() {
    this.wineService.getAllWines()
      .subscribe((wines: Wine[]) => {
        this.wines = wines;
      });
  }

}
