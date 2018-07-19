import { Component, OnInit } from '@angular/core';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Collector } from '../../../_models/collector.model';

export interface NewCollectorModel {
  title: string;
  collector: Collector;
}

@Component({
  selector: 'app-new-collector',
  templateUrl: './new-collector.component.html',
  styleUrls: ['./new-collector.component.css']
})
export class NewCollectorComponent extends DialogComponent<NewCollectorModel, Collector> implements OnInit {

  title: string;
  collector: Collector;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  onSubmit(form) {
    this.result = new Collector(form.value.nome, form.value.cnpj, form.value.telefone, form.value.pin, form.value.rua,
      form.value.complemento, form.value.numero, form.value.bairro, form.value.cidade, form.value.estado, form.value.cep);
    this.close();
  }

  ngOnInit() {
  }

}
