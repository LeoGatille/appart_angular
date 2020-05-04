import { User } from './user';
export interface DataToken {
  getData(): string;
  isValid() : boolean;
  getUser() : string;
}
export class Token implements DataToken{
  constructor(token:string) {
    this.token = token;
  }
  token: string | null;
  public getData(): string {
    let tokenArray = this.token.split('.');
    return atob(tokenArray[1]);
  }
  public isValid() {
    let jsonToken = JSON.parse(this.getData());
    if(jsonToken.exp > Math.floor(Date.now() / 1000)) {
      return true;
    }
    return false;
  }
  public getUser() {
    let jsonToken = JSON.parse(this.getData());
    let user: User = {
      username: jsonToken.username,
      roles: jsonToken.roles
    };
    return  JSON.stringify(user);
  }
}
