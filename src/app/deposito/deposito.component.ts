import { Component, OnInit } from '@angular/core';
import { Deposit } from '../_models/deposit.model';
import { CrudService } from '../_services/crud.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})

export class DepositoComponent implements OnInit {

  code: number;
  deposit: Deposit = new Deposit(null, null);
  deposits: Deposit[] = [];
  loading = false;
  depositExists = false;
  totalDeposits = 0;
  currentUser = JSON.parse((window.sessionStorage.getItem('userCollector')));
  isPharmacy = false;

  constructor(private crudService: CrudService, private http: Http, private router: Router) { }

  onSubmit() {
    window.sessionStorage.setItem('totalDeposits', String(this.totalDeposits));
    this.loading = true;
    for (let i = 0; i < this.deposits.length; i++) {
      if (this.deposits[i].code === this.code) {
        this.depositExists = true;
        this.deposit._collector = this.currentUser._id;
        this.http.post('https://pick-green-api.herokuapp.com/depositApi/confirm/' + this.code, this.deposit).subscribe(response => {
          this.loading = false;
          if (this.totalDeposits > 0) {
            this.totalDeposits -= 1;
            window.sessionStorage.setItem('totalDeposits', String(this.totalDeposits));
          }
          this.router.navigate(['/confirmar-deposito']);
          this.code = 0;
          this.deposit.weight = 0;
          return window.alert('Depósito confirmado!');
        }, error => {
          this.loading = false;
          return window.alert(error);
        });
      }
    }
    if (!this.depositExists) {
      window.alert('Depósito inexistente');
    }

    this.loading = false;
  }

  onSubmitPharmacy() {
    this.loading = true;
    for (let i = 0; i < this.deposits.length; i++) {
      if (this.deposits[i].code === this.code) {
        this.depositExists = true;
        this.deposit.weight = 1;
        this.deposit._collector = this.currentUser._id;
        this.http.post('https://pick-green-api.herokuapp.com/depositApi/confirm/' + this.code, this.deposit).subscribe(response => {
          this.loading = false;
          this.router.navigate(['/confirmar-deposito']);
          this.code = 0;
          return window.alert('Depósito confirmado!');
        }, error => {
          this.loading = false;
          return window.alert(error);
        });
      }
    }
    if (!this.depositExists) {
      window.alert('Depósito inexistente');
    }

    this.loading = false;
  }

  loadDeposits() {
    this.crudService.getAll('depositApi/').subscribe(deposits => {
      this.deposits = deposits;
    }, error => {
      window.alert(error);
    });
  }

  ngOnInit() {

    const colectorName = this.currentUser.name.toLowerCase();

    if (colectorName.indexOf('farmácia') !== -1 || colectorName.indexOf('farmacia') !== -1 ||
    colectorName.indexOf('drogaria') !== -1 || colectorName.indexOf('empresa') !== -1) {
      this.isPharmacy = true;
    }

    if (window.sessionStorage.getItem('totalDeposits') === null) {
      this.totalDeposits = 0;
    } else {
      this.totalDeposits = Number(JSON.parse((window.sessionStorage.getItem('totalDeposits'))));
    }
    this.loadDeposits();
  }
}
