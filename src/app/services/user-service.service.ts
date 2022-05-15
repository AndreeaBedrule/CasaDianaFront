import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }
  
  createAccount(firstName: string, lastName: string,  email: string, phoneNumber: string,password: string): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/register', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    }, {responseType: "text", headers: new HttpHeaders({"Content-Type": "application/json"})});
  }

 /*  activateAccount(activationToken: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}activate-account`,
      activationToken,
      {responseType: "text", headers: new HttpHeaders({"Content-Type": "application/json"})}
    ) }*/
  }



