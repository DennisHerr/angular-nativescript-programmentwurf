import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ergebnis } from '../model/ergebnis.model';
import { BackendService } from '../backend.service';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-konto',
  templateUrl: './konto.component.html',
  styleUrls: ['./konto.component.scss']
})
export class KontoComponent implements OnInit, OnDestroy {
  
  einzahlungen: [];
  monate: [];
  belege: [];
  zeitpunkt_formatiert: string[] = [];
  summe_einzahlungen: number = 0;
  summe_einzahlungen_formatiert: any;
  summe_ausgaben: number = 0;
  summe_ausgaben_formatiert: any;
  saldo: any;
  format = 'dd.MM.yyyy';
  locale = 'de';

  einzahlungsubscription;
  auszahlungsubscription;

  betrag: any;
  beleg: any;
  typ: any;

  // Forumlardaten speziell wegen moeglichem Bild
  public einzahlung: {
    betrag: any;
    typ: any;
    beleg: File | null;
  }

  betragleer;

  constructor(private bs: BackendService) {
    this.einzahlung = {
      betrag: "",
      typ: "",
      beleg: null
    };
  }

  ngOnInit() {
    this.betragleer = false;
    this.summe_einzahlungen = 0;
    this.einzahlungsubscription = this.bs.getEinzahlung().pipe(first()).subscribe((erg: Ergebnis) => {
      // nicht im Service implementiert, da in WEB und NATIV sortiert
      this.einzahlungen = erg.einzahlungen.sort((a, b) => new Date(b.Zeitpunkt).getTime() - new Date(a.Zeitpunkt).getTime());
      console.log(this.einzahlungen);
      this.getEinzahlungen();
    })
    this.summe_ausgaben = 0;
    this.auszahlungsubscription = this.bs.getKonsum().pipe(first()).subscribe((erg: Ergebnis) => {
      this.monate = erg.monate.reverse();
      console.log(this.monate);
      this.getAuszahlungen();
    })
  }

  getEinzahlungen() {
    this.einzahlungen.forEach((einzahlung: Ergebnis) => {
      this.summe_einzahlungen = this.summe_einzahlungen + parseFloat(einzahlung.Betrag);
      //formatDate -> momentJS
      this.zeitpunkt_formatiert.push(this.formatDate(einzahlung.Zeitpunkt));
    })
    this.summe_einzahlungen_formatiert = this.formatNumber(this.summe_einzahlungen);
  }

  getAuszahlungen() {
    this.monate.forEach ((monat: Ergebnis) => {
      this.summe_ausgaben = this.summe_ausgaben + (monat.Striche * monat.Preis)
    })
    console.log(this.summe_ausgaben);
    this.summe_ausgaben_formatiert = this.formatNumber(this.summe_ausgaben);
    this.getKontostand();
  }

  getKontostand() {
    this.saldo = 0;
    this.saldo = this.formatNumber(this.summe_einzahlungen - this.summe_ausgaben);
  }

  einzahlen() {
    console.log( "Betrag:", this.einzahlung.betrag );
    console.log( "Typ:", this.einzahlung.typ );
    console.log( "Beleg:", this.einzahlung.beleg );
    
    if(this.einzahlung.betrag == '') {
       this.betragleer = true;
       
    }
    else {
      this.betragleer = false;
      this.bs.updateEinzahlung(this.einzahlung).subscribe(() => {this.ngOnDestroy(), this.ngOnInit()});
    }
  }

  ngOnDestroy() {
    this.einzahlungsubscription.unsubscribe();
    this.auszahlungsubscription.unsubscribe();
  }

  // Klassenfunktion für den Aufruf im Template (Wrapper)
  formatDate(datum: any){
    // formatDate durch momentJS ersetzt (für nativescript)
          //return formatDate(datum, this.format, this.locale);
    return moment(datum).format("DD.MM.YYYY");
  }

  // immer mindestens zwei Dezimalstellen anzeigen
  formatNumber(zahl: any){
    return (Math.round(zahl * 100) / 100).toFixed(2);
  }

}