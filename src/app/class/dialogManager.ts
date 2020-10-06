import { EditionModalComponent } from './../dialog/edition-modal/edition-modal.component';
import { AutoCompleteInterface } from './autoCompleteInteface';
import { ServiceLocator } from './serviceLocator';
import { SuppressionDialogComponent } from '../dialog/suppression-dialog/suppression-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { clearInterval } from 'timers';
import { Injectable, Injector } from '@angular/core';
import { Location, LocationStrategy, PlatformLocation } from '@angular/common';
import { timeout, map } from 'rxjs/operators';
@Injectable()
export class DialogManger {
    constructor() {}
  dialog: MatDialog = ServiceLocator.injector.get(MatDialog);
  dialogConfig = new MatDialogConfig;
  public launchEditionModal(name) {
    this.dialogConfig.data = {
      name
    }
    const dialogRef = this.dialog.open(EditionModalComponent, this.dialogConfig);
    return dialogRef.afterClosed()
    .pipe(map(result => !result ? '' : result))
      .toPromise<string>();    
  }
  public launchSuppressionModal(name: string): Promise<boolean> {
      this.dialogConfig.data = { 
          name
      };
    const dialogRef =  this.dialog.open(SuppressionDialogComponent, this.dialogConfig);
    return dialogRef.afterClosed()
    .pipe(timeout(10000))
    .toPromise<boolean>();
  }
}