import {Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../../../class/event';
import {EventService} from '../../../../service/event.service';
import {Food} from '../../../../class/food/food';
import {EventCreateComponent} from '../event-create/event-create.component';

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
  ) { }

  ngOnInit() {
    this.action = 'list';
    this.eventService.getAllEvents()
      .subscribe((events: Event[]) => {
        this.allEvents = events;
      });
    console.log('eventDate = ', this.allEvents);
  }
  log(date) {
    console.log('realDate = ', date);
  }

  edit(id) {
    if (this.action !== 'edit' ) {
      this.action = 'edit';
    }
    this.chooseId = id;
    this.eventService.getOneEvent(id)
      .subscribe((event: any) => {
        this.selectedEvent = event;

        this.oldName = event.eventName;
        this.oldDescription = event.eventDescription;
        const timestamp = event.eventDate.timestamp;
        this.oldDate = new Date(event.eventDate.timestamp * 1000);

        this.oldPriceNoDrinks = event.priceNoDrinks;
        this.oldPriceWithDrinks = event.priceWithDrinks;
        this.oldFoodControl = event.foods;
      });
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
        eventData.priceNoDrinks,
        eventData.priceWithDrinks,
        foodsData
      ).subscribe(() => {
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
  changeAction() {
    if (this.action === 'edit') {
      this.oldName = null;
      this.oldDescription = null;
      const timestamp = null;
      this.oldDate = null;

      this.oldPriceNoDrinks = null;
      this.oldPriceWithDrinks = null;
      this.oldFoodControl = null;
    }
    this.action = 'list';
  }
  delete(id) {
    this.eventService.deleteEvent(id)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}
