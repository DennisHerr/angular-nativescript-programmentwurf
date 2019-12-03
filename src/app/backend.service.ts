import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  //einzelne Dateien für jeden Request
  baseurl = 'http://localhost:8080/angular-nativescript-programmentwurf/';
  constructor(private http:HttpClient) { }
  

}