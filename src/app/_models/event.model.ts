export class Event {
  _id: number;
  description: string;
  created: string;
  ended: string;
  _place: number;

  constructor(descricao: string, dataFim: string) {
    this.description = descricao;
    this.ended = dataFim;
  }
}
