import { Component, OnInit } from '@angular/core';

import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { Bracelet } from '../../../_models/bracelet.model';
import { User } from '../../../_models/user.model';
import { CrudService } from '../../../_services/crud.service';

export interface NewBraceletModel {
  title: string;
  bracelet: Bracelet;
  users: User[];
}

@Component({
  selector: 'app-new-bracelet',
  templateUrl: './new-bracelet.component.html',
  styleUrls: ['./new-bracelet.component.css']
})
export class NewBraceletComponent extends DialogComponent<NewBraceletModel, Bracelet> implements OnInit {

  title: string;
  bracelet: Bracelet;
  users: User[];

  constructor(dialogService: DialogService, private crudService: CrudService) {
    super(dialogService);
  }

  onSubmit(form) {
    this.result = new Bracelet(form.value.ativar, form.value.userId);
    this.close();
  }

  loadUsers() {
    this.crudService.getAll('userApi/').subscribe(users => { this.users = users });
  }

  ngOnInit() {
    this.loadUsers();
  }

}
