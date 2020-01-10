import { Component, OnInit } from '@angular/core';
import {Label} from '../../../class/wine/label';
import {LabelService} from '../../../service/wine/label.service';
import {Category} from '../../../class/wine/category';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css']
})
export class LabelListComponent implements OnInit {
  public labels: Label[];
  constructor(
    private labelService: LabelService
  ) { }

  ngOnInit() {
    this.labelService.getAllLabels()
      .subscribe((labels: Label[]) => {
        this.labels = labels;
      });
  }

}
