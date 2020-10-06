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
  loading = true;
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
  }
  getColors(force = false) {
    this.colorPromise = (bool) => this.colorService.getAllColors((force));
    this.colorPromise().then((data: any[]) => {
      this.listToAdd = data;      
      this.loading = false;
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
  childAskFor(request: any) {
    switch(request.action) {
      case('refresh') :
        this.toast.success(request.message);
        this.getColors(true);
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
