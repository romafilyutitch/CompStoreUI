import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next:HttpHandler) {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        headers: req.headers.set('Authorization', sessionStorage.getItem('token') as string)
      })
    }
    return next.handle(req);
  }
}
