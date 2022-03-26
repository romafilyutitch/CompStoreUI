import {Injectable} from '@angular/core';
import {ResourceService} from "./resource.service";
import {Computer} from "../model/computer";
import {HttpClient} from "@angular/common/http";

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
}
