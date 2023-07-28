import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthserviceService } from './service/authservice.service';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [
    SignupComponent,
    LayoutComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModuleModule
  ],
  providers: [AuthserviceService],
})
export class AuthModule {}
