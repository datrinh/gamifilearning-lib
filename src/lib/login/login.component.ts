import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MESLISPW, MESLISUSER } from '../config';

@Component({
  selector: 'gl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = MESLISUSER;
  password = MESLISPW;

  constructor(private user: UserService) {}

  ngOnInit() {}

  login() {
    this.user.login(this.username, this.password);
  }
}
