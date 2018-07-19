import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  toString(date: string) {
    const dateIn = date.slice(0, -1);
    const dateOut = new Date(date);
    dateOut.setUTCHours(12);

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
