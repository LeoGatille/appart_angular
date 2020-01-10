import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private uri = `${Globals.APP_API_URL}/color`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllColors() {
    return this.http.get(`${this.uri}`);
  }
  public createColor( colorName: string, colorOrder: number) {
    console.log('colorName = ' + colorName);
    console.log('order = ' + colorName);
    return this.http.post(`${this.uri}/create`, { colorName, colorOrder });
  }
}
