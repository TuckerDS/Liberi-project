import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { Event } from '../event/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser: any;

  constructor(private sessionService: SessionService, private router: Router) {

  }

  ngOnInit() {

    // this.sessionService.isLoggedIn()
    // .subscribe(
    //   (user) => this.logged(user)
    // );

    this.sessionService.getLogginEmitter().subscribe(
      user => {
        this.loggedUser = user;
        console.log('USUARIO LOGADO EMMITER');
        console.log(this.loggedUser);
      });
  }

  logged(user) {
    console.log(user);
    this.loggedUser = user;
    console.log('LOOOOOOGEED');
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
