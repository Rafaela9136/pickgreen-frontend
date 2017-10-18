import { EventEmitter, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

export class FinalUser {
  pin: string;
  typeOfUser: string;
  constructor() {};
}

@Injectable()
export class LoginService {

  ApiUrl = 'https://pick-green-api.herokuapp.com/';
  admLogged = false;
  collectorLogged = false;
  showAdmMenu = false;
  showCollectorMenu = false;

  showMenuEmitter = new EventEmitter<boolean>();
  showAdmMenuEmitter = new EventEmitter<boolean>();
  showCollectorMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, private http: Http ) { }

  login(user: FinalUser) {
    const pin = {pin: user.pin};
    let url = '';
    if (user.typeOfUser === 'adm') {
      url = this.ApiUrl + 'admApi/auth/';
    } else {
      url = this.ApiUrl + 'collectorApi/auth/';
    }

    return this.http.post(url, pin);
  }

  createAdmSession(credential) {
    window.sessionStorage.setItem('userAdm', credential._body);
    this.admLogged = true;
    this.showAdmMenu = true;
    this.showMenuEmitter.emit(true);
    this.showAdmMenuEmitter.emit(true);
    this.router.navigate(['/painel']);
  }

  createCollectorSession(credential) {
    window.sessionStorage.setItem('userCollector', credential._body);
    this.collectorLogged = true;
    this.showCollectorMenu = true;
    this.showMenuEmitter.emit(true);
    this.showCollectorMenuEmitter.emit(true);
    this.router.navigate(['/mapa']);
  }

  logout() {
    if (!window.sessionStorage.getItem('userAdm') === null) {
      window.sessionStorage.removeItem('userAdm');
      this.admLogged = false;
      this.showAdmMenu = false;
    }

    if (!window.sessionStorage.getItem('userCollector') === null) {
      window.sessionStorage.removeItem('userCollector');
      this.collectorLogged = false;
      this.showCollectorMenu = false;
    }
    this.showMenuEmitter.emit(false);
    this.showCollectorMenuEmitter.emit(false);
    this.showAdmMenuEmitter.emit(false);
  }

  isAdmLogged() {
    return this.admLogged;
  }

  isCollectorLogged() {
    return this.collectorLogged;
  }

}
