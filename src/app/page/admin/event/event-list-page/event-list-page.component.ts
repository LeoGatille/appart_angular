import { Component, OnInit } from '@angular/core';
import {Event} from '../../../../class/event';
import {EventService} from '../../../../service/event.service';

@Component({
  selector: 'app-event-list-page',
  templateUrl: './event-list-page.component.html',
  styleUrls: ['./event-list-page.component.css']
})
export class EventListPageComponent implements OnInit {

  allEvents: Event[];
  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.eventService.getAllEvents()
      .subscribe((events: Event[]) => {
        this.allEvents = events;
      });
    console.log('eventDate = ', this.allEvents);
  }
  log(date) {
    console.log('realDate = ', date);
  }

}
