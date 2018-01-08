import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  toString(date: String) {
    const dateIn = date.slice(0, -1);
    const dateOut = new Date(dateIn);

    let day = '' + dateOut.getDate();
    let month = '' + (dateOut.getMonth() + 1);
    const year = dateOut.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    }

    if (month.length < 2) {
      month = '0' + month;
    }

    return [day, month, year].join('/');
  }

}
