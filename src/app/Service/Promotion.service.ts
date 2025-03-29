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

  getWrestlers(search?: string): Observable<Promotion[]>{
    const url = search ? `${this.promotionUrl}?search=${search}`: this.promotionUrl;
    return this.http.get<Promotion[]>(url);
  }
}
