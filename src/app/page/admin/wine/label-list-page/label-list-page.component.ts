import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {Label} from '../../../../class/wine/label';
import {LabelService} from '../../../../service/wine/label.service';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../../../class/wine/category';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-label-list-page',
  templateUrl: './label-list-page.component.html',
  styleUrls: ['./label-list-page.component.scss']
})
export class LabelListPageComponent implements OnInit {
  loading = true;
  listToAdd: Label[];
  class: Label;
  placeholderName: string;
  labelPromise: any;
  constructor(
    private labelService: LabelService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.getLabels();
  }
  getLabels(force = false) {
    this.labelPromise = (bool) => this.labelService.getAllLabels((force));
    this.labelPromise().then((data: any[]) => {
      this.listToAdd = data;
      this.loading = false;
    });
  }
  createLabel($event) {
    this.labelService.create($event.nameControl)
      .subscribe((label: Label) => {
        this.toast.success('Ajout effectué' + ' "' + label.getName() + '"');
        this.listToAdd.push(label);
      },
      error => {
        this.toast.error(error.error)
      });
  }
  childAskFor(request: any) {
    switch(request.action) {
      case('refresh') :
        this.toast.success(request.message);
        this.getLabels(true);
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
