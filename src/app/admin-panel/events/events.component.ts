import { Component, OnInit } from '@angular/core';

import { NewEventComponent } from './new-event/new-event.component';
import { DialogService } from 'ng2-bootstrap-modal'
import { Event } from '../../_models/event.model';
import { CrudService } from '../../_services/crud.service';
import { DateService } from '../../_services/date.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[] = [];
  eventsRoute = 'eventApi/';
  loading = false;

  constructor(private dialogService: DialogService, private crudService: CrudService, private dateService: DateService) {}

  createEvent() {
    this.dialogService.addDialog(NewEventComponent, {
      title: 'Novo evento',
      event: new Event(null, null, null, null),
      places: []
    }).subscribe((eventFromModal) => {
      if (typeof eventFromModal !== 'undefined') {
        this.loading = true;
        this.crudService.create(this.eventsRoute, eventFromModal).subscribe(response => {
          this.events.push(eventFromModal);
          this.loading = false;
        }, error => {
          window.alert(error);
          this.loading = false
        });
      }
    });
  }

  updateEvent(event: Event) {
    this.dialogService.addDialog(NewEventComponent, {
      title: 'Novo evento',
      event: event
    }).subscribe((eventFromModal) => {
      if (typeof eventFromModal !== 'undefined') {
        const index = this.events.indexOf(event);
        this.loading = true;
        this.crudService.update(this.eventsRoute + event._id, eventFromModal, 'event').subscribe(response => {
          this.events[index] = eventFromModal;
          this.loading = false;
        }, error => {
          window.alert(error);
          this.loading = false;
        });
      }
    });
  }

  deleteEvent(event: Event) {
    const index = this.events.indexOf(event);

    if (index !== -1) {
      if (window.confirm('Você tem certeza?')) {
         this.loading = true;
         this.crudService.deleteById(this.eventsRoute + event._id).subscribe(response => {
           this.events.splice(index, 1);
           this.loading = false;
         }, error => {
           window.alert(error);
           this.loading = false;
         });
       }
    }
  }

  loadEvents() {
    this.crudService.getAll(this.eventsRoute).subscribe(events => {
      this.events = events;
    }, error => {
      window.alert(error);
    });
  }

  formatDate(date) {
    return this.dateService.toString(date);
  }

  ngOnInit() {
    this.loadEvents();
  }

}
