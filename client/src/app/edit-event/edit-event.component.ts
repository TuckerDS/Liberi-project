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

  submitEdition() {
    this.currentEvent.startDate = new Date(this.currentEvent.startDate)
    this.currentEvent.endDate = new Date(this.currentEvent.endDate)
    if(this.starDate){
      const h = this.currentEvent.startDate.getHours();
      const m = this.currentEvent.startDate.getMinutes();
      const start: Date = new Date();
      start.setTime(Date.parse(this.starDate + " " + h + ":" + m));
      this.currentEvent.starDate = start;
    }

    console.log(this.starDate)
    console.log(this.startHour)
    console.log(this.enDate)
    console.log(this.endHour.split(':'))

    // const start: Date = new Date();
    // const end: Date = new Date();
    // start.setTime(Date.parse(this.newEvent.startDate + " " + this.startHour));
    // end.setTime(Date.parse(this.newEvent.endDate + " " + this.endHour));


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
  //       form.append('localization', this.currentEvent.localization);
  //       form.append('permanent', this.currentEvent.permanent);
  //       form.append('startDate', this.currentEvent.startDate);
  //       form.append('endDate', this.currentEvent.endDate);
  //     };
  //     this.uploader.uploadAll();
  //     this.router.navigate(['event/'+this.eventId]);
  //   }
  }
}
