import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-wine-list-page',
  templateUrl: './wine-list-page.component.html',
  styleUrls: ['./wine-list-page.component.css']
})
export class WineListPageComponent implements OnInit {

  action = 'List';
  constructor(
    private activatedRoute: ActivatedRoute,
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
  }

}
