import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Match} from '../DTO/Match';
import {MatchWithRatingDTO} from '../DTO/MatchWithRatingDTO';

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
  getMatchById(id: string): Observable<MatchWithRatingDTO>{
    return this.http.get<MatchWithRatingDTO>(`${this.matchUrl}/${id}`);
  }

  getMatchesByWrestler(wrestlerId: number): Observable<Match[]>{
    return this.http.get<Match[]>(`${this.matchUrl}/matches?wrestler=${wrestlerId}`);
  }

  getMatchesByEvent(eventId: number): Observable<Match[]>{
    return this.http.get<Match[]>(`${this.matchUrl}/matches?event=${eventId}`)
  }

  createMatch(match: Match): Observable<Match>{
    return this.http.post<Match>(this.matchUrl, match);
  }
}
