import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { first } from 'rxjs/operators';
import { Ergebnis } from '../model/ergebnis.model';

@Component({
  selector: 'app-konsum',
  templateUrl: './konsum.component.html',
  styleUrls: ['./konsum.component.scss']
})
export class KonsumComponent implements OnInit {

  monate: [];
  constructor(private bs: BackendService) { }

  ngOnInit() {
    this.bs.getKonsum().pipe(first()).subscribe((erg: Ergebnis) => {
      this.monate = erg.monate;
      console.log(this.monate);
  })
  }

}
