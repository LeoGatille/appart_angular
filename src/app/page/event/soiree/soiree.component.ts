import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../service/event.service';
import {Food} from '../../../class/food/food';
import {Event} from '../../../class/event';

@Component({
  selector: 'app-soiree',
  templateUrl: './soiree.component.html',
  styleUrls: ['./soiree.component.scss']
})
export class SoireeComponent implements OnInit {


  newEventsList: any[] = [];

  loading = true;

  eventList: Event[] = [];
  constructor(
    private eventService: EventService
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
    this.eventList.forEach(event => {
      this.sortEvent(event);
    });
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


    newEvent.eventName = event.eventName;
    newEvent.eventDescription = event.eventDescription;
    newEvent.eventDate = event.eventDate;
    newEvent.timestamp = event.timestamp;
    newEvent.priceWithDrinks = event.priceWithDrinks;
    newEvent.priceNoDrinks = event.priceNoDrinks;
    newEvent.entrees = entrees;
    newEvent.plats = plats;
    newEvent.dessert = dessert;

    this.newEventsList.push(newEvent);
    this.loading = false;

    console.log('eventList =', this.newEventsList);
  }

}
