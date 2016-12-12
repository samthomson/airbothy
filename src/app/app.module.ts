import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapComponent } from './map/map.component';

import { BothyService } from './services/bothy.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDR4kOXozjam-Y3xaMxq9mSABoJxHzsXhM'
  })
  ],
  providers: [BothyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
