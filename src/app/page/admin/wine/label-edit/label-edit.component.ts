import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../class/wine/category';
import {Label} from '../../../../class/wine/label';
import {ActivatedRoute} from '@angular/router';
import {LabelService} from '../../../../service/wine/label.service';
import {Wine} from '../../../../class/wine/wine';

@Component({
  selector: 'app-label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.css']
})
export class LabelEditComponent implements OnInit {

  listToAdd: Label[];
  class: Label;
  myComponent: Label;
  placeholderName: string;
  loading = true;
  linkedWines: Wine[];
  id: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private labelService: LabelService
  ) {
    // this.activatedRoute.params
    //   .subscribe((params) => {
    //     this.id = params.id;
    //     this.labelService.getOneLabel(this.id)
    //       .subscribe((label: Label) => {
    //         this.loading = false;
    //         this.myComponent = label;
    //         this.linkedWines = this.myComponent.wines;
    //       });
    //   });
  }

  ngOnInit() {
  }

  editElement($event) {
    this.labelService.editLabel($event.nameControl, this.id)
      .subscribe();
  }
}
