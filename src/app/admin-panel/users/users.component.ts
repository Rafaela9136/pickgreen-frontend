import { Component, OnInit } from '@angular/core';

import { NewUserComponent } from './new-user/new-user.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { User } from '../../_models/user.model';
import { CrudService } from '../../_services/crud.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  alertMessage = undefined;
  loading = false;
  route = 'userApi/';


  constructor(private dialogService: DialogService, private crudService: CrudService) { }

  createUser() {
    this.dialogService.addDialog(NewUserComponent, {
      title: 'Novo usuário',
      message: 'Confirm message',
      user: new User(null, null, null, null, null, null, null, null, null, null, null, null, null, null)
    }).subscribe((userFromModal) => {
      if (typeof userFromModal !== 'undefined') {
        this.loading = true;
        this.crudService.create(this.route + 'register', userFromModal).subscribe(response => {
          this.users.push(userFromModal);
          this.loading = false;
        }, error => {
          window.alert(error);
          this.loading = false;
        });
      }
    });
  }

  updateUser(user: User) {
    this.dialogService.addDialog(NewUserComponent, {
      title: 'Detalhes do usuário',
      user: user
    }).subscribe((userFromModal) => {
      if (typeof userFromModal !== 'undefined') {
        const index = this.users.indexOf(user);
        this.loading = true;
        this.crudService.update(this.route + 'update/' + user._id, userFromModal, 'user').subscribe(response => {
          this.users[index] = userFromModal;
          this.loading = false;
        }, error => {
          this.loading = false;
        });
      }
    });
  }

  deleteUser(user: User) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      if (window.confirm('Você tem certeza?')) {
         this.loading = true;
         this.crudService.deleteById(this.route + user._id).subscribe(response => {
          this.users.splice(index, 1);
           this.loading = false;
         }, error => {
           window.alert(error);
           this.loading = false;
         });
       }
    }
  }

  loadUsers() {
    this.crudService.getAll(this.route).subscribe(users => {
      this.users = users;
    }, error => {
      window.alert(error);
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

}
