
import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private sessionService: SessionService, private router: Router) {

    sessionService.getCookie();

  }

  ngOnInit() {
    // this.sessionService.isLoggedIn()
    // .subscribe(
    //   (user) => this.successCb(user)
    // );
  }



}
