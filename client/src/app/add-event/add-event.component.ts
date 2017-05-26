import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { Event } from '../event/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `/event`
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

  feedback: string;

  constructor(private ev: EventService) { }

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
    this.ev.addEvent(this.newEvent)
      .subscribe( event => {
        this.newEvent = event;
      })
    // this.uploader.onBuildItemForm = (item, form) => {
    //   form.append('title', this.newEvent.title);
    //   form.append('description', this.newEvent.description);
    //   form.append('category', this.newEvent.category);
    //   form.append('localization', this.newEvent.localization);
    //   form.append('permanent', this.newEvent.permanent);
    //   form.append('startDate', this.newEvent.startDate);
    //   form.append('endDate', this.newEvent.endDate);
    // };
    // console.log()
    // this.uploader.uploadAll();
  }


  // submitForm(myForm) {
  //   console.log(myForm);
  // }
}
