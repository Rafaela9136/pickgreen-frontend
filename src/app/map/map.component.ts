import { Component, OnInit } from '@angular/core';
import { DepositPlace } from '../_models/deposit-place.model';
import { CrudService } from '../_services/crud.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  y = -7.216521;
  x = -35.909413;

  places: DepositPlace[] = [];

  coords = [
    { lat: -7.218492, lon: -35.910362 },
    { lat: -7.218922, lon: -35.902269 },
    { lat: -7.218734, lon: -35.905996 }
  ];

  constructor(private crudService: CrudService) { }

  loadPlaces() {
    this.crudService.getAll('placeApi/').subscribe(places => {
      this.places = places;
    }, error => {
      window.alert(error);
    });
  }

  toNumber(string) {
    return parseFloat(string);
  }

  ngOnInit() {
    this.loadPlaces();
  }

}
