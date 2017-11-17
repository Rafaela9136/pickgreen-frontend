import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { DepositoComponent } from './deposito/deposito.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { EventsComponent } from './admin-panel/events/events.component';
import { DepositPlaceComponent } from './admin-panel/deposit-place/deposit-place.component';
import { CollectorsComponent } from './admin-panel/collectors/collectors.component';
import { BraceletsComponent } from './admin-panel/bracelets/bracelets.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdmAuthGuard } from './_guards/adm-auth.guard';
import { CollectorAuthGuard } from './_guards/collector-auth.guard';
import { DepositsComponent } from './admin-panel/deposits/deposits.component';

const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mapa', component: MapComponent, canActivate: [CollectorAuthGuard] },
  { path: 'confirmar-deposito', component: DepositoComponent, canActivate: [CollectorAuthGuard] },
  { path: 'painel', component: AdminPanelComponent, canActivate: [AdmAuthGuard] },
  { path: 'usuarios', component: UsersComponent, canActivate: [AdmAuthGuard] },
  { path: 'eventos', component: EventsComponent, canActivate: [AdmAuthGuard] },
  { path: 'locais-de-deposito', component: DepositPlaceComponent, canActivate: [AdmAuthGuard] },
  { path: 'coletores', component: CollectorsComponent, canActivate: [AdmAuthGuard] },
  { path: 'pulseiras', component: BraceletsComponent, canActivate: [AdmAuthGuard] },
  { path: 'depositos', component: DepositsComponent, canActivate: [AdmAuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
