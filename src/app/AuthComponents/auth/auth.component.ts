import {Component, Input} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-auth',
  imports: [
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './auth.component.html',
  standalone: true,
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  @Input() formType: 'login' | 'register' = 'login';

  switchToRegister() {
    this.formType = 'register';
  }

  switchToLogin() {
    this.formType = 'login';
  }
}
