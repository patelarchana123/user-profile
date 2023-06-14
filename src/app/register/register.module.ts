import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './service/register.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule

  ],
  providers:[
    RegisterService
  ]
})
export class RegisterModule { }
