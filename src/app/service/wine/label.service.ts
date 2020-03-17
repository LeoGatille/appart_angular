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
    this.allLabelsPromise = this.http.get<Label[]>(`${this.uri}`).toPromise();
    return this.allLabelsPromise;
  }
  // public getAllLabels() {
  //  return this.http.get(`${this.uri}`);
  // }
  public create(labelName: string) {
    return this.http.post(`${this.uri}/admin/create`, {labelName});
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
