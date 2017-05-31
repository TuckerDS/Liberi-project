import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from './event.model';
import { EventService } from '../services/event.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
@Injectable()
export class EventComponent implements OnInit {
  eventsCategory: string;
  events: Array<any> = [];
  baseUrl: string;
  loggedUser: any;

  constructor(@Inject('BASE_ENDPOINT') private BASE: string,
              private evs: EventService,
              private route: ActivatedRoute,
              private router: Router,
              private sessionService: SessionService) { }

  ngOnInit() {

    this.loggedUser = this.sessionService.loggedUser;

    this.baseUrl = this.BASE + "/uploads/";
    this.route.params.subscribe( params => { this.eventsCategory = String(params['category']) } )
    this.evs.getEventsByCategory(this.eventsCategory).subscribe( eventsArray => {
      this.events = eventsArray})
  }

  editEvent(e) {
    this.router.navigate(['/event/'+e+'/edit']);
    //alert(e);
  }

}
