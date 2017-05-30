import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { Event } from '../event/event.model';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
@Injectable()
export class AddEventComponent implements OnInit {
  EVENT_ROUTE = '/event';
  ENDPOINT: string;
  uploader: FileUploader;


  newEvent = {
    user_id: '',
    title: '',
    description: '',
    category: '',
    localization: '',
    permanent: false,
    startDate: '',
    endDate: '',
    picture: ''
  };
  startHour = '';
  endHour = '';

  feedback: string;

  user_id: any;
  loggedUser: any;

  constructor(
    @Inject('BASE_ENDPOINT') private BASE: string,
    @Inject('API_ENDPOINT') private API: string,
    private ev: EventService,
    private router: Router) {
      this.ENDPOINT = BASE + API;
      this.uploader = new FileUploader({
        url: this.ENDPOINT+this.EVENT_ROUTE
      });
    }

  ngOnInit() {

    this.loggedUser = this.sessionService.loggedUser;
    this.newEvent.user_id =  this.sessionService.loggedUser._id;

    this.sessionService.getLogginEmitter().subscribe(
      user => {
        this.loggedUser = user;
        this.newEvent.user_id = user._id;
      });

    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      console.log(response);
      this.feedback = JSON.parse(response).message;
    };
  }

  submitForm(myForm) {
    console.log(this.uploader.queue)
    const start: Date = new Date();
    const end: Date = new Date();
    start.setTime(Date.parse(this.newEvent.startDate + " " + this.startHour));
    end.setTime(Date.parse(this.newEvent.endDate + " " + this.endHour));

    if(this.uploader.queue.length === 0){
      this.ev.addEvent(this.newEvent)
        .subscribe( event => {
          this.newEvent = event;
          this.router.navigate(['']);
        })
    } else {
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('user_id', this.loggedUser._id);
        form.append('title', this.newEvent.title);
        form.append('description', this.newEvent.description);
        form.append('category', this.newEvent.category);
        form.append('localization', this.newEvent.localization);
        form.append('permanent', this.newEvent.permanent);
        form.append('startDate', start);
        form.append('endDate', end);
      };
      this.uploader.uploadAll();
      this.router.navigate(['']);
    }
  }
}
