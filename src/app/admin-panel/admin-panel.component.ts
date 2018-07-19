import { Component, OnInit } from '@angular/core';
import { FinalUser } from '../_services/login.service';
import { AlertModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  currentUser: FinalUser;

  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem('userAdm'));
  }

  ngOnInit() {
  }

}
