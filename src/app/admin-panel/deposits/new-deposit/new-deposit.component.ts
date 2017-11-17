import { Component, OnInit } from '@angular/core';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Deposit } from '../../../_models/deposit.model';

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

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  onSubmit() {};

  ngOnInit() {
  }

}
