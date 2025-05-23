import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
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
    return this.http.get<EventWrestling>(`${this.eventUrl}/${id}`);
  }

  createEvent(promoId: number, eventWrestling: EventWrestling): Observable<EventWrestling>{
    return this.http.post<EventWrestling>(`${this.eventUrl}?promo=${promoId}`, eventWrestling);
  }
}
