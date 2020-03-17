import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Allergen} from '../../class/food/allergen';

@Injectable({
  providedIn: 'root'
})
export class AllergenService {

  private uri = `${Globals.APP_API_URL}/allergen`;
  allAllergensPromise: Promise<Allergen[]> | null;
  constructor(
    private http: HttpClient
  ) { }

  public getAllAllergens(force = false) {
    if (this.allAllergensPromise && !force) {
      return Promise.resolve(this.allAllergensPromise);
    }
    this.allAllergensPromise = this.http.get<Allergen[]>(`${this.uri}`).toPromise();
    return this.allAllergensPromise;
  }

  // public getAllAllergens() {
  //   return this.http.get(`${this.uri}`);
  // }
  public create(allergenName) {
    console.log('serviceCreate', allergenName);
    return this.http.post(`${this.uri}/admin/create`, {allergenName});
  }
  public deleteAllergen(id: number) {
    console.log('serviceDelete', id);
    return this.http.delete(`${this.uri}/admin/${id}/delete`);
  }
}
