import { Injectable } from '@angular/core';
import {Globals} from '../globals';
import {HttpClient} from '@angular/common/http';
import {Allergen} from '../class/food/allergen';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private uri = `${Globals.APP_API_URL}/event`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllEvents() {
    return this.http.get(`${this.uri}`);
  }
  public createEvent(eventDate: number,
                     eventDescription: string,
                     eventName: string,
                     priceNoDrinks: number,
                     priceWithDrinks: number) {
    return this.http.post(`${this.uri}/create`, {eventDate, eventDescription, eventName, priceNoDrinks, priceWithDrinks});
  }
  public editEvent(id: number,
                   eventDate: number,
                   eventDescription: string,
                   eventName: string,
                   priceNoDrinks: number,
                   priceWithDrinks: number) {
    return this.http.post(`${this.uri}/${id}/edit`, {eventDate, eventDescription, eventName, priceNoDrinks, priceWithDrinks});
  }
  public getOneEvent(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteEvent(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
