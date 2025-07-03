import { Component, effect, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { AccountService } from '../../services/account.service';
import { TransactionResponseDTO } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions-list',
  imports: [MatListModule, MatIconModule, CurrencyPipe, DatePipe],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.css',
})
export class TransactionsList {
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);

  account = this.accountService.accountSelected;
  transactions = signal<TransactionResponseDTO[]>([]);

  constructor() {
    effect(() => {
      const current = this.account();
      if (current && current.id) {
        this.transactionService.getTransactions(current.id).subscribe({
          next: (transactions) => this.transactions.set(transactions),
          error: (error) => console.log(error),
        });
      }
    });
  }
}
