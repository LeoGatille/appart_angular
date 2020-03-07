import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {Vintage} from '../../../../class/wine/vintage';
import {VintageService} from '../../../../service/wine/vintage.service';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../../../class/wine/category';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';

@Component({
  selector: 'app-vintage-list-page',
  templateUrl: './vintage-list-page.component.html',
  styleUrls: ['./vintage-list-page.component.scss']
})
export class VintageListPageComponent implements OnInit {

  listToAdd: Vintage[];
  class: Vintage;
  vintagePromise: any;
  constructor(
    private vintageService: VintageService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log('toto', params);
      });
  }

  ngOnInit() {
    this.getVintages();
  }
  getVintages(force = false) {
    this.vintagePromise = (bool) => this.vintageService.getAllVintages((force));
    this.vintagePromise().then((data: any[]) => {
      this.listToAdd = data;
    });
  }

  createVintage($event) {
    this.vintageService.create($event.numberControl)
      .subscribe((vintage: Vintage) => {
        this.listToAdd.push(vintage);
      });
  }
  editInit(id: number) {
    this.vintageService.getOneVintage(id)
      .subscribe((vintage: Vintage) => {
        this.launchModalCreation(vintage);
      });
  }
  launchModalCreation(vintage: Vintage) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modal: true,
      numberValue: vintage.vintageYear,
      numberField: true,
      title: 'Modification' ,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.editVintage(data, vintage.id)
    );
  }
  editVintage(data, id) {
    this.vintageService.editVintage(data.numberControl, id)
      .subscribe( () => {
        this.getVintages(true);
      });
  }
  delete(id: number) {
    this.vintageService.deleteVintage(id)
      .subscribe(() => {
        this.getVintages(true);
      });
  }
}
