import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NewpostComponent } from './post/newpost/newpost.component';
import { PostRoutingModule } from './post/post-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { MypostComponent } from './post/mypost/mypost.component';
import { AllpostComponent } from './post/allpost/allpost.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewpostComponent,
    MypostComponent,
    AllpostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
