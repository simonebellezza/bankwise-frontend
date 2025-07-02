import { Component, computed, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AccountResponse } from '../../models/account.model';

@Component({
  selector: 'app-home',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatToolbarModule,
    MatIcon,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  userService = inject(UserService);
  router = inject(Router);

  user = signal<UserResponse>({} as UserResponse);

  initials = computed(() => {
    if (this.user() && this.user().firstName && this.user().lastName) {
      return this.user().firstName[0] + this.user().lastName[0];
    }
    return '';
  });

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user.set(user);
      },
      error: (error) => {
        console.error('Error loading user:', error);
      },
    });
  }

  

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }
}
