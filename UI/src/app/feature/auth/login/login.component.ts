import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../models/login-request-model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {

    this.model = {
      email: '',
      password: ''
    }

  }

  onFormSubmit(): void {

    this.authService.login(this.model)
      .subscribe({
        next: (response) => {

          //Set Auth Cookie

          this.cookieService.set('Authorization',
            `Bearer ${response.token}`,
            undefined,
            '/',
            undefined,
            true,
            'Strict');

          // Set User
          this.authService.setUser(
            {
              email: response.email,
              roles: response.roles
            }
          );

          // Redirect back to Home
          this.router.navigateByUrl('/');
        }
      })

  }

}
