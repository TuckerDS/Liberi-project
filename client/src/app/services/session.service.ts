import { Injectable } from '@angular/core';
// Importar objetos de la librería http
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

// Para emitir eventos de cambio de autorizacion
import {EventEmitter} from '@angular/core';

// Importar objetos de la librería http
// import { Http, Response, RequestOptions, Headers } from '@angular/http';
// Importar la clase Observable desde la librería rxjs
// import { Observable }     from 'rxjs/Observable';


// Fuera
const BASEURL = 'http://localhost:3000/api/user';

@Injectable()
export class SessionService {

  loggedUser: any;

  // Creamos on objeto evento
  loginEvent: EventEmitter<any> = new EventEmitter();

  //BASEURL: 'http://localhost:3000/api/user';
  options: { withCredentials: true};


  constructor(private http: Http) { }

  // Escucha eventos
  getLogginEmitter(): EventEmitter<any> {
      return this.loginEvent;
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${BASEURL}/signup`, user, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`${BASEURL}/login`, user, this.options)
      .map(res => {
        this.loggedUser = res.json();
        this.loginEvent.emit(this.loggedUser);
        return res.json()
      })
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${BASEURL}/logout`, {}, this.options)
      .map(res => {
        this.loggedUser = null;
        this.loginEvent.emit(this.loggedUser);
        return res.json();
      })
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${BASEURL}/loggedin`, this.options)
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

  getPrivateData() {
    return this.http.get(`${BASEURL}/private`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
