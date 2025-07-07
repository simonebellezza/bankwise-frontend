import { effect, inject, Injectable, signal } from '@angular/core';
import { AccountResponse } from '../models/account.model';
import { CardResponse } from '../models/card.model';
import { TransactionResponseDTO } from '../models/transaction.model';
import { AccountService } from './account.service';
import { CardsService } from './cards.service';
import { TransactionService } from './transaction.service';

@Injectable({ providedIn: 'root' })
export class DashboardStateService {
  private accountsService = inject(AccountService);
  private cardsService = inject(CardsService);
  private transactionService = inject(TransactionService);

  private selectedAccount = signal<AccountResponse | null>(null);
  readonly accountSelected = this.selectedAccount.asReadonly();

  private cards = signal<CardResponse[]>([]);
  readonly cards$ = this.cards.asReadonly();

  private transactions = signal<TransactionResponseDTO[]>([]);
  readonly transactions$ = this.transactions.asReadonly();

  private accounts = signal<AccountResponse[]>([]);
  readonly accounts$ = this.accounts.asReadonly();

  constructor() {
    effect(() => {
      const account = this.selectedAccount();
      if (account?.id) {
        this.loadCards(account.id);
        this.loadTransactions(account.id);
      }
    });

  }

  initDashboard() {
    this.accountsService.getAccounts().subscribe((accounts) => {
      this.accounts.set(accounts);
      if (accounts.length > 0) {
        this.selectAccount(accounts[0]);
      }
    });
  }

  selectAccount(account: AccountResponse) {
    this.selectedAccount.set(account);
  }

  loadAccount(accountId: number) {
    this.accountsService.getAccountById(accountId).subscribe((account) => {
      this.selectedAccount.set(account);
    })
  }

  loadCards(accountId: number) {
    this.cardsService.getCards(accountId).subscribe((cards) => {
      this.cards.set(cards);
    });
  }

  loadTransactions(accountId: number) {
    this.transactionService.getTransactions(accountId).subscribe((tx) => {
      this.transactions.set(tx);
    });
  }

  loadAccounts() {
    this.accountsService.getAccounts().subscribe((accounts) => {
      this.accounts.set(accounts);
    });
  }
}
