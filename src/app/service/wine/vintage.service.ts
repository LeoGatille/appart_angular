import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Vintage} from '../../class/wine/vintage';

@Injectable({
  providedIn: 'root'
})
export class VintageService {

  private uri = `${Globals.APP_API_URL}/vintage`;
  private allVintagePromise: Promise<Vintage[]>;
  constructor(
    private http: HttpClient
  ) { }

  public getAllVintages(force = false) {
    if (this.allVintagePromise && !force) {
      return Promise.resolve(this.allVintagePromise);
    }
    this.allVintagePromise = this.http.get<Vintage[]>(`${this.uri}`).toPromise();
    return this.allVintagePromise;
  }
  // getAllVintages() {
  //   return this.http.get(`${this.uri}`);
  // }
  public create(vintageYear: number) {
    console.log('vintageService !');
    return this.http.post(`${this.uri}/create`, { vintageYear });
  }
  public editVintage( vintageYear: number, id ) {
    return this.http.put(`${this.uri}/${id}/edit`, {vintageYear});
  }
  public getOneVintage(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteVintage(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
