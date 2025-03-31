import {Injectable} from '@angular/core';
import {environment} from '../enviroment';
import {HttpClient} from '@angular/common/http';
import {Observable,} from 'rxjs';
import {Promotion} from '../DTO/Promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private promotionUrl = `${environment.apiUrl}/${environment.promotionApiUrl}`;

  constructor(private http: HttpClient) {
  }

  getPromotions(search?: string): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(search ? `${this.promotionUrl}?search=${search}`: this.promotionUrl);
  }
  getPromotionById(id: string): Observable<Promotion>{
    return this.http.get<Promotion>(`${this.promotionUrl}/${id}`);
  }

  updatePromotion(id: number, promotion: Promotion): Observable<Promotion>
  {
    return this.http.put<Promotion>(`${this.promotionUrl}/${id}`, promotion, { headers: { 'Content-Type': 'application/json' } });
  }
}
