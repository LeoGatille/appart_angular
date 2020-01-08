import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private uri = `${Globals.APP_API_URL}/wine`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllWines() {
    return this.http.get(`${this.uri}`);
  }
}
