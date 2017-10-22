export class DepositPlace {
  _id: number;
  _material: number[];
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  number: string;
  street: string;
  complement: string;
  phone: string;
  name: string;
  geolocalization: {
    lat: string,
    lng: string
  }

  constructor(name: string, phone: string, street: string, complement: string, number: string, neighborhood: string, city: string,
              state: string, zipcode: string) {
    this.name = name;
    this.phone = phone;
    this.street = street;
    this.complement = complement;
    this.number = number;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
  }
}
