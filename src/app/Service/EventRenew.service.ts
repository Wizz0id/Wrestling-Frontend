import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventRenew} from '../DTO/EventRenew';

@Injectable({
  providedIn: "root"
})
export class EventRenewService {
  private eventUrl = `${environment.apiUrl}/${environment.eventApiUrl}`;

  constructor(private http: HttpClient) {
  }

  getRenews(id: string): Observable<EventRenew[]> {
    const url = `${this.eventUrl}/${id}/${environment.renewApiUrl}`;
    return this.http.get<EventRenew[]>(url);
  }

  createRenew(id: string, renew: EventRenew): Observable<EventRenew> {
    const url = `${this.eventUrl}/${id}/${environment.renewApiUrl}`;
    return this.http.post<EventRenew>(url, renew, { headers: { 'Content-Type': 'application/json' }});
  }
}
