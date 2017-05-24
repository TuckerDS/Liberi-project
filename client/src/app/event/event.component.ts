import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Array<any> = [];

  constructor(private evs: EventService) { }

  ngOnInit() {
    this.evs.getEvents().subscribe(eventsArray => this.events = eventsArray);
  }

}
