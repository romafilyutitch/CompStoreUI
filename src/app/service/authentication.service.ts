import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  //provide username and password for authentication and once authentication is successful,
  //store JWT token in session
  authenticate(username:string, password:string) {
    return this.httpClient.post("http://localhost:8080/authenticate", {username, password})
      .pipe(
        map((userData : any) => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      )
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(user !== null);
    return user !== null;
  }

  logout() {
    sessionStorage.removeItem("username");
  }


}
