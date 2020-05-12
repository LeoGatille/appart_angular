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
  newEventsList;
  loading = true;
  chooseId: number | null;
  oldName: string |null;
  oldDescription: string |null;
  oldDate: Date |null;
  oldPriceNoDrinks: number |null;
  oldPriceWithDrinks: number |null;
  oldFoodControl: Food[] |null;
  oldTypeControl: string |null;
  selectedDate: Date | null;
  eventList: Event[];
  selectedEvent: Event;
  action: string;
  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.getEvents();
  }
  getEvents() {
    this.eventService.getAllEvents()
      .subscribe((events: Event[]) => {
        this.eventList = events;
        this.refactoEvents();
      });
  }
  refactoEvents() {
    this.newEventsList = [];
    this.eventList.forEach(event => {
      event = this.getRealPrices(event);
      this.sortEvent(event);
    });
    console.log('LA LISTE = ', this.eventList);
  }
  getRealPrices(event: Event) {
    event.realPriceDrink = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(event.priceWithDrinks / 100));
    event.realPriceNoDrink = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(event.priceNoDrinks / 100));
    return event;
  }
  sortEvent(event: Event) {
    const newEvent: any = {};
    const entrees: Food[] = [];
    const plats: Food[] = [];
    const dessert: Food[] = [];
    event.food.forEach(food => {
      switch (food.type.id) {
        case 1 :
          entrees.push(food);
          break;
        case 2 :
          plats.push(food);
          break;
        case 3 :
          dessert.push(food);
          break;
      }
    });
    newEvent.id = event.id;
    newEvent.eventName = event.eventName;
    newEvent.eventDescription = event.eventDescription;
    newEvent.eventDate = event.eventDate;
    newEvent.timestamp = event.timestamp;
    newEvent.priceWithDrinks = event.priceWithDrinks;
    newEvent.priceNoDrinks = event.priceNoDrinks;
    newEvent.realPriceDrink = event.realPriceDrink;
    newEvent.realPriceNoDrink = event.realPriceNoDrink;
    newEvent.entrees = entrees;
    newEvent.plats = plats;
    newEvent.dessert = dessert;
    this.newEventsList.push(newEvent);
    this.loading = false;
  }
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
      event: event,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) =>  {
        this.ngOnInit();
      }
    );
  }
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
              this.getEvents();
            });
        }
      }
    );
  }
}
