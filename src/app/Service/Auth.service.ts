import {Injectable} from '@angular/core';
import {environment} from '../enviroment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../DTO/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService{
  private authUrl = `${environment.apiUrl}/${environment.authApiUrl}`;
  constructor(private http: HttpClient) {
  }
  login(user: User): Observable<User>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(`${this.authUrl}/login`, user, { headers, withCredentials: true });
  }
  register(user: User): Observable<boolean>{
    const url = `${this.authUrl}/register`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<boolean>(url, user, { headers, withCredentials: true });
  }
}
