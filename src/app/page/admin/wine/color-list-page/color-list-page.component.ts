import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {ActivatedRoute} from '@angular/router';
import {subscribeOn} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-color-list-page',
  templateUrl: './color-list-page.component.html',
  styleUrls: ['./color-list-page.component.scss']
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
    private toast: ToastrService,
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
    this.colorService.create($event.nameControl)
      .subscribe( (color: Color) => {
        this.toast.success('Ajout effectué' + ' "' + color.colorName + '"');
        this.listToAdd.push(color);
      },
      error => {
        this.toast.error(error.error)
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
      nameValue: color.colorName,
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
      .subscribe((color: Color) => {
        if (color) {
          this.toast.success('Modification effectuée' + ' "' + color.colorName + '"');
          this.getColors(true);
        } else {
          this.toast.error('Echec');
        }

      });
  }
  // delete(id) {
  //   this.colorService.deleteColor(id)
  //     .subscribe(() => {
  //       this.getColors(true);
  //     });
  // }
  delete(color: Color) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      suppr: color.colorName,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  {
        console.log('data === ', data);
        if (data) {
          this.colorService.deleteColor(color.id)
            .subscribe(() => {
              this.toast.success('Suppression effectuée');
              this.getColors(true);
            });
        }
      }
    );
  }

}
