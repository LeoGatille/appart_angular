import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Allergen} from '../../class/food/allergen';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private uri = `${Globals.APP_API_URL}/food`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllFood() {
    return this.http.get(`${this.uri}`);
  }
  public createFood(foodName: string, foodDescription: string, allergens: Allergen[]) {
    return this.http.post(`${this.uri}/create`, {foodName, foodDescription, allergens});
  }
  public editFood(id: number, foodName: string, foodDescription: string, allergens: Allergen[]) {
    return this.http.post(`${this.uri}/${id}/edit`, {foodName, foodDescription, allergens});
  }
  public getOneFood(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteFood(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
