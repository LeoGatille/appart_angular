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
    return this.http.post(`${this.uri}/create`, { colorName, colorOrder });
  }
  public editColor( colorName: string, colorOrder: number, id ) {
    return this.http.put(`${this.uri}/${id}/edit`, { colorName, colorOrder });
  }
  public getOneColor(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteColor(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
