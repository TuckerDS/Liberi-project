import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgZone, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import {} from '@types/googlemaps';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapService } from '../services/map.service';
import { SessionService } from '../services/session.service';
import { EventService } from '../services/event.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable, Inject } from '@angular/core';

@Component({
  selector: 'app-map-events',
  templateUrl: './map-events.component.html',
  styleUrls: ['./map-events.component.css']
})
export class MapEventsComponent implements OnInit {

  baseUrl: string;

  // google maps zoom level
  zoom = 10;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  markers = [];

  events: Array<any> = [];

  // marker
  public latitude: number = 40.3919186;
  public longitude: number = -3.6990989;

  completeInfo: any;
  locationUser: any;

  constructor(private mapService: MapService,
              private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute, myElement: ElementRef,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private sessionService: SessionService,
              @Inject('BASE_ENDPOINT') private BASE: string
  ) { }

  ngOnInit() {
    this.baseUrl = this.BASE + "/uploads/";

    this.eventService.getEvents().subscribe( eventsArray => {
      this.events = eventsArray;
      this.events.map(e => {
        let currentDate = new Date();
        let endDate = new Date(e.endDate)
        let startDate = new Date(e.startDate)
        if(currentDate <= endDate && currentDate  >= startDate ) {
          this.markers.push({
            id: e._id,
            lat: e.latitude,
            lng: e.longitude,
            label: e.title,
            draggable: false,
            info: e.description,
            picture: this.baseUrl + e.picture,
            start: e.startDate,
            end: e.endDate
          });
        }
      })
    })


    // Get current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
           this.latitude = position.coords.latitude;
           this.longitude = position.coords.longitude;
           this.lat = position.coords.latitude;
           this.lng = position.coords.longitude;
      });
    }


    //  create search FormControl
    // this.searchControl = new FormControl();

    // load Places Autocomplete
    const instance = this;
    this.mapsAPILoader.load().then(() => {


      // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      //   types: ["address"]
      // });
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     // get the place result
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // this.setNewPosition({
          //   lat: place.geometry.location.lat(),
          //   lng: place.geometry.location.lng()
          // });
          // // set new position
          // this.getLocationData(place);
          //
          // instance.addLocation({
          //   lat: place.geometry.location.lat(),
          //   lng: place.geometry.location.lng()
          // });
          //
          // // verify result
          // if (place.geometry === undefined || place.geometry === null) {
          //   return;
          // }
          // // set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          this.zoom = 10;
//          this.city = place.address_components[2].long_name;
//          this.country = place.address_components[5].long_name;
//          this.adress = place.address_components[1].long_name + ', ' + place.address_components[0].long_name;
      //   });
      // });
    });
  }

  addLocation(location) {
    this.locationUser = location;
  }

  getLocationData(location) {
    this.completeInfo = location;
  }

  private setNewPosition(position) {
    this.latitude = position.lat;
    this.longitude = position.lon;
    this.zoom = 10;
  }

  clickedMarker(label: string, index: number, lat: number, lng: number) {
    //window.location.href = 'https://www.google.es/maps?q=' + lat + '+' + lng;
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event['coords'].lat,
    //   lng: $event['coords'].lng,
    //   label: 'Evento',
    //   draggable: false
    // });
  }

  markerDragEnd(m, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  goBack() {
      this.router.navigate(['/']);
  };

}
