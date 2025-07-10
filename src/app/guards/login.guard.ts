import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private router = inject(Router);

  canActivate(): boolean {
    if (localStorage.getItem('jwt')) {
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
}