import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Termin } from './model/termin.model';
import { Ergebnis } from './model/ergebnis.model';
import { throwError, Observable, Subject } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseurl = '/angular-nativescript-programmentwurf/backendaufruf.php';
  datum: Date;
  termine: Ergebnis;

  format = 'dd.MM.yyyy';
  locale = 'de';
  localStorageState = new Subject<any>();

  constructor(private http:HttpClient) { }

  // Ermittlung der Benutzerid für den Aufruf der HTTP Requests
  getBenutzerId(): string {
    console.log(`Benutzerid ${localStorage.getItem('benutzerid')}`);
    return localStorage.getItem('benutzerid');
  }
  
  getEinzahlung() {
    return this.http.post<Ergebnis>(`${this.baseurl}`, {
        function: 'getEinzahlung',
        benutzer: this.getBenutzerId()
      }
    ).pipe(
      map((erg => erg.ergebnis),
      catchError(err => throwError(err))));
  }


  getEinzahlungstermin() {
    return this.http.post<Ergebnis>(`${this.baseurl}`, {
        function: 'getEinzahlungstermin'
    }).pipe(map(erg => formatDate(erg.ergebnis.Termine[0].Datum, this.format, this.locale)));

  }

  // TODO: in uebersicht component getMeldungstext kopieren
  getEinzahlungstermin2(): Observable<Ergebnis>  {
    return this.http.post<any>(`${this.baseurl}`, {
      function: 'getEinzahlungstermin'}).pipe(
      map(erg => {
        console.log(erg);
        this.termine = erg;
        return this.termine;
  }))

  }

  getKonsum()  {
    return this.http.post<Ergebnis>(`${this.baseurl}`, {
      function: 'getKonsum',
      benutzer: this.getBenutzerId()}
      ).pipe(
      map(erg => erg.ergebnis))

  }

  login(benutzer: string, pw: string) {
      return this.http.post<Ergebnis>(`${this.baseurl}`, {
          function: 'login',
          benutzername: benutzer,
          passwort: pw
        }
      ).pipe(
        map(erg => {
          console.log(erg);
          if(erg.ergebnis.login === 'erfolgreich'){
          this.setItem('benutzerid',erg.ergebnis.benutzerid);
          this.setItem('schlüssel',erg.ergebnis.schlüssel);
        }
    }),
        catchError(err => throwError(err)));
    }

    logout() {
      this.removeItem('benutzerid');
      this.removeItem('schlüssel');
    }
    
    // Diese Funktionen werden benötigt, um die Änderungen am localStorage mitzubekommen
    localStorageChanges(): Observable<any> {
      return this.localStorageState.asObservable();
    }

    setItem(key: string, value: string) {
      localStorage.setItem(key, value);
      this.localStorageState.next('changed');
    }

    removeItem(key: string) {
      localStorage.removeItem(key);
      this.localStorageState.next('changed');
    }
}