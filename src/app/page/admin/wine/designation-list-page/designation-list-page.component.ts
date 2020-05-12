import { Component, OnInit } from '@angular/core';
import {Designation} from '../../../../class/wine/designation';
import {DesignationService} from '../../../../service/wine/designation.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-designation-list-page',
  templateUrl: './designation-list-page.component.html',
  styleUrls: ['./designation-list-page.component.scss']
})
export class DesignationListPageComponent implements OnInit {
  loading = true;
  listToAdd: Designation[];
  class: Designation;
  placeholderName: string;
  designationPromise: any;
  constructor(
    private designationService: DesignationService,
    private dialog: MatDialog,
    private toast: ToastrService,
  ) {}
  ngOnInit() {
    this.placeholderName = 'Nom';
    this.getDesignations();
  }
  getDesignations(force = false) {
    this.designationPromise = (bool) => this.designationService.getAllDesignations((force));
    this.designationPromise().then((data: any[]) => {
      this.listToAdd = data;
      this.loading = false;
    });
  }
  createDesignation($event) {
    this.designationService.create($event.nameControl)
      .subscribe((designation: Designation) => {
        this.toast.success('Ajout effectué' + ' "' + designation.designationName + '"');
        this.listToAdd.push(designation);
      },
      error => {
        this.toast.error(error.error)
      });
  }
  childAskFor(request: any) {
    switch(request.action) {
      case('refresh') :
        this.toast.success(request.message);
        this.getDesignations(true);
      break;
      case('error') :
        this.toast.warning(request.message);
      break;
      default :
        this.toast.warning('Une erreur est survenue');
      break;
    }
  }
}
