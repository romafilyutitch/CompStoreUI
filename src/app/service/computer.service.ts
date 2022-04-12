import {Injectable} from '@angular/core';
import {ResourceService} from "./resource.service";
import {Computer} from "../model/computer";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComputerService extends ResourceService<Computer> {


  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'computers';
  }

  findByName(name: string): Observable<Computer[]> {
    let params = new HttpParams().append('name', name);
    return this.httpClient.get<Computer[]>(`${this.apiUrl}`, {params});
  }
}
