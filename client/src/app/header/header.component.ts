import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser: any;

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.loggedUser = this.sessionService.loggedUser;
    this.sessionService.getLogginEmitter().subscribe(
      user => {
        this.loggedUser = user;
      }
    );
  }

  logged(user) {
    this.loggedUser = user;
  };

  logError(err) {
    console.log('ERROR EN NAVBAR' + err);
  };

  logout() {
    this.sessionService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  };

  isLoggedIN() {
    this.sessionService.isLoggedIn().subscribe(user => console.log(user));
  }
};
