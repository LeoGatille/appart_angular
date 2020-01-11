import {Component, OnInit} from '@angular/core';
import {TitleService} from './service/title.service';
import {AuthService} from './service/auth.service';
import {User} from './class/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'l\'appart\'';
  user: User;
  constructor( private titleService: TitleService,
               private auth: AuthService) {

  }
  ngOnInit(): void {
    console.log('APPLICATION STARTED');
    this.titleService.makeTitle();
  }
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }
  logout() {
    this.auth.logout();
  }
}
