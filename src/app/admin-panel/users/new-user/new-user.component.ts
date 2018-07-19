import { Component, OnInit } from '@angular/core';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { User } from '../../../_models/user.model';
import { DateService } from '../../../_services/date.service';

export interface ConfirmModel {
  title: string;
  message: string;
  user: User;
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent extends DialogComponent<ConfirmModel, User> implements OnInit {
  title: string;
  message: string;
  user: User;

  constructor(dialogService: DialogService, private dateService: DateService) {
    super(dialogService);
  }

  onSubmit(form) {
    this.result = new User(this.user._id, form.value.name, form.value.email, form.value.password, form.value.data,
      form.value.sexo, form.value.points, form.value.telefone, form.value.rua, form.value.complemento, form.value.numero, 
      form.value.bairro, form.value.cidade, form.value.estado, form.value.cep);
    this.close();
  }

  formatDate(date) {
    if (date != null) {
      return this.dateService.toString(date);
    }
  }

  ngOnInit() {
  }

}
