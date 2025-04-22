import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {AppComponent} from '../../app.component';

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
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  constructor(private appComponent: AppComponent) {
  }
  switchToRegister() {
    this.formType = 'register';
  }

  switchToLogin() {
    this.formType = 'login';
  }
  close(){
    this.appComponent.showAuthForm = false;
  }
}
