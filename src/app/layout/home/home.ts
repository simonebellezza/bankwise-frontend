import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';

@Component({
  selector: 'app-home',
  imports: [MatSidenavModule, RouterOutlet, MatToolbarModule, MatIcon],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  userService = inject(UserService);

  user = signal<UserResponse>({} as UserResponse);

  initials = computed(() => {
    if (this.user() && this.user().firstName && this.user().lastName) {
      return this.user().firstName[0] + this.user().lastName[0];
    }
    return '';
  });

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user.set(user);
        console.log('User loaded:', user);
      },
      error: (error) => {
        console.error('Error loading user:', error);
      },
    });
  }
}
