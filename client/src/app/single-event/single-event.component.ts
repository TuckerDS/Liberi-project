import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../event/event.model';
import { EventService } from '../services/event.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.css']
})
@Injectable()
export class SingleEventComponent implements OnInit {
  eventId: string;
  singleEvent: any;
  loggedUser: any;
  eventuser: any;

  constructor(@Inject('BASE_ENDPOINT') private BASE: string, private sessionService: SessionService, private ev: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.session.isLoggedIn()
    //    .subscribe(
    //      (session) => this.successCb(session),
    //      (err) => this.errorCb(err)
    //    );

    this.loggedUser = this.sessionService.loggedUser;

    this.sessionService.getLogginEmitter().subscribe(
      user => {
        this.loggedUser = user;
        console.log("USUARIO LOGADO EMMITER");
        console.log(this.loggedUser);
      });

    this.route.params.subscribe( params => { this.eventId = String(params['id']) } )
    this.ev.getEventDetails(this.eventId).subscribe( event => {
      event.picture = this.BASE + "/uploads/" + event.picture;
      this.singleEvent = event})
  }

  deleteEvent() {
    if (window.confirm('Are you sure?')) {
      this.ev.removeEvent(this.eventId)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }

  successCb(session) {
    // this.router.navigate(['/']);
  }

  errorCb(err) {
    this.sessionService.logout();
    this.router.navigate(['/login']);
     // this.error = err;
     // this.user = null;
   }

   logged(user) {
     console.log(user);
     this.loggedUser = user;
     console.log('LOOOOOOGEED');
   };

}
