import {Injectable} from '@angular/core';
import {environment} from '../enviroment';
import {HttpClient} from '@angular/common/http';
import {User} from '../DTO/User';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService{
  private authUrl = `${environment.apiUrl}/${environment.authApiUrl}`;
  constructor(private http: HttpClient, private router: Router) {
  }
  login(user: User): Subscription{
    const username = user.username;
    const password = user.password;
    return this.http.post(`${this.authUrl}/login`, { username, password })
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);
        this.router.navigate(['/']).then();
      });
  }
  register(user: User): Observable<boolean>{
    return this.http.post<boolean>(`${this.authUrl}/register`, user);
  }
}
