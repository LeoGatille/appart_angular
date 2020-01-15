import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {Label} from '../../../../class/wine/label';
import {LabelService} from '../../../../service/wine/label.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-label-list-page',
  templateUrl: './label-list-page.component.html',
  styleUrls: ['./label-list-page.component.css']
})
export class LabelListPageComponent implements OnInit {

  listToAdd: Label[];
  class: Label;
  placeholderName: string;
  constructor(
    private labelService: LabelService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log('toto', params);
      });
  }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.labelService.getAllLabels()
      .subscribe((labels: Label[]) => {
        this.listToAdd = labels;
      });
  }
  createElement($event) {
    console.log($event);
    this.labelService.createLabel($event.nameControl)
      .subscribe( (label: Label) => {
        this.listToAdd.push(label);
      });
  }

}
