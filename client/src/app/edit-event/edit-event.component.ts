import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from "ng2-file-upload";
import { Event } from '../event/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})

export class EditEventComponent implements OnInit {
  EVENT_ROUTE = '/event';
  ENDPOINT: string;
  eventId: string;
  currentEvent: any;
  startHour = '';
  endHour = '';
  starDate = '';
  enDate = '';

  uploader: FileUploader;

  feedback: string;

  constructor(
    @Inject('BASE_ENDPOINT') private BASE: string,
    @Inject('API_ENDPOINT') private API: string,
    private ev: EventService,
    private route: ActivatedRoute,
    private router: Router) {
      this.ENDPOINT = BASE + API;
      this.uploader = new FileUploader({
        url: this.ENDPOINT+this.EVENT_ROUTE
      });
    }

  ngOnInit() {
    this.route.params.subscribe( params => { this.eventId = String(params['id']) } )
    this.ev.getEventDetails(this.eventId).subscribe( event => {
      this.currentEvent = event;

    })


    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  deleteEvent(evId) {
    if (window.confirm('Are you sure?')) {
      this.ev.removeEvent(evId)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }

  submitEdition() {
    this.currentEvent.startDate = new Date(this.currentEvent.startDate)
    this.currentEvent.endDate = new Date(this.currentEvent.endDate)

    if(this.starDate){
      const h = this.currentEvent.startDate.getHours();
      const m = this.currentEvent.startDate.getMinutes();
      const start: Date = new Date();
      start.setTime(Date.parse(this.starDate + " " + h + ":" + m));
      this.currentEvent.startDate = start;
    }

    if(this.startHour){
      const h1 = this.startHour.split(':');
      this.currentEvent.startDate.setHours(h1[0]);
      this.currentEvent.startDate.setMinutes(h1[1]);
    }

    if(this.enDate){
      const h = this.currentEvent.endDate.getHours();
      const m = this.currentEvent.endDate.getMinutes();
      const end: Date = new Date();
      end.setTime(Date.parse(this.enDate + " " + h + ":" + m));
      this.currentEvent.endDate = end;
    }

    if(this.endHour){
      const h2 = this.endHour.split(':');
      this.currentEvent.endDate.setHours(h2[0]);
      this.currentEvent.endDate.setMinutes(h2[1]);
    }

      this.ev.editEvent(this.currentEvent)
        .subscribe( event => {
          this.currentEvent = event;
          this.router.navigate(['event/'+this.eventId]);
        })

  //   else {
  //     this.uploader.onBuildItemForm = (item, form) => {
  //       form.append('title', this.currentEvent.title);
  //       form.append('description', this.currentEvent.description);
  //       form.append('category', this.currentEvent.category);
  //       form.append('location', this.currentEvent.location);
  //       form.append('permanent', this.currentEvent.permanent);
  //       form.append('startDate', this.currentEvent.startDate);
  //       form.append('endDate', this.currentEvent.endDate);
  //     };
  //     this.uploader.uploadAll();
  //     this.router.navigate(['event/'+this.eventId]);
  //   }
  }
}
