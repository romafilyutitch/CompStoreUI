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

  register(username:string, email:string, password:string) {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    return this.httpClient.post("http://localhost:8080/register", {username, email, password});
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem("username");
    let token = sessionStorage.getItem('token');
    console.log(user != null && token != null);
    return user != null && token != null;
  }

  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem('token');
  }


}
