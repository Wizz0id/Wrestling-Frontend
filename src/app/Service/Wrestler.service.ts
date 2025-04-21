import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
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
    return this.http.get<WrestlerWithPromotion>(`${this.wrestlerUrl}/${id}`);
  }

  getWrestlersByPromotion(promoID: number): Observable<Wrestler[]>{
    return this.http.get<Wrestler[]>(`${this.wrestlerUrl}/wrestlers?promotion=${promoID}`);
  }

  getWrestlersByMatch(matchID: number): Observable<Wrestler[]>{
    return this.http.get<Wrestler[]>(`${this.wrestlerUrl}/wrestlers?match=${matchID}`)
  }

  getWrestlersByTitle(titleId: number): Observable<Wrestler[]>{
    return this.http.get<Wrestler[]>(`${this.wrestlerUrl}/wrestlers?title=${titleId}`);
  }

  updateWrestler(id: number, wrestler: Wrestler): Observable<Wrestler> {
    return this.http.put<Wrestler>(`${this.wrestlerUrl}/${id}`, wrestler, { headers: { 'Content-Type': 'application/json' } });
  }
}
