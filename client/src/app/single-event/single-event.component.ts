import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event.model';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.css']
})
export class SingleEventComponent implements OnInit {
  eventId: string;
  singleEvent: any;

  constructor(private ev: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => { this.eventId = String(params['id']) } )
    console.log(this.eventId);
    this.ev.getEventDetails(this.eventId).subscribe( event => {
      this.singleEvent = event})
  }

}
