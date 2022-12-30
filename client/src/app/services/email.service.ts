import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  fetchEmailList(label: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/mail/${label}`);
  }
}
