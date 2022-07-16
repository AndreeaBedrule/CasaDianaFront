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
  }

  getAllReservations(token: string): Observable<IReservation[]> {
    return this.httpClient.get<IReservation[]>(`${this.baseUrl}/getAllReservations`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });

  }

  getAllUserReservation(token: string, id: number): Observable<IReservation[]> {
    return this.httpClient.get<IReservation[]>(`${this.baseUrl}/reservation/getAllUsersReservations?id=${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });

  }

  cancelReservation(token: string, reservation: IReservation): Observable<IReservation> {
    const body: string = JSON.stringify(reservation);
    return this.httpClient.put<IReservation>(this.apiUrl + '/reservation/update/' + reservation.id, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }

  removeReservation(id: number, token: string): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/reservation/delete/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }

  updateReservation(id: number, reservation: IReservation, token: string): Observable<IReservation> {
    const body: string = JSON.stringify(reservation);

    return this.httpClient.put<IReservation>(this.apiUrl + '/reservation/update/' + id, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }
  
  removeUser(id: number, token: string): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/user/delete/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }
}

