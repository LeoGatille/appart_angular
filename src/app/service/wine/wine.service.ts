import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private uri = `${Globals.APP_API_URL}/wine`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllWines() {
    return this.http.get(`${this.uri}`);
  }
  public createWine(category: number,
    designation: number,
    color: number,
    label: number,
    wineName: string,
    winePrice: number,
    vintage: number,
    status: number
  ) {
    return this.http.post(`${this.uri}/admin/create`, { category, designation, color, label, wineName, winePrice, vintage, status });
  }
  public editWine(category: number,
    designation: number,
    color: number,
    label: number,
    wineName: string,
    winePrice: number,
    vintage: number,
    status: number, id) {
    return this.http.put(`${this.uri}/admin/${id}/edit`, { category, designation, color, label, wineName, winePrice, vintage, status });
  }
  public getOneWine(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }
  public deleteWine(id: number) {
    return this.http.delete(`${this.uri}/admin/${id}/delete`);
  }
  public patchWine(id: number, status: number) {
    console.log('Servicepatch->id= ', id);
    console.log('Servicepatch->status= ', id);
    return this.http.patch(`${this.uri}/admin/${id}/patch`, { status });
  }
}
