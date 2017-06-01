import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  events: Array<any> = [];

  categories: Array<any> = [
    'Musica',
    'Poesia',
    'Cine',
    'Teatro',
    'Museos',
    'Deporte',
    'Idiomas',
    'Naturaleza',
    'Gastronomia'
  ];

  constructor(private evs: EventService, private router: Router) { }

  ngOnInit() {
    this.evs.getEvents().subscribe( eventsArray => {
      this.events = eventsArray;
      this.events.map(e => {
        let currentDate = new Date();
        let eventEndDate = new Date(e.endDate)
        if(eventEndDate < currentDate){
          this.deleteEvent(e._id)
        }
      })
    })
  }

  goToEvents(category) {
    this.router.navigate(['/events/'+category]);
  }

  deleteEvent(evId) {
    this.evs.removeEvent(evId)
      .subscribe(() => {
        console.log("Borrado");
      });
  }
}
