import {Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../../../class/event';
import {EventService} from '../../../../service/event.service';
import {Food} from '../../../../class/food/food';
import {EventCreateComponent} from '../event-create/event-create.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-event-list-page',
  templateUrl: './event-list-page.component.html',
  styleUrls: ['./event-list-page.component.scss']
})
export class EventListPageComponent implements OnInit {
  chooseId: number | null;
  oldName: string |null;
  oldDescription: string |null;
  oldDate: Date |null;
  oldPriceNoDrinks: number |null;
  oldPriceWithDrinks: number |null;
  oldFoodControl: Food[] |null;
  oldTypeControl: string |null;
  selectedDate: Date | null;
  allEvents: Event[];
  selectedEvent: Event;
  action: string;
  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.action = 'list';
    this.eventService.getAllEvents()
      .subscribe((events: Event[]) => {
        this.allEvents = this.getRealPrices(events);
      });
  }
  getRealPrices(events: Event[]) {
    events.forEach((oneEvent: Event) => {
      oneEvent.realPriceDrink = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(oneEvent.priceWithDrinks / 100));
      oneEvent.realPriceNoDrink = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(oneEvent.priceNoDrinks / 100));
    });
    return events;
  }

  // edit(id) {
  //   if (this.action !== 'edit' ) {
  //     this.action = 'edit';
  //   }
  //   this.chooseId = id;
  //   this.eventService.getOneEvent(id)
  //     .subscribe((event: any) => {
  //       this.selectedEvent = event;
  //
  //       this.oldName = event.eventName;
  //       this.oldDescription = event.eventDescription;
  //       const timestamp = event.eventDate.timestamp;
  //       this.oldDate = new Date(event.eventDate.timestamp * 1000);
  //
  //       this.oldPriceNoDrinks = event.priceNoDrinks;
  //       this.oldPriceWithDrinks = event.priceWithDrinks;
  //       this.oldFoodControl = event.foods;
  //     });
  // }

  getDecimalPrice(price: number) {
    return price * 100;
  }

  callServices($event) {
    const eventId = $event[0];
    const eventData = $event[1];
    const foodsData = $event[2];
    const timestamp = eventData.date.getTime();
    if (this.action !== 'edit') {
      this.eventService.createEvent(
        timestamp,
        eventData.description,
        eventData.name,
        this.getDecimalPrice(eventData.priceNoDrinks),
        this.getDecimalPrice(eventData.priceWithDrinks),
        foodsData
      ).subscribe((event: Event) => {
        this.toast.success('Ajout de ' + event.eventName );
        this.ngOnInit();
      });
    } else {
      this.eventService.editEvent(
        eventId,
        timestamp,
        eventData.description,
        eventData.name,
        eventData.priceNoDrinks,
        eventData.priceWithDrinks,
        foodsData
      ).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
  edit(event: Event) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Edition',
      event,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) =>  {
        this.ngOnInit();
      }
    );

  }

  // changeAction() {
  //   if (this.action === 'edit') {
  //     this.oldName = null;
  //     this.oldDescription = null;
  //     const timestamp = null;
  //     this.oldDate = null;
  //
  //     this.oldPriceNoDrinks = null;
  //     this.oldPriceWithDrinks = null;
  //     this.oldFoodControl = null;
  //   }
  //   this.action = 'list';
  // }


  // delete(id) {
  //   this.eventService.deleteEvent(id)
  //     .subscribe(() => {
  //       this.ngOnInit();
  //     });
  // }

  delete(event: Event) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      suppr: event.eventName,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  {
        console.log('data === ', data);
        if (data) {
          this.eventService.deleteEvent(event.id)
            .subscribe(() => {
              this.toast.success('Suppression effectuée');
              this.ngOnInit();
            });
        }
      }
    );
  }
}
