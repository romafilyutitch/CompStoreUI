import {Injectable} from '@angular/core';
import {ResourceService} from "./resource.service";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'users';
  }

  addUserOrder(currentUser: User, newOrder: Order): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/${currentUser.id}/orders`, newOrder);
  }

}
