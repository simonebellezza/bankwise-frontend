import { Component, effect, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { DashboardStateService } from '../../services/dashboardState.service';

@Component({
  selector: 'app-transactions-list',
  imports: [MatListModule, MatIconModule, CurrencyPipe, DatePipe],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.css',
})
export class TransactionsList {
  dashboardService = inject(DashboardStateService);

  account = this.dashboardService.accountSelected
  transactions = this.dashboardService.transactions$;

  constructor() {
  }
}
