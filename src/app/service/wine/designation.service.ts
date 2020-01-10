import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private uri = `${Globals.APP_API_URL}/designation`;
  constructor(
    private http: HttpClient
  ) { }

  public getAllDesignations() {
    return this.http.get(`${this.uri}`);
  }
  public createDesignation(designationName: string) {
    return this.http.post(`${this.uri}/create`, {designationName});
  }
}
