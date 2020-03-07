import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {Designation} from '../../../../class/wine/designation';
import {DesignationService} from '../../../../service/wine/designation.service';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../../../class/wine/category';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';

@Component({
  selector: 'app-designation-list-page',
  templateUrl: './designation-list-page.component.html',
  styleUrls: ['./designation-list-page.component.scss']
})
export class DesignationListPageComponent implements OnInit {

  listToAdd: Designation[];
  class: Designation;
  placeholderName: string;
  designationPromise: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private designationService: DesignationService,
    private dialog: MatDialog,
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log('toto', params);
      });
  }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.getDesignations();
    // this.designationService.getAllDesignations()
    //   .subscribe((designations: Designation[]) => {
    //     this.listToAdd = designations;
    //   });
  }getDesignations(force = false) {
    this.designationPromise = (bool) => this.designationService.getAllDesignations((force));
    this.designationPromise().then((data: any[]) => {
      this.listToAdd = data;
    });
  }

  createDesignation($event) {
    this.designationService.create($event.nameControl)
      .subscribe((designation: Designation) => {
        this.listToAdd.push(designation);
      });
  }
  editInit(id: number) {
    this.designationService.getOneDesignation(id)
      .subscribe((designation: Designation) => {
        this.launchModalCreation(designation);
      });
  }
  launchModalCreation(designation: Designation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modal: true,
      nameValue: designation.designationName,
      nameField: true,
      title: 'Modification' ,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.editDesignation(data, designation.id)
    );
  }
  editDesignation(data, id) {
    this.designationService.editDesignation(data.nameControl, id)
      .subscribe( () => {
        this.getDesignations(true);
      });
  }
  // delete(id: number) {
  //   this.designationService.deleteDesignation(id)
  //     .subscribe(() => {
  //       this.getDesignations(true);
  //     });
  // }

  delete(designation: Designation) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      suppr: designation.designationName,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  {
        console.log('data === ', data);
        if (data) {
          this.designationService.deleteDesignation(designation.id)
            .subscribe(() => {
              this.getDesignations(true);
            });
        }
      }
    );
  }
}
