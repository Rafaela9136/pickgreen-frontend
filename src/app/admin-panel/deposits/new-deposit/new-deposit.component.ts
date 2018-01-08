import { Component, OnInit } from '@angular/core';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Deposit } from '../../../_models/deposit.model';
import { DateService } from '../../../_services/date.service';

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

  constructor(dialogService: DialogService, private dateService: DateService) {
    super(dialogService);
  }

  onSubmit(form) {
    this.result = new Deposit();
  };

  formatDate(date) {
    if (date != null) {
      return this.dateService.toString(date);
    }
  }

  ngOnInit() {
  }

}
