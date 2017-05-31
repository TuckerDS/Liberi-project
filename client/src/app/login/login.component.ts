import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class UserLoginComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;
  privateData: any = '';

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.sessionService.isLoggedIn()
      .subscribe(
        (user) => this.successCb(user),
      );
  }

  login() {
    this.sessionService.login(this.formInfo)
      .subscribe(
        (user) => this.successCb(user),
        (err) => this.errorCb(err)
      );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
    this.router.navigate(['/']);
  }

}
