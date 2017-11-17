import { Component, OnInit } from '@angular/core';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DepositPlace } from '../../../_models/deposit-place.model';

export interface NewDepositModel {
  title: string;
  place: DepositPlace;
}

@Component({
  selector: 'app-new-deposit-place',
  templateUrl: './new-deposit-place.component.html',
  styleUrls: ['./new-deposit-place.component.css']
})
export class NewDepositPlaceComponent extends DialogComponent<NewDepositModel, DepositPlace> implements OnInit {

  title: string;
  place: DepositPlace;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  onSubmit(form) {
    this.result = new DepositPlace(form.value.nome, form.value.telefone, form.value.rua, form.value.complemento, form.value.numero,
       form.value.bairro, form.value.cidade, form.value.estado, form.value.cep);
    this.close();
  }

  ngOnInit() {
  }

}
