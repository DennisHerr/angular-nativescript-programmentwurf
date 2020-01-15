import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [LoginComponent, NativeScriptFormsModule],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
