import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToEvents(category) {
    this.router.navigate(['/events/'+category]);
  }

}
