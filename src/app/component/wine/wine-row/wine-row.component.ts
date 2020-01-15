import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WineService} from '../../../service/wine/wine.service';
import {StatusService} from '../../../service/wine/status.service';
import {Wine} from '../../../class/wine/wine';
import {Status} from '../../../class/wine/status';

@Component({
  selector: 'app-wine-row',
  templateUrl: './wine-row.component.html',
  styleUrls: ['./wine-row.component.css']
})
export class WineRowComponent implements OnInit {

  @Input() wine: Wine;
  status: Status;
  allStatus: Status[];
  showAllStatus = false;
  showCurrentStatus = false;
  loading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private wineService: WineService,
    private statusService: StatusService
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log(params);
      });
    this.statusService.getAllStatus()
      .subscribe((allstatus: Status[]) => {
        this.allStatus = allstatus;
      });

  }
  delete(id) {
    this.wineService.deleteWine(id)
      .subscribe();
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
        .subscribe((status: Status) => {
          console.log('nouveau status = ', status);
          this.wine.status = status;
        });
    }
    this.showAllStatus = false;
    if (this.wine.status.id !== 1) {
      this.showCurrentStatus = true;
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

}