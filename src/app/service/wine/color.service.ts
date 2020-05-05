import { map } from 'rxjs/operators';
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
    this.allColorsPromise = this.http.get<Color[]>(`${this.uri}`)
    .toPromise()
    .then(list => list.map(raw => Object.assign(new Color(), raw)));
    return this.allColorsPromise;
  }
  // public getAllColors() {
  //   return this.http.get(`${this.uri}`);
  // }
  public create( colorName: string) {
    const result = this.http.post(`${this.uri}/admin/create`, { colorName })
      .pipe(
        map(response => Object.assign(new Color, response))
      );
    return result;
  }
  public editColor( colorName: string, id ) {
    return this.http.put(`${this.uri}/admin/${id}/edit`, { colorName });
  }
  public getOneColor(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteColor(id: number) {
    console.log('delete');
    return this.http.delete(`${this.uri}/admin/${id}/delete`);
  }
}
