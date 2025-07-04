import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SidenavActions } from "../../shared/sidenav-actions/sidenav-actions";
import { SidenavQuickActions } from "../../shared/sidenav-quick-actions/sidenav-quick-actions";

@Component({
  selector: 'app-home',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatToolbarModule,
    MatIcon,
    MatButtonModule,
    RouterModule,
    SidenavActions,
    SidenavQuickActions
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
