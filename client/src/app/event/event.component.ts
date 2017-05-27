import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from './event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventsCategory: string;
  events: Array<any> = [];

  constructor(private evs: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe( params => { this.eventsCategory = String(params['category']) } )
    this.evs.getEventsByCategory(this.eventsCategory).subscribe( eventsArray => {
      this.events = eventsArray})


    // this.evs.getEvents().subscribe(eventsArray => this.events = eventsArray);
  }

}
