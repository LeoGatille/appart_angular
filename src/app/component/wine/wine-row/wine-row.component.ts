import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WineService} from '../../../service/wine/wine.service';
import {StatusService} from '../../../service/wine/status.service';
import {Wine} from '../../../class/wine/wine';
import {Status} from '../../../class/wine/status';
import {Food} from '../../../class/food/food';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../dialog/dialog.component';

@Component({
  selector: 'app-wine-row',
  templateUrl: './wine-row.component.html',
  styleUrls: ['./wine-row.component.scss']
})
export class WineRowComponent implements OnInit {

  @Output() delete = new EventEmitter<any>();
  @Output() editData = new EventEmitter<any>();
  @Input() wine: Wine;
  status: Status;
  allStatus: Status[];
  showAllStatus = false;
  showCurrentStatus = false;
  loading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private wineService: WineService,
    private statusService: StatusService,
    private dialog: MatDialog,
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log('activatedRoute.params = ', params);
      });
    this.statusService.getAllStatus()
      .subscribe((allstatus: Status[]) => {
        this.allStatus = allstatus;
      });

  }
  sendDelete(id) {
    this.delete.emit(id);
  }
  log() {
    console.log('mega toto');
  }
  showWineStatus() {
    if (this.showAllStatus) {
      return this.showAllStatus = false;
    }
    return this.showAllStatus = true;
  }
  editWineStatus(idStatus) {
    if (this.showAllStatus) {
      this.wineService.patchWine(this.wine.id, idStatus )
        .subscribe((patchedWine: Wine) => {
          this.wine.status = patchedWine.status;
          this.showAllStatus = false;
          if (this.wine.status.id !== 1) {
            this.showCurrentStatus = true;
          }
        });
    }
    console.log('idStatus = ', idStatus );
    console.log('wine.status.id = ', this.wine.status.id);
  }


  ngOnInit() {
    if (this.wine.status.id !== 1) {
      this.showCurrentStatus = true;
    }
    this.loading = false;

  }

  editWine(wine: Wine) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      wine,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  this.editData.emit()
    );
  }
}
