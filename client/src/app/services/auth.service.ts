import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, NewUser } from '../models/user.models';
const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // TODO: type http response observables
  signin(user: User): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${API_URL}/signin`, user, {headers: headers});
  }

  signup(newuser: NewUser): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${API_URL}/signup`, newuser, {headers: headers});
  }

  signout(): void {
    localStorage.clear();
    // TODO: handle this on server side also?
  }

  saveToken(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
  }

  loggedIn(): boolean {
    let token = localStorage.getItem('token');
    if (typeof token !== "string") return false;

    // convert back from base64, grab expiration date in UTC seconds
    const expiry = JSON.parse(window.atob((token.split('.')[1]))).exp;
    const date = (Math.floor((new Date).getTime() / 1000));
    return date <= expiry;
  }
}
