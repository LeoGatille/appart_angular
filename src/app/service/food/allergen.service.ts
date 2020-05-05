import { map } from 'rxjs/operators';
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
    this.allAllergensPromise = this.http.get<Allergen[]>(`${this.uri}`).toPromise()
    .then(list => list.map(raw => Object.assign(new Allergen, raw)));
    return this.allAllergensPromise;
  }
  public create(allergenName) {
   const reslut = this.http.post(`${this.uri}/admin/create`, {allergenName})
      .pipe(
        map(response => Object.assign(new Allergen(), response))
      );
    return reslut;
  }
  public deleteAllergen(id: number) {
    console.log('serviceDelete', id);
    return this.http.delete(`${this.uri}/admin/${id}/delete`);
  }
}
