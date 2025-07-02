import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { UserResponse } from '../models/user.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  url = 'http://localhost:8080/user/me';

  getUser() {
    return this.httpClient.get<UserResponse>(this.url);
  }
}
