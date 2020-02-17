import { Component, OnInit } from '@angular/core';
import {User} from '../../class/user';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.auth.currentUser;
  }

}
