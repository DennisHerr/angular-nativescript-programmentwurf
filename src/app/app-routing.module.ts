import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { BelegComponent } from './beleg/beleg.component';
import { EinzahlungComponent } from './einzahlung/einzahlung.component';
import { StrichlisteComponent } from './strichliste/strichliste.component';
import { KontoComponent } from './konto/konto.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: UebersichtComponent
  },
  {
    path: 'belege', component: BelegComponent
  },
  {
    path: 'einzahlung', component: EinzahlungComponent
  },
  {
    path: 'strichliste', component: StrichlisteComponent
  },
  {
    path: 'konto', component: KontoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
