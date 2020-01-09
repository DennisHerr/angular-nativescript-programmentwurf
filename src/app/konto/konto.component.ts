import { Component, OnInit } from '@angular/core';
import { Ergebnis } from '../model/ergebnis.model';
import { BackendService } from '../backend.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-konto',
  templateUrl: './konto.component.html',
  styleUrls: ['./konto.component.scss']
})
export class KontoComponent implements OnInit {

  constructor(private bs: BackendService) { }

  ngOnInit() {
    this.bs.getEinzahlung().pipe(first()).subscribe((erg: Ergebnis) => {
      console.log(erg);
  })

}

}