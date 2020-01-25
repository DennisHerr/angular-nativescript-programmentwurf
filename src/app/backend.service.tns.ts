import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Termin } from './model/termin.model';
import { Ergebnis } from './model/ergebnis.model';
import { throwError, Observable, Subject } from 'rxjs';
import { formatDate } from '@angular/common';
import {Router} from "@angular/router";
import * as moment from 'moment';
import { RouterExtensions } from 'nativescript-angular/router';

import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "tns-core-modules/application-settings";

import * as imagepicker from "nativescript-imagepicker";


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseurl = 'http://localhost:8080/angular-nativescript-programmentwurf/backendaufruf.php';
  datum: Date;
  termine: Ergebnis;

  format = 'dd.MM.yyyy';
  locale = 'de';
  localStorageState = new Subject<any>();
  bildListe: [];


  constructor(private http:HttpClient, private router: Router, private routerExtensions: RouterExtensions) {}

  // Ermittlung der Benutzerid für den Aufruf der HTTP Requests
  getBenutzerId(): string {
    console.log(`Benutzerid ${getString('benutzerid')}`);//`${localStorage.getItem('benutzerid')}`);
    return getString('benutzerid');//localStorage.getItem('benutzerid');
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
    }).pipe(map(erg => moment(erg.ergebnis.Termine[0].Datum).format("DD.MM.YYYY"))); //formatDate(erg.ergebnis.Termine[0].Datum, this.format, this.locale)));

  }


  getKonsum()  {
    return this.http.post<Ergebnis>(`${this.baseurl}`, {
      function: 'getKonsum',
      benutzer: this.getBenutzerId()}
      ).pipe(
      map(erg => erg.ergebnis))
  }

  login(benutzer: string, pw: string) {
    // schneller entwickeln
    benutzer = 'Testuser';
    pw = 'Testuser';
      return this.http.post<Ergebnis>(`${this.baseurl}`, {
          function: 'login',
          benutzername: benutzer,
          passwort: pw
        }
      ).pipe(
        map(erg => {
          console.log(erg);
          if(erg.ergebnis.login === 'erfolgreich'){
            console.log('set localStorage');
            this.setItem('benutzerid',erg.ergebnis.benutzerid);
            this.setItem('schlüssel',erg.ergebnis.schlüssel);
            this.routerExtensions.navigate(["/dashboard"],{ clearHistory: true });
        }
    }),
        catchError(err => throwError(err)));
    }

    logout() {
      console.log('logout');
      
      this.removeItem('benutzerid');
      this.removeItem('schlüssel');
      this.routerExtensions.navigate(["../"],{ clearHistory: true });
    }

    updateKonsum() {
      return this.http.post<Ergebnis>(`${this.baseurl}`, {
        function: 'updateKonsum',
        benutzer: this.getBenutzerId()}
        ).pipe(
        map(erg => erg.ergebnis))
    }

    updateEinzahlung(einzahlung) {
      return this.http.post<Ergebnis>(`${this.baseurl}`, {
        function: 'updateEinzahlung',
        benutzer: this.getBenutzerId(),
        betrag: einzahlung.betrag,
        typ: einzahlung.typ,
        beleg: einzahlung.beleg == null ? '' : einzahlung.beleg}
        ).pipe(
        map(erg => erg.ergebnis))
    }

    navigate(route, clear) {
      console.log('navigate');
      
      this.routerExtensions.navigate([route], {
        transition: {
            name: "fade"
        },
        clearHistory: false
    });
    }

    getPicture(): Array<any> {

      let context = imagepicker.create({
        mode: "single" // multiple, mehrere Bilder möglich
    });

      context
      .authorize()
      .then(function() {
          return context.present();
      })
      .then(function(selection) {
          selection.forEach(function(selected) {
              // process the selected image
          });

          this.bildListe.items = selection;
          
      }).catch(function (e) {
          // process error
      });
      console.log(this.bildListe);
      
      return this.bildListe;
    }
    
    // Diese Funktionen werden benötigt, um die Änderungen am localStorage mitzubekommen
    localStorageChanges(): Observable<any> {
      console.log('localstoragechange');
      return this.localStorageState.asObservable();
    }

    setItem(key: string, value: string) {
      setString(key, value);//localStorage.setItem(key, value);
      this.localStorageState.next('changed');
      console.log(getString(key));
    }

    removeItem(key: string) {
      remove(key);//localStorage.removeItem(key);
      this.localStorageState.next('changed');
    }
}