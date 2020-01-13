import { Component, OnInit } from '@angular/core';
import { Ergebnis } from '../model/ergebnis.model';
import { BackendService } from '../backend.service';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-konto',
  templateUrl: './konto.component.html',
  styleUrls: ['./konto.component.scss']
})
export class KontoComponent implements OnInit {
  
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

  betrag: any;
  beleg: any;
  typ: any;

  // Forumlardaten
  public einzahlung: {
    betrag: any;
    typ: any;
    beleg: File | null;
  }

  constructor(private bs: BackendService) {
    this.einzahlung = {
      betrag: "",
      typ: "",
      beleg: null
    };
  }

  ngOnInit() {
  this.summe_einzahlungen = 0;
  this.bs.getEinzahlung().pipe(first()).subscribe((erg: Ergebnis) => {
    this.einzahlungen = erg.einzahlungen;
    console.log(this.einzahlungen);
    this.getEinzahlungen();
  })
  this.summe_ausgaben = 0;
  this.bs.getKonsum().pipe(first()).subscribe((erg: Ergebnis) => {
    this.monate = erg.monate;
    console.log(this.monate);
    this.getAuszahlungen();
})
  }

  getEinzahlungen() {
    this.einzahlungen.forEach ((einzahlung: Ergebnis) => {
      this.summe_einzahlungen = this.summe_einzahlungen + parseFloat(einzahlung.Betrag);
      this.zeitpunkt_formatiert.push(formatDate(einzahlung.Zeitpunkt,this.format, this.locale));
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
    
    this.bs.updateEinzahlung(this.einzahlung).subscribe();
  }

  // Klassenfunktion für den Aufruf im Template (Wrapper)
  formatDate(datum: any){
     return formatDate(datum, this.format, this.locale);
  }

  // immer mindestens zwei Dezimalstellen anzeigen
  formatNumber(zahl: any){
    return (Math.round(zahl * 100) / 100).toFixed(2);
  }

}