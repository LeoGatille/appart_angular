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
  public createWine(category: number,
                    designation: number,
                    color: number,
                    label: number,
                    wineName: string,
                    winePrice: number,
                    vintage: number,
                    status: number
                  ) {
    return this.http.post(`${this.uri}/create`, {category, designation, color, label, wineName, winePrice, vintage, status});
  }
  public wineAttributPromise() {

  }
}
