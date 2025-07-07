import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserResponse } from '../models/user.model';

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
