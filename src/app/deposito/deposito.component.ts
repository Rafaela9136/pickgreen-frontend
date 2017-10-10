import { Component, OnInit } from '@angular/core';
import { Deposit } from './deposit.model';
import { CrudService } from '../_services/crud.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  deposit: Deposit = new Deposit();
  deposits: Deposit[] = [];

  constructor(private crudService: CrudService, private http: Http, private router: Router) { }

  onSubmit() {
    for (let i = 0; i < this.deposits.length; i++) {
      if (this.deposits[i].id === this.deposit.id) {
        this.deposit.status = 'validado';
        this.http.put('http://pick-green-api.herokuapp.com/depositApi' + this.deposit._id, this.deposit).subscribe(response => {
          window.alert('Depósito confirmado!');
          this.router.navigate(['/confirmar-deposito']);
        }, error => {
          window.alert(error);
        });
      }
    }
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
