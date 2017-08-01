import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { HttpModule } from '@angular/http';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/index';
import { routing } from './app.routing';
import { NvD3Component } from 'ng2-nvd3';
import 'd3';
import 'nvd3';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NvD3Component   
    
  ],
  imports: [
    BrowserModule,HttpModule,routing,FormsModule
  ],
  providers: [AuthGuard, UserService, AuthenticationService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
