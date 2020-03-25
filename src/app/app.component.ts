import {Component, OnInit} from '@angular/core';
import {TitleService} from './service/title.service';
import {AuthService} from './service/auth.service';
import {User} from './class/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'l\'appart\'';
  user: User;
  
  click = false;
  constructor( private titleService: TitleService,
               private auth: AuthService,
               private router: Router
               ) {
              
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

  adminAccess() {
    this.click = true;
    setTimeout(()=> {
      if(this.click) {
        this.router.navigate(['/admin']);
        this.click = false;
      }
    }, 3000)
  }
  stopClick() {
    this.click = false;
  }
}
