import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Ergebnis } from '../model/ergebnis.model';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-strichliste',
  templateUrl: './strichliste.component.html',
  styleUrls: ['./strichliste.component.scss']
})
export class StrichlisteComponent implements OnInit {

  monateKonsum: [];
  datum: Date;
  aktuellerMonat: any;
  stricheAktuellerMonat: any;
  preisAktuellerMonat: any;
  summeAktuellerMonat: any;
  monate: Array<string> = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  aktuellesJahr: any;
  constructor(private bs: BackendService) { }

  ngOnInit() {
    this.datum = new Date();
    this.aktuellerMonat = this.monate[this.datum.getMonth()];
    this.aktuellesJahr = this.datum.getFullYear();
    console.log(this.aktuellesJahr);
    
    console.log(this.aktuellerMonat);
    
    this.bs.getKonsum().pipe(first()).subscribe((erg: Ergebnis) => {
      this.monateKonsum = erg.monate;
      console.log(this.monateKonsum);
      this.getStricheAktuellerMonat();
  })
  }
  getStricheAktuellerMonat () {
    var exitException;
    try {
    this.monateKonsum.forEach((monate: Ergebnis) => {
      console.log(monate.Monat);
      console.log(monate.Jahr);
      
      
      if(monate.Monat == this.aktuellerMonat && monate.Jahr == this.aktuellesJahr){
        console.log('aktueller Monat vorhanden');
        console.log(monate.Striche);
        
        this.stricheAktuellerMonat = monate.Striche;
        this.summeAktuellerMonat = this.formatNumber((this.stricheAktuellerMonat * monate.Preis + 0.0001));
        throw exitException;
      }
      else {
        console.log('!= aktueller Monat');
        this.stricheAktuellerMonat = '0';
        this.summeAktuellerMonat = this.formatNumber((this.stricheAktuellerMonat * monate.Preis + 0.0001));
      }
    })
  }catch (e) {
    if (e !== exitException) throw e;
  }
    
  }

  updateStrichliste () {
    this.bs.updateKonsum().pipe(first()).subscribe((erg: Ergebnis) => {
      this.monateKonsum = erg.monate;
      console.log(this.monateKonsum);
      this.getStricheAktuellerMonat();
  })
  }

  // immer mindestens zwei Dezimalstellen anzeigen
  formatNumber(zahl: any){
    return (Math.round(zahl * 100) / 100).toFixed(2);
  }

}
