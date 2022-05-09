import {Injectable} from '@angular/core';
import {ResourceService} from "./resource.service";
import {Computer} from "../model/computer";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../model/review";

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

  uploadImage(computerToSave: Computer, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image, image.name);
    formData.forEach((value, key) => console.log(`Form data key ${key} form data value ${value}`));
    return this.httpClient.post(`${this.apiUrl}/${computerToSave.id}/images`, formData);
  }

  downloadComputerImages(computer: Computer): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/${computer.id}/images`);
  }

  postReview(computer: Computer, review: Review): Observable<Computer> {
    return this.httpClient.post<Computer>(`${this.apiUrl}/${computer.id}/reviews`, review)
  }

}
