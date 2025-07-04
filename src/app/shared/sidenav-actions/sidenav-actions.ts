import { Component, inject, signal, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidenav-actions',
  imports: [ MatIcon, RouterLink, MatButtonModule],
  templateUrl: './sidenav-actions.html',
  styleUrl: './sidenav-actions.css'
})
export class SidenavActions {
  @Input() drawer!: MatSidenav;
  
  userService = inject(UserService);
  user = signal<UserResponse>({} as UserResponse);

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
}
