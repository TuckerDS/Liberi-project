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
    this.loggedUser = this.sessionService.loggedUser;

    this.sessionService.getLogginEmitter().subscribe(
      user => {
        if (user) {
          this.loggedUser = user;
        } else {
          this.router.navigate(['/login']);
        }
      });

    this.route.params.subscribe( params => { this.eventId = String(params['id']) } )
    this.ev.getEventDetails(this.eventId).subscribe( event => {
      event.picture = this.BASE + "/uploads/" + event.picture;
      this.singleEvent = event})
  }

  successCb(session) {
    // this.router.navigate(['/']);
  }

  errorCb(err) {
    this.sessionService.logout();
    this.router.navigate(['/login']);
   }

   logged(user) {
     this.loggedUser = user;
   };
}
