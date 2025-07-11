import { effect, inject, Injectable, signal } from '@angular/core';
import { AccountResponse } from '../models/account.model';
import { CardResponse } from '../models/card.model';
import { TransactionResponseDTO } from '../models/transaction.model';
import { AccountService } from './account.service';
import { CardsService } from './cards.service';
import { TransactionService } from './transaction.service';
import { UserService } from './user.service';
import { UserResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class DashboardStateService {
  private accountsService = inject(AccountService);
  private cardsService = inject(CardsService);
  private transactionService = inject(TransactionService);
  private userService = inject(UserService);

  private selectedAccount = signal<AccountResponse | null>(null);
  readonly accountSelected = this.selectedAccount.asReadonly();

  private cards = signal<CardResponse[]>([]);
  readonly cards$ = this.cards.asReadonly();

  private transactions = signal<TransactionResponseDTO[]>([]);
  readonly transactions$ = this.transactions.asReadonly();

  private accounts = signal<AccountResponse[]>([]);
  readonly accounts$ = this.accounts.asReadonly();

  private user = signal<UserResponse | null>(null);
  readonly user$ = this.user.asReadonly();

  constructor() {
    effect(() => {
      const account = this.selectedAccount();
      if (account?.id) {
        this.loadCards(account.id);
        this.loadTransactions(account.id);
      }
    });
    this.loadUser();
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

  loadUser() {
    this.userService.getUser().subscribe((user) => {
      this.user.set(user);
    })
  }
}
