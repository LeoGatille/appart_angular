import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private allImages: any;
  private uri = `${Globals.APP_API_URL}/image`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllImages() {
    return this.http.get(`${this.uri}`);
  }
  public createImage(image: any) {
    return this.http.post(`${this.uri}/admin/create`, image);
  }
  public deleteImage(id: number) {
    return this.http.delete(`${this.uri}/admin/${id}/delete`);
  }
}
