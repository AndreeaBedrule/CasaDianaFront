import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IReservation } from 'src/app/models/reservation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = environment.baseUrl;
  private apiUrl = environment.baseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  private options = {headers: this.headers}

  constructor( 
    private httpClient: HttpClient) { }

  addReservation(reservation: IReservation, token: string): Observable<IReservation> {
    const body: string = JSON.stringify(reservation);

    return this.httpClient.post<IReservation>(this.apiUrl + '/addReservation', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }}

