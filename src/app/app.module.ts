import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { KonsumComponent } from './konsum/konsum.component';
import { KontoComponent } from './konto/konto.component';
import { EinzahlungComponent } from './einzahlung/einzahlung.component';
import { StrichlisteComponent } from './strichliste/strichliste.component';
import { BelegComponent } from './beleg/beleg.component';

@NgModule({
  declarations: [
    AppComponent,
    UebersichtComponent,
    KonsumComponent,
    KontoComponent,
    EinzahlungComponent,
    StrichlisteComponent,
    BelegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
