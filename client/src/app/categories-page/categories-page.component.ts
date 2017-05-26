import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  categories: Array<String> = [
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

  constructor() { }

  ngOnInit() {
  }

}
