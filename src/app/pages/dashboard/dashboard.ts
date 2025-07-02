import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountResponse } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { CurrencyPipe } from '@angular/common';
import { TransactionsChart } from '../../shared/transactions-chart/transactions-chart';
import { MatCardModule } from '@angular/material/card';
import { Cards } from '../../shared/cards/cards';
import { MatIcon } from '@angular/material/icon';
import { SelectAccount } from '../../shared/select-account/select-account';
import { TransactionsList } from "../../shared/transactions-list/transactions-list";

@Component({
  selector: 'app-dashboard',
  imports: [
    TransactionsChart,
    CurrencyPipe,
    Cards,
    MatCardModule,
    MatIcon,
    SelectAccount,
    TransactionsList
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private accountService = inject(AccountService);
  account = this.accountService.accountSelected;

  accounts = signal<AccountResponse[]>([]);
  showBalance = signal<boolean>(true);

  ngOnInit() {
    this.getAccounts();
    this.accountService.getAccountById(1);
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => this.accounts.set(accounts),
      error: (error) => console.log(error),
    });
  }

  toggleBalance() {
    this.showBalance.set(!this.showBalance());
  }

}
