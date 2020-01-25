import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private bs: BackendService) { }
  
  title = 'angular-nativescript-programmentwurf';
  sessionactive: boolean = false;

  ngOnInit(): void {
    // Beim Laden der App prüfen ob 'Session' vorhanden
    this.checkEingeloggt();
    // Änderungen im localStorage mitbekommen
    this.bs.localStorageChanges().subscribe(() => {
    console.log('localstorage changed appcomponent');
    
    console.log(localStorage.getItem('benutzerid'));
    console.log(localStorage.getItem('schlüssel'));

    this.checkEingeloggt();
  })
  }

  checkEingeloggt() {
    // wenn Nutzer nicht eingeloggt -> loginkomponente
    this.sessionactive = (localStorage.getItem('benutzerid') !== null) ? true : false;
    console.log(this.sessionactive);
    
  }

  // Testfunktion für schnellen login
  login() {
    this.bs.login('Testuser', 'Testuser').subscribe();
  }

  logout() {
    this.bs.logout();
  }
}
