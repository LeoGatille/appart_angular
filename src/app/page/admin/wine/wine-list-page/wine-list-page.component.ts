import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Wine} from '../../../../class/wine/wine';
import {WineService} from '../../../../service/wine/wine.service';
import {StatusService} from '../../../../service/wine/status.service';
import {Status} from '../../../../class/wine/status';

@Component({
  selector: 'app-wine-list-page',
  templateUrl: './wine-list-page.component.html',
  styleUrls: ['./wine-list-page.component.css']
})
export class WineListPageComponent implements OnInit {

  action = 'List';
  wines: Wine[];
  loading = true;
  // currentStatus = Status;
  constructor(
    private activatedRoute: ActivatedRoute,
    private wineService: WineService,
    // private statusService: StatusService
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
    this.loading = true;
  }
  delete($event) {
    this.wineService.deleteWine($event)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
  log() {
    console.log('mega toto');
  }
  edit(wine: Wine) {

  }

}
