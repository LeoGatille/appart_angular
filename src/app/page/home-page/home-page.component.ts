import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../../service/message.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Formula} from '../../class/formula';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private dialog: MatDialog,
  ) {}
  ngOnInit() {
    if(!this.messageService.messageAppeared) {
      this.messageService.getMessage()
        .subscribe((message: any) => {
          console.log('message = ', message);
          if (message[0].display) {
            this.launchModalCreation();
          }
        });
    }
   }

  launchModalCreation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modal: true,
      title: 'Cher visiteur',
      message: true,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => this.messageService.messageAppeared = true);
  }
}
