import { Component, OnInit } from '@angular/core';

import { NewCollectorComponent } from './new-collector/new-collector.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Collector } from '../../_models/collector.model';
import { CrudService } from '../../_services/crud.service';

@Component({
  selector: 'app-collectors',
  templateUrl: './collectors.component.html',
  styleUrls: ['./collectors.component.css']
})
export class CollectorsComponent implements OnInit {

  collectors: Collector[] = [];
  route = 'collectorApi/';
  loading = false;

  constructor(private dialogService: DialogService, private crudService: CrudService) { }

  createCollector() {
    this.dialogService.addDialog(NewCollectorComponent, {
      title: 'Novo coletor',
      collector: new Collector(null, null, null, null, null, null, null, null, null, null, null)
    }).subscribe((collectorFromModal) => {
      if (typeof collectorFromModal !== 'undefined') {
        this.loading = true;
        this.crudService.create(this.route, collectorFromModal).subscribe(response => {
          collectorFromModal.pin = response.pin;
          this.collectors.push(collectorFromModal);
          this.loading = false;
        }, error => {
          console.log(error._body);
          this.loading = false;
        });
      }
    });
  }

  updateCollector(collector: Collector) {
    this.dialogService.addDialog(NewCollectorComponent, {
      title: 'Editar coletor',
      collector: collector
    }).subscribe((collectorFromModal) => {
      if (typeof collectorFromModal !== 'undefined') {
        const index = this.collectors.indexOf(collector);
        this.loading = true;
        this.crudService.update(this.route + collector._id, collectorFromModal, 'collector').subscribe(response => {
          this.collectors[index] = collectorFromModal;
          this.loading = false;
        }, error => {
          window.alert(error);
          this.loading = false;
        });
      }
    });
  }

  deleteCollector(collector: Collector) {
    const index = this.collectors.indexOf(collector);

    if (index !== -1) {
       if (window.confirm('Você tem certeza?')) {
         this.loading = true;
         this.crudService.deleteById(this.route + collector.pin).subscribe(response => {
           this.collectors.splice(index, 1);
           this.loading = false;
         }, error => {
           console.log(error.statusText);
           this.loading = false;
         });
       }
    }
  }

  loadCollectors() {
    this.crudService.getAll(this.route).subscribe(collectors => {
      this.collectors = collectors
    }, error => {
      window.alert(error);
    });
  }

  ngOnInit() {
    this.loadCollectors();
  }

}
