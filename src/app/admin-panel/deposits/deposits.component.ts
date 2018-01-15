import { Component, OnInit } from '@angular/core';

import { Deposit } from '../../_models/deposit.model';
import { CrudService } from '../../_services/crud.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { NewDepositComponent } from './new-deposit/new-deposit.component';
import { DateService } from '../../_services/date.service';
import { User } from '../../_models/user.model';
import { DepositPlace } from '../../_models/deposit-place.model';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {

  loading = false;

  deposits: Deposit[] = [];
  users: User[] = [];
  places: DepositPlace[] = [];
  route = 'depositApi/';

  constructor(private dialogService: DialogService, private crudService: CrudService, private dateService: DateService) { }

  loadDeposits() {
    this.crudService.getAll(this.route).subscribe(users => {
      this.deposits = users;
    }, error => {
      window.alert(error);
    });
  }

  loadUsers() {
    this.crudService.getAll('userApi/').subscribe(users => {
      this.users = users;
    }, error => {
      window.alert(error);
    });
  }

  loadPlaces () {
    this.crudService.getAll('placeApi/').subscribe(places => {
      this.places = places;
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
        depositFromModal._place = Number(depositFromModal._place);
        depositFromModal._user = Number(depositFromModal._user);
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

  findUser(id) {
    id = Number(id);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        return this.users[i].name;
      }
    }
  }

  findPlace(code) {
    for (let i = 0; i < this.places.length; i++) {
      if (this.places[i].code === code) {
        return this.places[i].name;
      }
    }
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

  formatDate(date) {
    return this.dateService.toString(date);
  }

  ngOnInit() {
    this.loadDeposits();
    this.loadUsers();
    this.loadPlaces();
  }

}
