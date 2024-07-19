import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../feature/auth/services/auth.service';
import { User } from '../../../feature/auth/models/user-model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user?: User;

  constructor(private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {

    this.authService.user()
      .subscribe({
        next: (response) => {
          this.user = response;
        }
      })

      this.user=this.authService.getUser();

  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
