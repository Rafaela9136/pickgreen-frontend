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
  deposit: Deposit = new Deposit();
  deposits: Deposit[] = [];
  loading = false;
  depositExists = false;
  currentUser = JSON.parse((window.sessionStorage.getItem('userCollector')));

  constructor(private crudService: CrudService, private http: Http, private router: Router) { }

  onSubmit() {
    this.loading = true;
    for (let i = 0; i < this.deposits.length; i++) {
      if (this.deposits[i].code === this.code) {
        this.depositExists = true;
        this.deposit._collector = this.currentUser._id;
        this.http.post('https://pick-green-api.herokuapp.com/depositApi/confirm/' + this.code, this.deposit).subscribe(response => {
          this.loading = false;
          this.router.navigate(['/confirmar-deposito']);
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
    this.loadDeposits();
  }

}
