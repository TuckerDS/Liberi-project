import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private sessionService: SessionService, private router: Router) {

  }

  ngOnInit() {
    this.sessionService.isLoggedIn()
    .subscribe(
      (user) => this.logged(user)
    );

    this.sessionService.getLogginEmitter().subscribe(
      user => this.logged(user)

    );


  }
  logged(user) {
      this.user = user;
      console.log("logged");
  }

  logError(err) {

    console.log("ERROR EN NAVBAR"+err);
  }

  logout(){
    this.sessionService.logout();
  }

}
