import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl: string = environment.baseUrl;
  private token: string = '';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  /**
   * Signs in a user using the provided email and password.
   * Starts a new session.
   * @param email the email of the user
   * @param password the password associated with that email
   */
  signIn(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/login', {
      email: email,
      password: password
    }, {
      responseType: 'text'
    } );
  }

 
  /**
   * Saves a new session token by replacing the old one.
   * @param newToken the token to save
   */
  public saveToken(newToken: string): void {
    window.localStorage.removeItem(this.token);
    window.localStorage.setItem(this.token, newToken);
  }

  /**
   * Gets the current session token value.
   */
   getToken(): string | null {
    return window.localStorage.getItem(this.token);
  }

  getDecodedToken(): any {
    return jwtDecode(this.getToken()!);
  }

  getLoggedUserId(): number | null {
    return this.getDecodedToken().id;
  }

  getLoggedUserName(): string | null {
    return this.getDecodedToken().first_name + " " + this.getDecodedToken().last_name;
  }

  /**
   * Gets the status of the session (if it is active or not)
   */
  activeSession(): boolean {
    return this.getToken() != null;
    
  }

  logout(): void {
    window.localStorage.clear();
  }
}





