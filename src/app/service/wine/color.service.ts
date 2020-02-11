import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Color} from '../../class/wine/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private uri = `${Globals.APP_API_URL}/color`;
  allColorsPromise: Promise<Color[]> | null;
  constructor(
    private http: HttpClient
  ) { }
  public getAllColors(force = false) {
    if (this.allColorsPromise && !force) {
      return Promise.resolve(this.allColorsPromise);
    }
    this.allColorsPromise = this.http.get<Color[]>(`${this.uri}`).toPromise();
    return this.allColorsPromise;
  }
  // public getAllColors() {
  //   return this.http.get(`${this.uri}`);
  // }
  public create( colorName: string) {
    return this.http.post(`${this.uri}/create`, { colorName });
  }
  public editColor( colorName: string, id ) {
    return this.http.put(`${this.uri}/${id}/edit`, { colorName });
  }
  public getOneColor(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteColor(id: number) {
    console.log('delete');
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
