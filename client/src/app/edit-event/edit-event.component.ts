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

  uploader: FileUploader = new FileUploader({
    url: `/event`
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
    this.ev.editEvent(this.currentEvent)
      .subscribe( event => {
        this.currentEvent = event;
        this.router.navigate(['event/'+this.eventId]);
      })
    }

}
