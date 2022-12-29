import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signin(user: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${API_URL}/signin`, user, {headers: headers});
  }

  saveToken(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
  }

  loggedIn(): boolean {
    let token = localStorage.getItem('token');
    if (typeof token === "string") {
      // convert back from base64, grab expiration date in UTC seconds
      const expiry = JSON.parse(window.atob((token.split('.')[1]))).exp;
      const date = (Math.floor((new Date).getTime() / 1000));
      if (date <= expiry) {
        return true;
      }
    }
    return false;
  }
}
