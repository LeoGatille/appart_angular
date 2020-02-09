import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../class/wine/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private uri = `${Globals.APP_API_URL}/category`;
  private allCategoriesPromise: Promise<Category[]> | null;
  constructor(
    private http: HttpClient
  ) { }
  public getAllCategories(force = false) {
    if (this.allCategoriesPromise && !force) {
      return Promise.resolve(this.allCategoriesPromise);
    }
    this.allCategoriesPromise = this.http.get<Category[]>(`${this.uri}`).toPromise();
    return this.allCategoriesPromise;
  }
  // public getAllCategories() {
  //   return this.http.get(`${this.uri}`);
  // }
  public create( categoryName: string ) {
    return this.http.post(`${this.uri}/create`, {categoryName});
  }
  public getOneCategory(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public editCategory( categoryName: string, id ) {
    return this.http.put(`${this.uri}/${id}/edit`, {categoryName});
  }
  public deleteCategory(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
