import { Injectable } from '@angular/core';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private allImagess: any;
  private uriAdmin = `${Globals.APP_API_URL}/gallery`;
  private uri = `${Globals.APP_API_URL}/image`;
  constructor(
    private http: HttpClient
  ) { }

  public getAllImages() {
    return this.http.get(`${this.uriAdmin}`);
  }
  public getAllChoosenImages() {
    return this.http.get(`${this.uri}`);
  }
  public createChoosenImages(imageUrl: string, imageAlt: string) {
    return this.http.post(`${this.uri}/create`, {imageUrl, imageAlt});
  }
  public deleteLabel(id: number) {
    return this.http.delete(`${this.uri}/${id}/delete`);
  }
}
