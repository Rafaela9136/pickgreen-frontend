import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { DepositoComponent } from './deposito/deposito.component';
import { routing } from './app.routing';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { CollectorsComponent } from './admin-panel/collectors/collectors.component';
import { EventsComponent } from './admin-panel/events/events.component';
import { DepositPlaceComponent } from './admin-panel/deposit-place/deposit-place.component';
import { BraceletsComponent } from './admin-panel/bracelets/bracelets.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NewUserComponent } from './admin-panel/users/new-user/new-user.component';
import { NewEventComponent } from './admin-panel/events/new-event/new-event.component';
import { NewDepositPlaceComponent } from './admin-panel/deposit-place/new-deposit-place/new-deposit-place.component';
import { NewCollectorComponent } from './admin-panel/collectors/new-collector/new-collector.component';
import { NewBraceletComponent } from './admin-panel/bracelets/new-bracelet/new-bracelet.component';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { LoginService } from './_services/login.service';
import { CrudService } from './_services/crud.service';
import { AdmAuthGuard } from './_guards/adm-auth.guard';
import { CollectorAuthGuard } from './_guards/collector-auth.guard';
import { DepositsComponent } from './admin-panel/deposits/deposits.component';
import { NewDepositComponent } from './admin-panel/deposits/new-deposit/new-deposit.component';
import { DateService } from './_services/date.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    DepositoComponent,
    AdminPanelComponent,
    UsersComponent,
    CollectorsComponent,
    EventsComponent,
    DepositPlaceComponent,
    BraceletsComponent,
    NewUserComponent,
    NewEventComponent,
    NewDepositPlaceComponent,
    NewCollectorComponent,
    NewBraceletComponent,
    DepositsComponent,
    NewDepositComponent,
  ],
  imports: [
    BootstrapModalModule,
    routing,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    DateValueAccessorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBb4zfxXZMu-1Mt-J8XdcsydsCyEkXcyX0'
    })
  ],
  entryComponents: [
    NewUserComponent,
    NewEventComponent,
    NewDepositPlaceComponent,
    NewCollectorComponent,
    NewBraceletComponent,
    NewDepositComponent
  ],
  providers: [LoginService, CrudService, AdmAuthGuard, CollectorAuthGuard, DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
