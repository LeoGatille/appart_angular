import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {ActivatedRoute} from '@angular/router';
import {subscribeOn} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';

@Component({
  selector: 'app-color-list-page',
  templateUrl: './color-list-page.component.html',
  styleUrls: ['./color-list-page.component.css']
})
export class ColorListPageComponent implements OnInit {

  listToAdd: Color[];
  class: Color;
  placeholderName: string;
  colorPromise: any;
  constructor(
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.getColors();
    // this.colorService.getAllColors()
    //   .subscribe((colors: Color[]) => {
    //     this.listToAdd = colors;
    //   });
  }
  getColors(force = false) {
    this.colorPromise = (bool) => this.colorService.getAllColors((force));
    this.colorPromise().then((data: any[]) => {
      this.listToAdd = data;
    });
  }
  createColor($event) {
    console.log($event);
    this.colorService.createColor($event.nameControl)
      .subscribe( (color: Color) => {
        this.listToAdd.push(color);
      });
  }
  editInit(id) {
    this.colorService.getOneColor(id)
      .subscribe((color: Color) => {
        this.launchModalCreation(color);
      });
  }
  launchModalCreation(color: Color) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modal: true,
      value: color.colorName,
      nameField: true,
      title: 'Modification' ,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.editColor(data.nameControl, color.id)
    );
  }
  editColor(data, id) {
    this.colorService.editColor(data, id)
      .subscribe(() => {
        this.getColors(true);
      });
  }
  delete(id) {
    this.colorService.deleteColor(id)
      .subscribe(() => {
        this.getColors(true);
      });
  }

}
