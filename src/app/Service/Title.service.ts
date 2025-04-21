import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Title} from '../DTO/Title';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleUrl = `${environment.api}/${environment.titleApiUrl}`;

  constructor(private http: HttpClient) {
  }

  getTitles(search?: string): Observable<Title[]>{
    const url = search ? `${this.titleUrl}?search=${search}`: this.titleUrl;
    return this.http.get<Title[]>(url);
  }

  getTitleById(id: string): Observable<Title>{
    return this.http.get<Title>(`${this.titleUrl}/${id}`);
  }

  getTitlesByWrestler(wrestlerId: number): Observable<Title[]>{
    return this.http.get<Title[]>(`${this.titleUrl}/titles?wrestler=${wrestlerId}`);
  }

  updateTitle(id: number, title: Title): Observable<Title> {
    return this.http.put<Title>(`${this.titleUrl}/${id}`, title, { headers: { 'Content-Type': 'application/json' } });
  }
}
