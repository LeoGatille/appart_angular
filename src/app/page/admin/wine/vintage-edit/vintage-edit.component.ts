import { Component, OnInit } from '@angular/core';
import {Vintage} from '../../../../class/wine/vintage';
import {Wine} from '../../../../class/wine/wine';
import {VintageService} from '../../../../service/wine/vintage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vintage-edit',
  templateUrl: './vintage-edit.component.html',
  styleUrls: ['./vintage-edit.component.css']
})
export class VintageEditComponent implements OnInit {

  listToAdd: Vintage[];
  class: Vintage;
  myComponent: Vintage;
  linkedWines: Wine[];
  loading = true;
  id: number;
  constructor(
    private vintageService: VintageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        this.id = params.id;
        this.vintageService.getOneVintage(this.id)
          .subscribe((vintage: Vintage) => {
            this.loading = false;
            this.myComponent = vintage;
            this.linkedWines = this.myComponent.wines;
          });
      });
  }

  ngOnInit() {
  }
  editElement($event) {
    this.vintageService.editVintage($event.numberControl, this.id)
      .subscribe();
  }
}
