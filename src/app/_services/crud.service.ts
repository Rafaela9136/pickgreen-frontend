import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CrudService {

  apiUrl = 'https://pick-green-api.herokuapp.com/';

  constructor(private http: Http) { }

  getAll(route: string) {
    return this.http.get(this.apiUrl + route).map((response: Response) => response.json());
  }

  create(route: string, json: any) {
    return this.http.post(this.apiUrl + route, json).map((response: Response) => response.json());
  }

  update(route: string, json: any, typeOfCrud: string) {
    if (typeOfCrud === 'user') {
      return this.http.post(this.apiUrl + route, json).map((response: Response) => response.text());
    } else {
      return this.http.put(this.apiUrl + route, json).map((response: Response) => response.text());
    }
  }

  deleteById(route: string) {
    return this.http.delete(this.apiUrl + route).map((response: Response) => response.text());
  }

}
