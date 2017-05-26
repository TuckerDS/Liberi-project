import { Routes } from '@angular/router';

import { EventComponent } from './event/event.component';
import { SingleEventComponent } from './single-event/single-event.component';

// USER Routes
import { UserSignupComponent } from './signup/signup.component';
import { UserLoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'event', component: EventComponent },
    { path: 'event/:id', component: SingleEventComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'login', component: UserLoginComponent }
];
