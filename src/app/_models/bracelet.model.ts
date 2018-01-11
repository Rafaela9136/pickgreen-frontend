export class Bracelet {
  _id: number;
  code: number;
  status: boolean;
  dataAtivacao: Date;
  user_id: number;

  constructor(status: boolean, userId: number, code?: number) {
    this.status = status;
    this.user_id = userId;
    if (code) {
      this.code = code;
    }
  }

}
