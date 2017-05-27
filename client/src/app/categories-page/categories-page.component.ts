import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  // categories: Array<any> = [
  //   {name: 'Musica', image: ""},
  //   {name: 'Poesia', image: ""},
  //   {name: 'Cine', image: ""},
  //   {name: 'Teatro', image: ""},
  //   {name: 'Museos', image: ""},
  //   {name: 'Deporte', image: ""},
  //   {name: 'Idiomas', image: ""},
  //   {name: 'Naturaleza', image: ""},
  //   {name: 'Gastronomia', image: ""}
  // ];

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
