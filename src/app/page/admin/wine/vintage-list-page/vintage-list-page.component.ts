import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {Vintage} from '../../../../class/wine/vintage';
import {VintageService} from '../../../../service/wine/vintage.service';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../../../class/wine/category';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-vintage-list-page',
  templateUrl: './vintage-list-page.component.html',
  styleUrls: ['./vintage-list-page.component.scss']
})
export class VintageListPageComponent implements OnInit {
  loading = true;
  listToAdd: Vintage[];
  class: Vintage;
  vintagePromise: any;
  constructor(
    private vintageService: VintageService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private toast: ToastrService,
  ) {}
  ngOnInit() {
    this.getVintages();
  }
  getVintages(force = false) {
    this.vintagePromise = (bool) => this.vintageService.getAllVintages((force));
    this.vintagePromise().then((data: any[]) => {
      this.listToAdd = data;
      this.loading = false;
    });
  }
  createVintage($event) {
    this.vintageService.create($event.numberControl)
      .subscribe((vintage: Vintage) => {
        this.toast.success('Ajout effectué' + ' "' + vintage.vintageYear + '"');
        this.listToAdd.push(vintage);
      },
      error => {
        this.toast.error(error.error)
      });
  }
  childAskFor(request: any) {
    switch(request.action) {
      case('refresh') :
        this.toast.success(request.message);
        this.getVintages(true);
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
