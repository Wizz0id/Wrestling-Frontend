import {Injectable} from '@angular/core';
import {environment} from '../enviroment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gimmick} from '../DTO/Gimmick';

@Injectable({
  providedIn: "root"
})
export class GimmickService {
  private gimmickApiUrl = `${environment.api}/${environment.wrestlerApiUrl}`;

  constructor(private http: HttpClient) {
  }

  getGimmicks(wrestlerID: string): Observable<Gimmick[]> {
    return this.http.get<Gimmick[]>(`${this.gimmickApiUrl}/${wrestlerID}/${environment.gimmickApiUrl}`);
  }

  addGimmick(wrestlerID: string, gimmick: Gimmick): Observable<Gimmick> {
    return this.http.post<Gimmick>(`${this.gimmickApiUrl}/${wrestlerID}/${environment.gimmickApiUrl}`, gimmick, { headers: { 'Content-Type': 'application/json' }});
  }
  deleteGimmick(wrestlerID: string, gimmickID: string){
    return this.http.delete(`${this.gimmickApiUrl}/${wrestlerID}/${environment.gimmickApiUrl}/${gimmickID}`);
  }
}
