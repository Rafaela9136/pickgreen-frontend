export class Collector {
  name: string;
  cnpj: string;
  phone: string;
  pin: string;
  street: string;
  complement: string
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  _id: number;

  constructor (nome: string, cnpj: string, phone: string, pin: string, street: string, complement: string, number: number,
               neighborhood: string, city: string, state: string, zipcode: string) {
    this.name = nome;
    this.cnpj = cnpj;
    this.phone = phone;
    this.pin = pin;
    this.street = street;
    this.complement = complement;
    this.number = number;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
  }
}
