import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { FileUploadModule } from 'ng2-file-upload';

// Routes
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { SingleEventComponent } from './single-event/single-event.component';
import { HeaderComponent } from './header/header.component';
import { AddEventComponent } from './add-event/add-event.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { UserComponent } from './user/user.component';
import { UserSignupComponent } from './signup/signup.component';
import { UserLoginComponent } from './login/login.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditUserComponent } from './edit-user/edit-user.component';
// Maps
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapComponent } from './map/map.component';
import { MapEventsComponent } from './map-events/map-events.component';
// Servicios
import { EventService } from './services/event.service';
import { SessionService } from './services/session.service';
import { CategoriesService } from './services/categories.service';
import { MapService } from './services/map.service';



@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    SingleEventComponent,
    HeaderComponent,
    AddEventComponent,
    CategoriesPageComponent,
    UserComponent,
    UserSignupComponent,
    UserLoginComponent,
    EditEventComponent,
    MapComponent,
    MapEventsComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWclYtJVZNhJujjVs64dIc_mz7N_wUpz0', libraries: ['places']
    })
  ],
  providers: [
    MapService,
    SessionService,
    EventService,
    CategoriesService,
    { provide: 'BASE_ENDPOINT', useValue: environment.baseEndpoint },
    { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
