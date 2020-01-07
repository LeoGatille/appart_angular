import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private uri = `${Globals.APP_API_URL}/food/`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllFood() {
    return this.http.get(`${this.uri}`);
  }
}
