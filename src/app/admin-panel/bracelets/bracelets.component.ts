import { Component, OnInit } from '@angular/core';

import { NewBraceletComponent } from './new-bracelet/new-bracelet.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Bracelet } from '../../_models/bracelet.model';
import { CrudService } from '../../_services/crud.service';
import { User } from 'app/_models/user.model';

@Component({
  selector: 'app-bracelets',
  templateUrl: './bracelets.component.html',
  styleUrls: ['./bracelets.component.css']
})
export class BraceletsComponent implements OnInit {

  bracelets: Bracelet[] = [];
  users: User[] = [];
  route = 'braceletApi/';
  loading = false;

  constructor(private dialogService: DialogService, private crudService: CrudService) { }

  createBracelet() {
    let bracelet: Bracelet;
    this.loading = true;
    this.crudService.create(this.route, bracelet).subscribe(response => {
      bracelet = new Bracelet(false, null, response);
      this.bracelets.push(bracelet);
      window.alert('Pulseira criada!');
      this.loading = false;
    }, error => {
      window.alert(error);
      this.loading = false;
    });
  }

  updateBracelet(bracelet: Bracelet) {
    this.dialogService.addDialog(NewBraceletComponent, {
      title: 'Editar pulseira',
      bracelet: bracelet,
      users: []
    }).subscribe((braceletFromModal) => {
      if (typeof braceletFromModal !== 'undefined') {
        const index = this.bracelets.indexOf(bracelet);
        this.loading = true;
        braceletFromModal.user_id = braceletFromModal._user;
        this.crudService.update(this.route + bracelet.code, braceletFromModal, 'bracelet').subscribe(response => {
          this.bracelets[index] = braceletFromModal;
          this.loading = false;
        }, error => {
          window.alert(error);
          this.loading = false;
        });
      }
    });
  }

  deleteBracelet(bracelet: Bracelet) {
    const index: number = this.bracelets.indexOf(bracelet);

    if (index !== -1) {
      if (window.confirm('Você tem certeza?')) {
         this.loading = true;
         this.crudService.deleteById(this.route + bracelet.code).subscribe(response => {
           this.bracelets.splice(index, 1);
           this.loading = false;
         }, error => {
           window.alert(error);
           this.loading = false;
         });
       }
    }
  }

  loadBracelets() {
    this.crudService.getAll(this.route).subscribe(bracelets => {
      this.bracelets = bracelets;
    }, error => {
      window.alert(error);
    });
  }

  loadUsers() {
    this.crudService.getAll('userApi/').subscribe(users => { this.users = users });
  }

  findUser(id) {
    id = Number(id);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        return this.users[i].name;
      }
    }
  }



  expired(dataAtivacao: string) {
    if (dataAtivacao) {
      const dataAtv = new Date(dataAtivacao.slice(0, 10));
      const atual = new Date();
      const diff = Math.ceil(Math.abs((dataAtv.getTime() - atual.getTime()) / 86400000) + 0.1);

      if (diff < 31) {
        return 'Não';
      } else {
        return 'Sim';
      }
    } else {
      return 'Não'
    }
  }
 
  ngOnInit() {
    this.loadBracelets();
    this.loadUsers();
  }

}
