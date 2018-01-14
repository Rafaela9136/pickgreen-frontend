import * as moment from 'moment';

export class Event {
  _id: number;
  description: string;
  created: string;
  ended: string;
  _place: number;

  constructor(descricao: string, dataFim: string, dataInicio: string, place: number) {
    this.description = descricao;
    if (dataFim) {
      this.ended = (moment(dataFim, 'DD-MM-YYYY')).format('MM-DD-YYYY');
      this.created = (moment(dataInicio, 'DD-MM-YYYY')).format('MM-DD-YYYY');
    }
    this._place = place;
  }
}
