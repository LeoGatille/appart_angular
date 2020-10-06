import { map } from 'rxjs/operators';
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
    this.allVintagePromise = this.http.get<Vintage[]>(`${this.uri}`).toPromise()
    .then(list => list.map(raw => Object.assign(new Vintage(), raw)));
    return this.allVintagePromise;
  }
  // getAllVintages() {
  //   return this.http.get(`${this.uri}`);
  // }
  public create(vintageYear: number) {
    const result = this.http.post(`${this.uri}/admin/create`, { vintageYear })
      .pipe(
        map(response => Object.assign(new Vintage(), response))
      );
    return result;
  }
  public editVintage( vintageYear: number, id ) {
    return this.http.put(`${this.uri}/admin/${id}/edit`, {vintageYear});
  }
  public getOneVintage(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteVintage(id: number) {
    return this.http.delete(`${this.uri}/admin/${id}/delete`);
  }
}
