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
       form.value.bairro, form.value.cidade, form.value.estado, form.value.cep, this.place._material);
    this.close();
  }

  addMaterial(n) {
    if (this.place._material != null) {
      this.place._material.push(n);
    } else {
      this.place._material = [n];
    }
  }

  removeMaterial(n) {
    const i = this.place._material.indexOf(n);
    if (i > -1) {
      this.place._material.splice(i, 1);
    }
  }

  formatMaterial(material) {
    switch (material) {
      case 1: return 'Papel';
      case 2: return 'Vidro';
      case 3: return 'Metal';
      case 4: return 'Plástico';
      case 8: return 'Tecido';
    }
  }

  ngOnInit() {
  }

}
