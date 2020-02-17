import { Component, OnInit } from '@angular/core';
import {Designation} from '../../../class/wine/designation';
import {DesignationService} from '../../../service/wine/designation.service';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.scss']
})
export class DesignationListComponent implements OnInit {

  public designations: Designation[];
  constructor(
    private designationService: DesignationService
  ) { }

  ngOnInit() {
    // this.designationService.getAllDesignations()
    //   .subscribe((designations: Designation[]) => {
    //     this.designations = designations;
    //   });
  }

}
