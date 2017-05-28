import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { Event } from '../event/event.model';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api/event'
  });

  newEvent = {
    title: '',
    description: '',
    category: '',
    localization: '',
    permanent: false,
    startDate: '',
    endDate: ''
  };
  startHour = "";
  endHour = "";

  feedback: string;

  constructor(private ev: EventService, private router: Router) { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      console.log(response)
      this.feedback = JSON.parse(response).message;
    };
  }

  submit() {
    let start: Date = new Date();
    let end: Date = new Date();
    start.setTime(Date.parse(this.newEvent.startDate + " " + this.startHour));
    end.setTime(Date.parse(this.newEvent.endDate + " " + this.endHour));

    // this.ev.addEvent(this.newEvent)
    //   .subscribe( event => {
    //     this.newEvent = event;
    //   })
    this.uploader.onBuildItemForm = (item, form) => {
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
