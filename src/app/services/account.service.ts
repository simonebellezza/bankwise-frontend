import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccountRequestDTO, AccountResponse } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  httpClient = inject(HttpClient);
  url = 'http://localhost:8080/account/';

  createAccount(account: AccountRequestDTO) {
    return this.httpClient.post<AccountResponse>(this.url + 'create', account);
  }

  getAccounts() {
    return this.httpClient.get<AccountResponse[]>(this.url + 'accounts');
  }

  getAccountById(id: number) {
    return this.httpClient.get<AccountResponse>(this.url + id);
  }
}
