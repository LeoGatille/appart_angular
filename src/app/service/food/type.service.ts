import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private uri = `${Globals.APP_API_URL}/type/`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllType() {
    return this.http.get(`${this.uri}`);
  }
}
