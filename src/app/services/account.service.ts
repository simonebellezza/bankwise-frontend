import { HttpClient } from "@angular/common/http";
import { Injectable, signal, computed, inject } from "@angular/core";
import { AccountResponse } from "../models/account.model";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  httpClient = inject(HttpClient);
  url = 'http://localhost:8080/account/';

  private account = signal<AccountResponse>({} as AccountResponse);
  accountSelected = this.account.asReadonly();

  getAccounts() {
    return this.httpClient.get<AccountResponse[]>(this.url + 'accounts');
  }

  getAccountById(id: number) {
    return this.httpClient.get<AccountResponse>(this.url + id).subscribe({
      next: (acc) => this.account.set(acc)
    });
  }

}