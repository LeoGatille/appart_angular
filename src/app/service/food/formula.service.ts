import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  private uri = `${Globals.APP_API_URL}/formula`;

  constructor(
    private http: HttpClient
  ) { }

  public getAllFormulas() {
    return this.http.get(`${this.uri}`);
  }
  public createFormula(formulaName: string, formulaPrice: number, description: string) {
    return this.http.post(`${this.uri}/create`, {formulaName, formulaPrice, description});
  }

  public editFormula(id:number, formulaName: string, formulaPrice: number, description: string) {
    return this.http.put(`${this.uri}/${id}/edit`, {formulaName, formulaPrice, description});
  }

  public deleteFormula(id: number) {
    console.log('serviceDelete', id);
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
