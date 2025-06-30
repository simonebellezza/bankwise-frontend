import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserLoginDTO, UserRegisterDTO } from '../models/user.model';
import { catchError, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private userService = inject(UserService);
  private url = 'http://localhost:8080/user/';
  private httpClient = inject(HttpClient);

  register(user: UserRegisterDTO) {
    return this.httpClient.post(this.url + 'register', user);
  }

  login(user: UserLoginDTO) {
    return this.httpClient
      .post<{ token: string }>(this.url + 'login', user).pipe(
        tap((response) => {
          localStorage.setItem('jwt', response.token)
        })
      );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

}
