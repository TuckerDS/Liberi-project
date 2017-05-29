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

  constructor(@Inject('BASE_ENDPOINT') private BASE: string, private session: SessionService, private ev: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.session.isLoggedIn()
       .subscribe(
         (session) => this.successCb(session),
         (err) => this.errorCb(err)
       );


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
    this.session.logout();
    this.router.navigate(['/login']);
     // this.error = err;
     // this.user = null;
   }

}
