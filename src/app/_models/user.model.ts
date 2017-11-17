export class User {
  public _id: number;
  public name: string;
  public email: string;
  public birth: string;
  public password: string;
  public sex: string;
  public points: string;
  public phone: string;
  public street: string;
  public zipcode: string;
  public number: number;
  public complement: string;
  public neighborhood: string;
  public city: string;
  public state: string;

  constructor(name: string, email: string, password: string, birth: string, sex: string, points: string, phone: string, street: string,
              complement: string, number: number, neighborhood: string, city: string, state: string, zipcode: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.birth = birth;
    this.sex = sex;
    this.points = points;
    this.phone = phone;
    this.street = street;
    this.complement = complement;
    this.number = number;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
  };
}
