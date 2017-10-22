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
  loading = false;
  depositExists = false;

  constructor(private crudService: CrudService, private http: Http, private router: Router) { }

  onSubmit(f) {
    this.loading = true;
    for (let i = 0; i < this.deposits.length; i++) {      
      if (this.deposits[i].code === this.deposit.code) {
        this.deposit._id = this.deposit[i]._id;
        window.alert(this.deposit.code);
        window.alert(this.deposit._id);
        this.depositExists = true;
        this.deposit.status = 'validado';
        this.http.put('https://pick-green-api.herokuapp.com/depositApi/' + this.deposit._id, this.deposit).subscribe(response => {
          this.loading = false;
          this.router.navigate(['/confirmar-deposito']);
          return window.alert('Depósito confirmado!');
        }, error => {
          this.loading = false;
          return window.alert(error);
        });
      }
    }
    if (!this.depositExists){
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
