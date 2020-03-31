import { Injectable } from '@angular/core';
import {Globals} from '../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private uri = `${Globals.APP_API_URL}/message`;
  constructor(
    private http: HttpClient
  ) { } 
  public getMessage() {
    return this.http.get(`${this.uri}`);
  }
  public editMessage(id: number, messageText: string, display: number) {
    return this.http.put(`${this.uri}/admin/${id}/edit`, {messageText, display});
  }
  public patchMessage(id: number, display: number) {
    return this.http.patch(`${this.uri}/admin/${id}/patch`, {display});
  }
}

