import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoModule } from './photo/photo.module';
import { HomeComponent } from './shared/home/home.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { AuthModule } from './auth/auth.module';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PhotoModule,
    PrimeNgModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
