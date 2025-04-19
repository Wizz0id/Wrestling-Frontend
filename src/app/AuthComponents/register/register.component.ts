import { Component } from '@angular/core';
import {AuthService} from '../../Service/Auth.service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {
  }
  register(){
    const username = (document.getElementById('username') as HTMLInputElement).value || '';
    const password = (document.getElementById('password')as HTMLInputElement).value || '';
    const re_password = (document.getElementById('re-password')as HTMLInputElement).value || '';
    if(re_password != password){
      return;
    }
    if(username != '' && password != '' && re_password != ''){
      const user ={
        username: username,
        password: password
      }
      this.authService.register(user).subscribe(resp => console.log(resp));
    }
  }
}
