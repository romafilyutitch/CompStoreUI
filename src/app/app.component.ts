import { Component } from '@angular/core';
import {AuthenticationService} from "./service/authentication.service";
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CompStoreUI';

  constructor(private authenticationService: AuthenticationService) {
  }

  isUserLoggedIn(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
  }


}
