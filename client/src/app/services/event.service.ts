import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Event } from '../event/event.model';

@Injectable()
export class EventService {
  EVENT_ROUTE = '/event';
  ENDPOINT: string;
  events: Array<any> = [];
  options: { withCredentials: true};

  constructor(
    @Inject('BASE_ENDPOINT') private BASE: string,
    @Inject('API_ENDPOINT') private API: string,
    private http: Http) {
      this.ENDPOINT = BASE + API;
    }

    // Get all events
    // getEvents(): Observable<any[]> {
    //   return this.http.get(`${this.ENDPOINT}${this.EVENT_ROUTE}/`, this.options)
    //     .map((res) => res.json())
    //     .map((events) => {
    //       this.events = events.map(e => new Event(e));
    //       return this.events;
    //     })
    //     .catch((err) => Observable.throw(err));
    // }

    // Get all events with a category
    getEventsByCategory(category: string): Observable<any[]> {
      return this.http.get(`${this.ENDPOINT}${this.EVENT_ROUTE}/${category}`)
        .map((res) => res.json())
        .map((events) => {
          this.events = events.map(e => new Event(e));
          return this.events;
        })
        .catch((err) => Observable.throw(err));
    }

    getEventDetails(id: string) {
      return this.http.get(`${this.ENDPOINT}${this.EVENT_ROUTE}/single/${id}`, this.options)
        .map(res => res.json());
    }

    editEvent(event) {
      return this.http.put(`${this.ENDPOINT}${this.EVENT_ROUTE}/${event.id}`, event, this.options)
        .map((res) => res.json());
    }

    addEvent(event) {
      return this.http.post(`${this.ENDPOINT}${this.EVENT_ROUTE}/`, event, this.options)
        .map((res) => res.json());
    }

    removeEvent(id: string) {
      return this.http.delete(`${this.ENDPOINT}${this.EVENT_ROUTE}/${id}`, this.options)
        .map((res) => res.json());
    }
}
