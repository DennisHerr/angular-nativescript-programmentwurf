import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { Ergebnis } from '../model/ergebnis.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.scss']
})
export class UebersichtComponent implements OnInit {

  result$: Observable<any[]>;
  datum;

  constructor(private bs: BackendService) {
  }

  ngOnInit() {
    this.bs.getEinzahlungstermin().pipe(first()).subscribe((erg) => {
      console.log(erg);
      this.datum = erg
      console.log(this.datum);
      
  });
  }

}
