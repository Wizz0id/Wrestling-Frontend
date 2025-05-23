import {Component} from '@angular/core';
import {AuthService} from '../../Service/Auth.service';
import {AuthComponent} from '../auth/auth.component';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private authComponent: AuthComponent) {

  }
  login(){
    const username = (document.getElementById('username') as HTMLInputElement).value || '';
    const password = (document.getElementById('password')as HTMLInputElement).value || '';
    if(username != "" && password != ""){
      const user ={
        username: username,
        password: password
      }
      this.authService.login(user);
      this.authComponent.close();
    }
  }
}
