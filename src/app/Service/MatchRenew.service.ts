import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatchRenew} from '../DTO/MatchRenew';

@Injectable({
  providedIn: "root"
})
export class MatchRenewService {
  private matchUrl = `${environment.apiUrl}/${environment.matchApiUrl}`;

  constructor(private http: HttpClient) {
  }

  getRenews(id: string): Observable<MatchRenew[]> {
    const url = `${this.matchUrl}/${id}/${environment.renewApiUrl}`;
    return this.http.get<MatchRenew[]>(url);
  }

  createRenew(id: string, renew: MatchRenew): Observable<MatchRenew> {
    const url = `${this.matchUrl}/${id}/${environment.renewApiUrl}`;
    return this.http.post<MatchRenew>(url, renew, { headers: { 'Content-Type': 'application/json' }});
  }
}
