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
  public createEvent(eventDate: any,
                     eventDescription: string,
                     eventName: string,
                     priceNoDrinks: number,
                     priceWithDrinks: number,
                     foods: number[] | null) {
    console.log('eventDate = ', eventDate);
    console.log('eventDescription = ', eventDescription);
    console.log('eventName = ', eventName);
    console.log('priceNoDrinks = ', priceNoDrinks);
    console.log('priceWithDrinks = ', priceWithDrinks);
    console.log('eventDate = ', foods);
    return this.http.post(`${this.uri}/create`, {eventDate, eventDescription, eventName, priceNoDrinks, priceWithDrinks, foods});
  }
  public editEvent(id: number,
                   eventDate: any,
                   eventDescription: string,
                   eventName: string,
                   priceNoDrinks: number,
                   priceWithDrinks: number,
                   foods: number[] | null) {
    console.log('eventDate = ', eventDate);
    console.log('eventDescription = ', eventDescription);
    console.log('eventName = ', eventName);
    console.log('priceNoDrinks = ', priceNoDrinks);
    console.log('priceWithDrinks = ', priceWithDrinks);
    console.log('eventDate = ', foods);
    return this.http.put(`${this.uri}/${id}/edit`, {eventDate, eventDescription, eventName, priceNoDrinks, priceWithDrinks, foods});
  }
  public getOneEvent(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteEvent(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
