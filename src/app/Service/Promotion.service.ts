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
    const url = search ? `${this.promotionUrl}?search=${search}`: this.promotionUrl;
    return this.http.get<Promotion[]>(url);
  }

  updatePromotion(id: number, promotion: Promotion)
  {
    this.http.put(`${this.promotionUrl}/${id}`, promotion, { headers: { 'Content-Type': 'application/json' } }).subscribe();
  }
}
