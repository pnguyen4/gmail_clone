import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  fetchEmailList(): Observable<any> {
    return this.http.get<any>(`${API_URL}/mail`);
  }

  addLabel(id: string, label: string): Observable<any> {
    return this.http.put(`${API_URL}/mail/${label}/${id}`, {});
  }

  deleteLabel(id: string, label: string): Observable<any> {
    return this.http.delete(`${API_URL}/mail/${label}/${id}`);
  }

  modifyLabels(id: string, labels: string[]): Observable<any> {
    return this.http.put(`${API_URL}/mail/${id}`, {labels});
  }

  sendEmail(recipients: string[], subject: string, body: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/mail`, {recipients, subject, body});
  }
}
