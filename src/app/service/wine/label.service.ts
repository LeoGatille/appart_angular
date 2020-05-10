import { log } from 'util';
import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Label} from '../../class/wine/label';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private uri = `${Globals.APP_API_URL}/label`;
  private allLabelsPromise: Promise<Label[]>;
  constructor(
    private http: HttpClient
  ) { }

  public getAllLabels(force = false) {
    if (this.allLabelsPromise && !force) {
      return Promise.resolve(this.allLabelsPromise);
    }
    this.allLabelsPromise = this.http.get<Label[]>(`${this.uri}`).toPromise()
    .then(list => list.map(raw => Object.assign(new Label(), raw)));
    return this.allLabelsPromise;
  }
  // public getAllLabels() {
  //  return this.http.get(`${this.uri}`);
  // }
  public create(labelName: string) {
    const result = this.http.post(`${this.uri}/admin/create`, {labelName})
      .pipe(
        map(value => Object.assign(new Label(), value))
        );
    return result;
  }
  public editLabel( labelName: string, id ) {
    return this.http.put(`${this.uri}/admin/${id}/edit`, {labelName});
  }
  public getOneLabel(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteLabel(id: number) {
    return this.http.delete(`${this.uri}/admin/${id}/delete`);
  }

}
