import { Injectable, signal, computed } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  selectedAccount = signal<number | null>(0);
  selectedAccountId = computed(() => this.selectedAccount());

  selectAccount(accountId: number) {
    this.selectedAccount.set(accountId);
  }
}