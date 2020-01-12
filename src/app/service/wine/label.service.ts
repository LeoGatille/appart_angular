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
  public controlLabel(newLabelName: string) {
    this.allLabels = this.getAllLabels();
    this.allLabels.forEach(label => {
      if (label.labelName === newLabelName) {
        return label.id;
      }
    });
    return false;
    // this.allLabels.pipe(map(label => this.allLabels));
    // if (this.allLabels.labelName.toLowerCase().includes(newLabelName.toLowerCase())) {
    //   return this.allLabels.id;
    // }
    // return false;
  }
}
