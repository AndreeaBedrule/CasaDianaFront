import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IRoom } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class AdminRoomService {
  private baseUrl = environment.baseUrl;
  private apiUrl = environment.baseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  private options = {headers: this.headers}

  constructor(
    private http: HttpClient
    ) { 

    }

  getAllRooms(token: string): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.baseUrl}/getAllRooms`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });

  }

  getAvailableRooms(token: string, check_in:string, check_out:string): Observable<IRoom[]>
  {
    return this.http.get<IRoom[]>(`${this.baseUrl}/getAvailableRooms`+ '?check_in=' + check_in + '&check_out=' + check_out , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }

  addRoom(room: IRoom, token: string): Observable<IRoom> {
    const body: string = JSON.stringify(room);

    return this.http.post<IRoom>(this.apiUrl + '/addRoom', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }

  updateRoom(id: number, room: IRoom, token: string): Observable<IRoom> {
    const body: string = JSON.stringify(room);

    return this.http.put<IRoom>(this.apiUrl + '/room/update/' + id, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }

  removeRoom(id: number, token: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/room/delete/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }

  

}
