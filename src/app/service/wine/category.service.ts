import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private uri = `${Globals.APP_API_URL}/category`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllCategories() {
    return this.http.get(`${this.uri}`);
  }
  public createCategory( categoryName: string, categoryOrder: number ) {
    return this.http.post(`${this.uri}/create`, {categoryName, categoryOrder});
  }
  public getOneCategory(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public editCategory( categoryName: string, categoryOrder: number, id ) {
    return this.http.put(`${this.uri}/${id}/edit`, {categoryName, categoryOrder});
  }
}
