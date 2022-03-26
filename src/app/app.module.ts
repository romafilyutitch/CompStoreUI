import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule} from '@angular/router';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path: '', component : MainComponent},
  {path: 'details/:id', component: DetailsComponent}
];//sets up routes constant where you define your routes.

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
