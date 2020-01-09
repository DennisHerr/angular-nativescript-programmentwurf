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
  benutzerid: string;
  sessionactive: boolean = false;

  ngOnInit(): void {
    // Änderungen im localStorage mitbekommen
    this.bs.localStorageChanges().subscribe(() => {

    console.log(localStorage.getItem('benutzerid'));
    console.log(localStorage.getItem('schlüssel'));

    this.benutzerid = localStorage.getItem('benutzerid');
    
    //wenn Nutzer nicht eingeloggt -> loginkomponente
    if (this.benutzerid !== null) {
      this.sessionactive = true;
    }
    else {
      this.sessionactive = false;
    }
  })
  }

  logout() {
    this.bs.logout();
  }
}
