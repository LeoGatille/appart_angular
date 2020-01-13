import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private uri = `${Globals.APP_API_URL}/status`;
  constructor(
    private http: HttpClient
  ) { }

  getAllStatus() {
    return this.http.get(`${this.uri}`);
  }
}
