import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) { }

  fetchLabelList(): Observable<any> {
    return this.http.get<any>(`${API_URL}/labels`);
  }

  newLabel(label: string): Observable<any> {
    return this.http.put<any>(`${API_URL}/addlabel`, {label});
  }

  deleteLabel(label: string): Observable<any> {
    return this.http.put<any>(`${API_URL}/rmlabel`, {label});
  }
}
