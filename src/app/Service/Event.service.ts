import {Injectable} from '@angular/core';
import {environment} from '../enviroment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventWrestling} from '../DTO/EventWrestling';

@Injectable({
  providedIn: "root"
})
export class EventService{
  private eventUrl = `${environment.apiUrl}/${environment.eventApiUrl}`;
  constructor(private http: HttpClient) {
  }

  getEvents(search?: string): Observable<EventWrestling[]>{
    const url = search ? `${this.eventUrl}?search=${search}` : this.eventUrl;
    return this.http.get<EventWrestling[]>(url);
  }
  getEventById(id: string): Observable<EventWrestling>{
    const url = `${this.eventUrl}/${id}`;
    return this.http.get<EventWrestling>(url);
  }
}
