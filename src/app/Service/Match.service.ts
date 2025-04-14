import {Injectable} from '@angular/core';
import {environment} from '../enviroment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Match} from '../DTO/Match';

@Injectable({
  providedIn: "root"
})
export class MatchService{
  private matchUrl = `${environment.apiUrl}/${environment.matchApiUrl}`;
  constructor(private http: HttpClient) {
  }

  getMatches(search?: string): Observable<Match[]>{
    const url = search ? `${this.matchUrl}?search=${search}` : this.matchUrl;
    return this.http.get<Match[]>(url);
  }
  getMatchById(id: string): Observable<Match>{
    return this.http.get<Match>(`${this.matchUrl}/${id}`);
  }

  getMatchesByWrestler(wrestlerId: number): Observable<Match[]>{
    return this.http.get<Match[]>(`${this.matchUrl}/matches?wrestler=${wrestlerId}`);
  }

  getMatchesByEvent(eventId: number): Observable<Match[]>{
    return this.http.get<Match[]>(`${this.matchUrl}/matches?event=${eventId}`)
  }
}
