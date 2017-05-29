import { Component, OnInit } from '@angular/core';
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
  eventId: string;
  currentEvent: any;
  pictureEdited: any;

  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api/event'
  });

  feedback: string;

  constructor(private ev: EventService, private route: ActivatedRoute, private router: Router) {   }

  ngOnInit() {
    this.route.params.subscribe( params => { this.eventId = String(params['id']) } )
    this.ev.getEventDetails(this.eventId).subscribe( event => {
      this.currentEvent = event})

    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  submitEdition() {

    if(!this.pictureEdited){
      this.ev.editEvent(this.currentEvent)
        .subscribe( event => {
          this.currentEvent = event;
          this.router.navigate(['event/'+this.eventId]);
        })
      }
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
