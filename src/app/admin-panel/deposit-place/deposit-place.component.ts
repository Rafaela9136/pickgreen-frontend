import { Component, OnInit } from '@angular/core';

import { NewDepositPlaceComponent } from './new-deposit-place/new-deposit-place.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { DepositPlace } from '../../_models/deposit-place.model';
import { CrudService } from '../../_services/crud.service';

@Component({
  selector: 'app-deposit-place',
  templateUrl: './deposit-place.component.html',
  styleUrls: ['./deposit-place.component.css']
})
export class DepositPlaceComponent implements OnInit {

  depositPlaces: DepositPlace[] = [];
  route = 'placeApi/';
  loading = false;

  constructor(private dialogService: DialogService, private crudService: CrudService) { }

  createDepositPlace() {
    this.dialogService.addDialog(NewDepositPlaceComponent, {
      title: 'Novo local de depósito',
      place: new DepositPlace(null, null, null, null, null, null, null, null, null, null)
    }).subscribe((placeFromModal) => {
      if (typeof placeFromModal !== 'undefined') {
        this.loading = true;
        this.crudService.create(this.route, placeFromModal).subscribe(response => {
          this.depositPlaces.push(placeFromModal);
          this.loading = false;
        }, error => {
          window.alert(error);
          this.loading = false
        });
      }
    });
  }

  updateDepositPlace(place: DepositPlace) {
    this.dialogService.addDialog(NewDepositPlaceComponent, {
      title: 'Editar local de depósito',
      place: place
    }).subscribe((placeFromModal) => {
      if (typeof placeFromModal !== 'undefined') {
        const index = this.depositPlaces.indexOf(place);
        this.loading = true;
        this.crudService.update(this.route + place.code, placeFromModal, 'depositPlace').subscribe(response => {
          this.depositPlaces[index] = placeFromModal;
          this.loading = false;
        }, error => {
          window.alert(error);
          this.loading = false;
        });
      }
    });
  }

  deleteDepositPlace(place: DepositPlace) {
    const index = this.depositPlaces.indexOf(place);

    if (index !== -1) {
      if (window.confirm('Você tem certeza?')) {
         this.loading = true;
         this.crudService.deleteById(this.route + place.code).subscribe(response => {
           this.depositPlaces.splice(index, 1);
           this.loading = false;
         }, error => {
           window.alert(error);
           this.loading = false;
         });
       }
    }
  }

  loadDepositPlaces() {
    this.crudService.getAll(this.route).subscribe(depositPlaces => {
      this.depositPlaces = depositPlaces;
    }, error => {
      window.alert(error);
    });
  }

  ngOnInit() {
    this.loadDepositPlaces();
  }

}
