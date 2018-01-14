import { Component, OnInit } from '@angular/core';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Deposit } from '../../../_models/deposit.model';
import { DateService } from '../../../_services/date.service';
import { DepositPlace } from 'app/_models/deposit-place.model';
import { CrudService } from 'app/_services/crud.service';

export interface NewDepositModel {
  title: string;
  deposit: Deposit;
}

@Component({
  selector: 'app-new-deposit',
  templateUrl: './new-deposit.component.html',
  styleUrls: ['./new-deposit.component.css']
})
export class NewDepositComponent extends DialogComponent<NewDepositModel, Deposit> implements OnInit {

  title: string;
  deposit: Deposit;
  places: DepositPlace[] = [];

  constructor(dialogService: DialogService, private dateService: DateService,
              private crudService: CrudService) {
    super(dialogService);
  }

  onSubmit(form) {
    this.result = new Deposit(form.status, form.local);
    this.result.code =  this.deposit.code;
  };

  formatDate(date) {
    if (date != null) {
      return this.dateService.toString(date);
    }
  }

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.crudService.getAll('placeApi/').subscribe(places => { this.places = places });
  }

}
