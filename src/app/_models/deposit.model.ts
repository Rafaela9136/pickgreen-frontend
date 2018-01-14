export class Deposit {
  _id: number;
  _collector: number;
  _place: number;
  _user: number;
  _materialId: number;
  weight: number;
  status: string;
  code: number;
  created: string;

  constructor(status: string, place: number) {
    this.status = status;
    this._place = place;
  }
}
