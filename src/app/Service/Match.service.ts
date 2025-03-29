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
    const url = `${this.matchUrl}/${id}`;
    return this.http.get<Match>(url);
  }
}
