import { Routes } from '@angular/router';

import { EventComponent } from './event/event.component';
import { SingleEventComponent } from './single-event/single-event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';

export const routes: Routes = [
  { path: '', component: CategoriesPageComponent },
  { path: 'event', component: EventComponent },
  { path: 'add', component: AddEventComponent },
  { path: 'event/:id', component: SingleEventComponent },
  { path: '**', component: CategoriesPageComponent }
];
