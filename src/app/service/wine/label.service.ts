import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

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
}
