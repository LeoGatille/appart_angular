import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-priority-page',
  templateUrl: './priority-page.component.html',
  styleUrls: ['./priority-page.component.css']
})
export class PriorityPageComponent implements OnInit {

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
