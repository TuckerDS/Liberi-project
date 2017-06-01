import { Injectable, Inject } from '@angular/core';
// Importar objetos de la librería http
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

// Para emitir eventos de cambio de autorizacion
import {EventEmitter} from '@angular/core';

import { Cookie } from 'ng2-cookies/ng2-cookies';


@Injectable()
export class SessionService {
  USER_ROUTE = '/user';
  ENDPOINT: string;

  loggedUser: any;
  activeSession: any;
  serviceSessionID: any;

  // Creamos on objeto evento
  loginEvent: EventEmitter<any> = new EventEmitter();

  options: {withCredentials: true};

  constructor(
    @Inject('BASE_ENDPOINT') private BASE: string,
    @Inject('API_ENDPOINT') private API: string,
    private http: Http) {
      this.ENDPOINT = BASE + API;
    }

  // Escucha eventos
  getLogginEmitter(): EventEmitter<any> {
    return this.loginEvent;
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  editUser(user) {
    return this.http.put(`${this.ENDPOINT}${this.USER_ROUTE}/${user._id}`, user, this.options)
      .map((res) => res.json());
  }

  signup(user) {
    return this.http.post(`${this.ENDPOINT}${this.USER_ROUTE}/signup`, user, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  login({username, password}:any) {
    return this.http.post(`${this.ENDPOINT}${this.USER_ROUTE}/login`, {username, password}, this.options)
      .map(res => {
        this.loggedUser = res.json().user;
        this.activeSession = res.json().session;
        this.serviceSessionID = res.json().sID;
        this.setCookie();
        this.loginEvent.emit(this.loggedUser);
        return res.json();
      })
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${this.ENDPOINT}${this.USER_ROUTE}/logout`, {'sID': this.serviceSessionID})
      .map(res => {
        this.loggedUser = null;
        this.deleteCookie();
        this.loginEvent.emit(this.loggedUser);
        return res.json();
      })
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.post(`${this.ENDPOINT}${this.USER_ROUTE}/loggedin`, {'sID': this.serviceSessionID})
      .map(res => {
        this.loggedUser = res.json().user;
        res.json();
        this.loginEvent.emit(this.loggedUser);
        return;
      })
      .catch(this.handleError);
  }

  getPrivateData() {
    return this.http.get(`${this.ENDPOINT}${this.USER_ROUTE}/private`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  setCookie() {
    Cookie.set('liberi', this.serviceSessionID);
    // Cookie.set('cookieName', 'cookieValue');
    // Cookie.set('cookieName', 'cookieValue', 10 /*days from now*/);
    // Cookie.set('cookieName', 'cookieValue', 10, '/myapp/', 'mydomain.com');
  }

  getCookie() {
    const myCookie = Cookie.get('liberi');
    this.serviceSessionID = myCookie;
    this.isLoggedIn();
    // return myCookie;
  }

  deleteCookie() {
    Cookie.delete('liberi');
    this.loginEvent.emit(this.loggedUser);
  }

}
