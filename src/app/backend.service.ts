import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Termin } from './model/termin.model';
import { Ergebnis } from './model/ergebnis.model';
import { throwError, Observable } from 'rxjs';
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

  constructor(private http:HttpClient) { }
  
  getEinzahlung(benutzerid: string) {
    return this.http.post<Ergebnis>(`${this.baseurl}`, {
        function: 'getEinzahlung',
        benutzer: benutzerid
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

  // Login implementieren und bei erfolreichem Login zur Übersicht rooten
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
          localStorage.setItem('benutzerid', erg.ergebnis.benutzerid);
          localStorage.setItem('schlüssel', erg.ergebnis.schlüssel);

          console.log(localStorage.getItem('benutzerid'));
          console.log(localStorage.getItem('schlüssel'));
        }
    }),
        catchError(err => throwError(err)));
    }

}