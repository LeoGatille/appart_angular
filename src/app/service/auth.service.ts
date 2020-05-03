import { log } from 'util';
import { Token } from './../class/data-token';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals';
import {map} from 'rxjs/operators';
import {DataToken} from '../class/data-token';
import {User} from '../class/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri = `${Globals.APP_API_URL}/login`;
  private uriProfile = `${Globals.APP_API_URL}/auth/profile`;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  login(username: string, password: string) {
    return this.httpClient
      .post(this.uri, { username, password })
      .pipe(map( (data: Token) => {
        if (data && data.token) {
          // SAUVER MON TOKEN DANS LOCALSTORAGE
          localStorage.setItem(Globals.APP_USER_TOKEN, data.token);          
        }
        return Object.assign(new Token, data);
      }));
  }
  logout() {
    localStorage.removeItem(Globals.APP_USER_TOKEN);
    localStorage.removeItem(Globals.APP_USER);
    this.router.navigate(['']);
  }

  profile(token: Token) {
    const user = token.getUser();
    if(user) {
      localStorage.setItem(Globals.APP_USER, token.getUser());
      return true;
    }
    return false;
    // return this.httpClient
      // .get(this.uriProfile, {})
      // .pipe(map( (user: User) => {
      //   if (user) {
      //     localStorage.setItem(Globals.APP_USER, JSON.stringify(user));
      //     return true;
      //   }
      //   return false;
      // }));
  }

  public get tokenData(): string {
    
    return localStorage.getItem(Globals.APP_USER_TOKEN);
  }

  public get currentUser(): User {
    return JSON.parse(localStorage.getItem(Globals.APP_USER));
  }

  public isAdmin(): boolean {
    const user = this.currentUser;
    const roles = user.roles || [];
    if ( roles.includes('ROLE_ADMIN')) {
      return true;
    }
    return false;
  }

  public isConnected(): boolean {
    if(this.tokenData) {
      const token: Token = new Token();

      token.token = this.tokenData;
      return  token.isValid();
    }
    return false;
  }
}
