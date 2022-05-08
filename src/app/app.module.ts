import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule} from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { AddComponent} from "./add/add.component";
import { ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {BasicAuthHttpInterceptorService} from "./service/basic-auth-http-interceptor.service";

const routes: Routes = [
  {path: '', component : MainComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'add', component: AddComponent},
  {path: 'signup', component: SignUpComponent}
];//sets up routes constant where you define your routes.

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailsComponent,
    AddComponent,
    CartComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
