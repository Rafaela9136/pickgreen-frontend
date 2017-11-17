import { Component, OnInit } from '@angular/core';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Event } from '../../../_models/event.model';
import { DepositPlace } from '../../../_models/deposit-place.model';
import { CrudService } from '../../../_services/crud.service';

export interface EventModel {
  title: string;
  event: Event;
  places: DepositPlace[]
}

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent extends DialogComponent<EventModel, Event> implements OnInit {

  title: string;
  event: Event;
  places: DepositPlace[] = [];

  constructor(dialogService: DialogService, private crudService: CrudService) {
    super(dialogService);
  }

  onSubmit(form) {
    this.result = new Event(form.value.descricao, form.value.dataFim);
    this.close();
  }

  loadPlaces() {
    this.crudService.getAll('placeApi/').subscribe(places => { this.places = places });
  }

  ngOnInit() {
    this.loadPlaces();
  }

}
