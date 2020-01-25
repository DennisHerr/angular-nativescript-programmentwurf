import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { AppModule } from '@src/app/app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [BackendService]
})

export class LoginComponent implements OnInit {

  public logindaten: {
    benutzername: string;
    passwort: string;
  }

  logindatenvollstaendig: boolean = true;

  constructor(private bs: BackendService) { 
    this.logindaten = {
      benutzername: "",
      passwort: "",
    };
  }

  ngOnInit() {
   
  }

  login(): void {
    console.log('login');
    console.log('benutzername ' + this.logindaten.benutzername);
    console.log('passwort ' + this.logindaten.passwort);
    
    if (this.logindaten.benutzername && this.logindaten.passwort) {
       this.logindatenvollstaendig = true;
       this.bs.login(this.logindaten.benutzername, this.logindaten.passwort).subscribe();
    }
    else {
      this.logindatenvollstaendig = false;
    }
  }
}
