import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { EventService } from './services/event.service';

import { RouterModule } from "@angular/router";
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { SingleEventComponent } from './single-event/single-event.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    SingleEventComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    EventService,
    { provide: 'BASE_ENDPOINT', useValue: environment.baseEndpoint },
    { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
