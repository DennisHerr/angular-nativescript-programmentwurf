import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-nativescript-programmentwurf';
  benutzerid: string;
  sessionactive: boolean = false;

  ngOnInit(): void {
    console.log(localStorage.getItem('benutzerid'));
    console.log(localStorage.getItem('schlüssel'));

    // globale servicefunction um item aus dem local storage erstellen und appmodule prüfung im template anschauen
    this.benutzerid = localStorage.getItem('benutzerid');

    if (this.benutzerid == '1') {
      this.sessionactive = true;
    }
    else {
      this.sessionactive = false;
    }
  
  }
}
