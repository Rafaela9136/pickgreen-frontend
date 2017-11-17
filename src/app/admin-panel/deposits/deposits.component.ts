import { Component, OnInit } from '@angular/core';

import { Deposit } from '../../_models/deposit.model';
import { CrudService } from '../../_services/crud.service';
import { DialogService } from 'ng2-bootstrap-modal';
import {NewDepositComponent} from "./new-deposit/new-deposit.component";
import {error} from "selenium-webdriver";

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {

  loading = false;

  deposits: Deposit[] = [];
  route = 'depositApi/';

  constructor(private dialogService: DialogService, private crudService: CrudService) { }

  loadDeposits() {
    this.crudService.getAll(this.route).subscribe(users => {
      this.deposits = users;
    }, error => {
      window.alert(error);
    });
  }

  updateDeposit(deposit: Deposit) {
    this.dialogService.addDialog(NewDepositComponent, {
      title: 'Editar depósito',
      deposit: deposit
    }).subscribe(depositFromModal => {
      if (typeof depositFromModal !== 'undefined') {
        const index = this.deposits.indexOf(deposit);
        this.loading = true;
        this.crudService.update(this.route + deposit.code, depositFromModal, 'deposit').subscribe(response => {
          this.deposits[index] = depositFromModal;
          this.loading = false;
        }, error => {
          window.alert(error);
          this.loading = false;
        });
      }
    });
  }

  deleteDeposit(deposit: Deposit) {
    const index = this.deposits.indexOf(deposit);
    if (index !== -1) {
      if (window.confirm('Você tem certeza?')) {
        this.loading = true;
        this.crudService.deleteById(this.route + deposit.code).subscribe(response => {
          this.deposits.splice(index, 1);
          this.loading = false;
        }, error => {
          window.alert(error);
          this.loading = false;
        });
      }
    }
  }

  ngOnInit() {
    this.loadDeposits();
  }

}
