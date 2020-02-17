import { Component, OnInit } from '@angular/core';
import {LabelService} from '../../service/wine/label.service';
import {Label} from '../../class/wine/label';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  listToAdd: Label[];
  class: Label;
  placeholderName: string;
  constructor(
    private labelService: LabelService,
  ) { }

  ngOnInit() {
    // this.placeholderName = 'Nom';
    // this.labelService.getAllLabels()
    //   .subscribe((labels: Label[]) => {
    //     this.listToAdd = labels;
    //   });
  }
  // createElement($event) {
  //   console.log($event);
  //   this.labelService.createLabel($event.nameControl)
  //     .subscribe((label: Label) => {
  //       this.listToAdd.push(label);
  //     });
  // }

}
