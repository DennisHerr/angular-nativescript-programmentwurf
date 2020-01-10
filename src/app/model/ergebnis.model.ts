export class Ergebnis {
  [x: string]: any;
  private _ergebnis: any;
  private _Termine: any;

  get ergebnis(): any {
      return this._ergebnis
  }

  get Termine(): any {
    return this._Termine
}
}
