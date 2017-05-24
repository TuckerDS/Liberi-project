import { Routes } from '@angular/router';

import { EventComponent } from './event/event.component';
import { SingleEventComponent } from './single-event/single-event.component';

export const routes: Routes = [
    { path: 'event', component: EventComponent },
    { path: 'event/:id', component: SingleEventComponent }
];
