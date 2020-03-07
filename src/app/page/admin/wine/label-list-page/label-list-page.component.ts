import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';
import {Label} from '../../../../class/wine/label';
import {LabelService} from '../../../../service/wine/label.service';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../../../class/wine/category';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';

@Component({
  selector: 'app-label-list-page',
  templateUrl: './label-list-page.component.html',
  styleUrls: ['./label-list-page.component.scss']
})
export class LabelListPageComponent implements OnInit {

  listToAdd: Label[];
  class: Label;
  placeholderName: string;
  labelPromise: any;
  constructor(
    private labelService: LabelService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.getLabels();
  }
  getLabels(force = false) {
    this.labelPromise = (bool) => this.labelService.getAllLabels((force));
    this.labelPromise().then((data: any[]) => {
      this.listToAdd = data;
    });
  }

  createLabel($event) {
    this.labelService.create($event.nameControl)
      .subscribe((label: Label) => {
        this.listToAdd.push(label);
      });
  }
  editInit(id: number) {
    this.labelService.getOneLabel(id)
      .subscribe((label: Label) => {
        this.launchModalCreation(label);
      });
  }
  launchModalCreation(label: Label) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modal: true,
      nameValue: label.labelName,
      nameField: true,
      title: 'Modification' ,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.editLabel(data, label.id)
    );
  }
  editLabel(data, id) {
    this.labelService.editLabel(data.nameControl, id)
      .subscribe( () => {
        this.getLabels(true);
      });
  }
  delete(id: number) {
    this.labelService.deleteLabel(id)
      .subscribe(() => {
        this.getLabels(true);
      });
  }
}
