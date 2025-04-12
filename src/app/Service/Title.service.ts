import {Injectable} from '@angular/core';
import {environment} from '../enviroment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Title} from '../DTO/Title';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleUrl = `${environment.apiUrl}/${environment.titleApiUrl}`;

  constructor(private http: HttpClient) {
  }

  getTitles(search?: string): Observable<Title[]>{
    const url = search ? `${this.titleUrl}?search=${search}`: this.titleUrl;
    return this.http.get<Title[]>(url);
  }

  getTitleById(id: string): Observable<Title>{
    const url = `${this.titleUrl}/${id}`;
    return this.http.get<Title>(url);
  }

  updateTitle(id: number, title: Title): Observable<Title> {
    return this.http.put<Title>(`${this.titleUrl}/${id}`, title, { headers: { 'Content-Type': 'application/json' } });
  }
}
