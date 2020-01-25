import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Allergen} from '../../class/food/allergen';
import {Food} from '../../class/food/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private uri = `${Globals.APP_API_URL}/food`;
  allFoodsPromise: Promise<Food[]> | null;
  constructor(
    private http: HttpClient
  ) { }
  // public getAllFood(force = false) {
  //   if (this.allFoodsPromise && !force) {
  //     return Promise.resolve(this.allFoodsPromise);
  //   }
  //   this.allFoodsPromise = this.http.get<Food[]>(`${this.uri}`).toPromise();
  //   return this.allFoodsPromise;
  // }
  public createFood(foodName: string, foodDescription: string, type: number, allergens: number[]) {
    return this.http.post(`${this.uri}/create`, {foodName, foodDescription, allergens, type});
  }
  public editFood(id: number, foodName: string, foodDescription: string, type: number, allergens: number[]) {
    console.log(allergens);
    return this.http.put(`${this.uri}/${id}/edit`, {foodName, foodDescription, allergens, type});
  }
  public getOneFood(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteFood(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }

  public getAllFood() {
    return this.http.get(`${this.uri}`);
  }
}
