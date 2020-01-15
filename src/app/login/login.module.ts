import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    NativeScriptFormsModule,
    CommonModule
  ]
})
export class LoginModule { }
