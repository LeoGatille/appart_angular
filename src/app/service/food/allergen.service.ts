import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllergenService {

  private uri = `${Globals.APP_API_URL}/allergen/`;
  constructor(
    private http: HttpClient
  ) { }

  public getAllAllergens() {
    return this.http.get(`${this.uri}`);
  }
  public deleteAllergen(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
