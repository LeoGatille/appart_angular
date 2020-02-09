import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Designation} from '../../class/wine/designation';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private uri = `${Globals.APP_API_URL}/designation`;
  private allDesignationPromise: Promise<Designation[]>;
  constructor(
    private http: HttpClient
  ) { }

  public getAllDesignations(force = false) {
    if (this.allDesignationPromise && !force) {
      return Promise.resolve(this.allDesignationPromise);
    }
    this.allDesignationPromise = this.http.get<Designation[]>(`${this.uri}`).toPromise();
    return this.allDesignationPromise;
  }
  // public getAllDesignations() {
  //   return this.http.get(`${this.uri}`);
  // }
  public create(designationName: string) {
    return this.http.post(`${this.uri}/create`, {designationName});
  }
  public editDesignation( designationName: string, id ) {
    return this.http.put(`${this.uri}/${id}/edit`, {designationName});
  }
  public getOneDesignation(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteDesignation(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
