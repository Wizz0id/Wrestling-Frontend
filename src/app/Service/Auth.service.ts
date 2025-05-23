import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../DTO/User';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService{
  private authUrl = `${environment.apiUrl}/${environment.authApiUrl}`;

  private isAuthenticated:boolean = false;
  constructor(private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem('token');
  }
  login(user: User): Subscription{
    const username = user.username;
    const password = user.password;
    return this.http.post(`${this.authUrl}/login`, { username, password })
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', response.role);
        this.isAuthenticated = true;
      });
  }
  register(user: User): Observable<boolean>{
    return this.http.post<boolean>(`${this.authUrl}/register`, user);
  }
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
