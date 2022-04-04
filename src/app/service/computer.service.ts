import {Injectable} from '@angular/core';
import {ResourceService} from "./resource.service";
import {Computer} from "../model/computer";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ComputerResponse} from "../model/computer-response";
import {catchError, map, Observable} from "rxjs";

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

  override findAll(): Observable<Computer[]> {
    return this.httpClient.get<ComputerResponse>(this.apiUrl).pipe(map(response => response._embedded.computers));
  }

  findByName(name: string): Observable<Computer[]> {
    let params = new HttpParams().append("name", name);
    return this.httpClient.get<ComputerResponse>(`${this.apiUrl}/search/findByNameContains`,{params})
      .pipe(
        map(response => response._embedded.computers),
        catchError(this.handleError)
      );
  }
}
