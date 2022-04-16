import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule} from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { AddComponent} from "./add/add.component";
import { ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component : MainComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'add', component: AddComponent}
];//sets up routes constant where you define your routes.

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailsComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
