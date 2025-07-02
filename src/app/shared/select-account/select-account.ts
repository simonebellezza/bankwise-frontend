import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountResponse } from '../../models/account.model';

@Component({
  selector: 'app-select-account',
  imports: [],
  templateUrl: './select-account.html',
  styleUrl: './select-account.css',
})
export class SelectAccount implements OnInit {
  accountService = inject(AccountService);
  accounts = signal<AccountResponse[]>([]);

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => this.accounts.set(accounts),
      error: (error) => console.log(error),
    });
  }

  onSelectAccount(accountId: number) {
    this.accountService.getAccountById(accountId);
  }
}
