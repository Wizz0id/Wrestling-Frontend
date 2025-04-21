import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../DTO/User';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AuthService{
  private authUrl = `${environment.apiUrl}/${environment.authApiUrl}`;
  private isAuthenticated:boolean = false;
  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem('token');
  }
  login(user: User): Subscription{
    const username = user.username;
    const password = user.password;
    return this.http.post(`${this.authUrl}/login`, { username, password })
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);
        this.isAuthenticated = true;
        this.router.navigate(['/']).then();
      });
  }
  register(user: User): Observable<boolean>{
    return this.http.post<boolean>(`${this.authUrl}/register`, user);
  }
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
