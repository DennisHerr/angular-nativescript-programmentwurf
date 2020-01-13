import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { KonsumComponent } from './konsum/konsum.component';
import { KontoComponent } from './konto/konto.component';
import { EinzahlungComponent } from './einzahlung/einzahlung.component';
import { StrichlisteComponent } from './strichliste/strichliste.component';
import { BelegComponent } from './beleg/beleg.component';
import { MenueComponent } from './menue/menue.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

// Lokalisierung festlegen, um das Datum umformatieren zu können
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

@NgModule({
  declarations: [
    AppComponent,
    UebersichtComponent,
    KonsumComponent,
    KontoComponent,
    EinzahlungComponent,
    StrichlisteComponent,
    BelegComponent,
    MenueComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "de" }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    registerLocaleData(localeDe);
  }
}
