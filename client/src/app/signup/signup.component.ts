import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class UserSignupComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: '',
    email: '',
    role: '',
    description: ''
  };
  error: string;
  privateData: any = '';

  // Corrige los errores de compilación de angular,
  // las propiedades deben existir previamente.
  selectOptions: any;
  isDisabled: any;

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.sessionService.isLoggedIn()
      .subscribe(
        (user) => this.successCb(user)
      );
  }

  signup() {
  this.sessionService.signup(this.formInfo)
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
     this.router.navigate(['/login']);
   }
}
