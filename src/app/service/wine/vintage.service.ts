import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VintageService {

  private uri = `${Globals.APP_API_URL}/vintage`;
  constructor(
    private http: HttpClient
  ) { }

  getAllVintages() {
    return this.http.get(`${this.uri}`);
  }
  createVintage(vintageYear: number) {
    console.log('vintageService !');
    return this.http.post(`${this.uri}/create`, { vintageYear });
  }
}
