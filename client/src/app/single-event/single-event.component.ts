import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../event/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.css']
})
export class SingleEventComponent implements OnInit {
  eventId: string;
  singleEvent: any;

  constructor(private ev: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe( params => { this.eventId = String(params['id']) } )
    this.ev.getEventDetails(this.eventId).subscribe( event => {
      this.singleEvent = event})
  }

  deleteEvent() {
    if(window.confirm("Are you sure?")) {
      this.ev.removeEvent(this.eventId)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }

}
