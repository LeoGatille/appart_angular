import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {Designation} from '../../../../class/wine/designation';
import {DesignationService} from '../../../../service/wine/designation.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-designation-list-page',
  templateUrl: './designation-list-page.component.html',
  styleUrls: ['./designation-list-page.component.css']
})
export class DesignationListPageComponent implements OnInit {

  listToAdd: Designation[];
  class: Designation;
  placeholderName: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private designationService: DesignationService
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log('toto', params);
      });
  }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.designationService.getAllDesignations()
      .subscribe((designations: Designation[]) => {
        this.listToAdd = designations;
      });
  }
  createElement($event) {
    console.log($event);
    this.designationService.createDesignation($event.nameControl)
      .subscribe( (designation: Designation) => {
        this.listToAdd.push(designation);
      });
  }

}
