export class Bracelet {
  _id: number;
  code: number;
  status: boolean;
  dataAtivacao: Date;
  _user: number;
  user_id: number;

  constructor(status: boolean, userId: number, code?: number) {
    this.status = status;
    this._user = userId;
    if (code) {
      this.code = code;
    }
  }

}
