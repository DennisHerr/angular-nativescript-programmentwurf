import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  benutzername: string;
  passwort: string;

  logindatenvollstaendig: boolean = true;

  constructor(private bs: BackendService) { }

  ngOnInit() {
  }

  login(): void {
    console.log('login');
    
    if (this.benutzername && this.passwort) {
       this.logindatenvollstaendig = true;
       this.bs.login(this.benutzername, this.passwort).subscribe();
       console.log(localStorage.getItem('benutzerid'));
       
    }
    else {
      this.logindatenvollstaendig = false;
    }
  }
}
