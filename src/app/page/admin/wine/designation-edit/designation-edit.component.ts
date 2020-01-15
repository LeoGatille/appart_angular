import { Component, OnInit } from '@angular/core';
import {Designation} from '../../../../class/wine/designation';
import {Wine} from '../../../../class/wine/wine';
import {DesignationService} from '../../../../service/wine/designation.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-designation-edit',
  templateUrl: './designation-edit.component.html',
  styleUrls: ['./designation-edit.component.css']
})
export class DesignationEditComponent implements OnInit {

  listToAdd: Designation[];
  class: Designation;
  myComponent: Designation;
  linkedWines: Wine[];
  loading = true;
  id: number;
  constructor(
    private designationService: DesignationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        this.id = params.id;
        this.designationService.getOneDesignation(this.id)
          .subscribe((designation: Designation) => {
            this.loading = false;
            this.myComponent = designation;
            this.linkedWines = designation.wines;
          });
      });
  }

  ngOnInit() {
  }

  editElement($event) {
    this.designationService.editDesignation($event.nameControl, this.id)
      .subscribe();
  }

}
