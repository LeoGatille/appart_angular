import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Label} from '../../class/wine/label';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private allLabels: any;
  private uri = `${Globals.APP_API_URL}/label`;
  constructor(
    private http: HttpClient
  ) { }

  public getAllLabels() {
   return this.http.get(`${this.uri}`);
  }
  public createLabel(labelName: string) {
    return this.http.post(`${this.uri}/create`, {labelName});
  }
  public editLabel( labelName: string, id ) {
    return this.http.put(`${this.uri}/${id}/edit`, {labelName});
  }
  public getOneLabel(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }

}
