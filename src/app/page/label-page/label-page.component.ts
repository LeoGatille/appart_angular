import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-label-page',
  templateUrl: './label-page.component.html',
  styleUrls: ['./label-page.component.css']
})
export class LabelPageComponent implements OnInit {

  action = 'list';
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params
      .subscribe( (params) => {
        console.log(params);
        if (params && params.verb) {
          this.action = params.verb;
        }
      });
  }
  ngOnInit() {
  }

}
