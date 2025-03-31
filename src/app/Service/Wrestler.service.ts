import {Injectable} from '@angular/core';
import {environment} from '../enviroment';
import {HttpClient} from '@angular/common/http';
import {Observable,} from 'rxjs';
import {Wrestler} from '../DTO/Wrestler';
import {WrestlerWithPromotion} from '../DTO/WrestlerWithPromotion';

@Injectable({
  providedIn: 'root'
})
export class WrestlerService {
  private wrestlerUrl = `${environment.apiUrl}/${environment.wrestlerApiUrl}`;

  constructor(private http: HttpClient) {
  }

  getWrestlers(search?: string): Observable<Wrestler[]>{
    const url = search ? `${this.wrestlerUrl}?search=${search}`: this.wrestlerUrl;
    return this.http.get<Wrestler[]>(url);
  }

  getWrestlerById(id: string): Observable<WrestlerWithPromotion>{
    const url = `${this.wrestlerUrl}/${id}`;
    return this.http.get<WrestlerWithPromotion>(url);
  }

  updateWrestler(id: number, wrestler: Wrestler): Observable<Wrestler> {
    return this.http.put<Wrestler>(`${this.wrestlerUrl}/${id}`, wrestler, { headers: { 'Content-Type': 'application/json' } });
  }
}
