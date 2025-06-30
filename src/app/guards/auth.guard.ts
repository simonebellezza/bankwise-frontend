import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  private router = inject(Router);

  canActivate(): boolean {
    if (localStorage.getItem("jwt")) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
