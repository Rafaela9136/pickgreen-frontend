import { Component, OnInit } from '@angular/core';

import { NewBraceletComponent } from './new-bracelet/new-bracelet.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Bracelet } from '../../_models/bracelet.model';
import { CrudService } from '../../_services/crud.service';

@Component({
  selector: 'app-bracelets',
  templateUrl: './bracelets.component.html',
  styleUrls: ['./bracelets.component.css']
})
export class BraceletsComponent implements OnInit {

  bracelets: Bracelet[] = [];
  route = 'braceletApi/';
  loading = false;

  constructor(private dialogService: DialogService, private crudService: CrudService) { }

  createBracelet() {
    const bracelet: Bracelet = new Bracelet(false, null);
    this.loading = true;
    this.crudService.create(this.route, bracelet).subscribe(response => {
      this.bracelets.push(bracelet);
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
      this.bracelets = bracelets
    }, error => {
      window.alert(error);
    });
  }

  ngOnInit() {
    this.loadBracelets();
  }

}
