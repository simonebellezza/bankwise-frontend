import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TransactionsChart } from '../../shared/transactions-chart/transactions-chart';
import { MatCardModule } from '@angular/material/card';
import { Cards } from '../../shared/cards/cards';
import { MatIcon } from '@angular/material/icon';
import { SelectAccount } from '../../shared/select-account/select-account';
import { TransactionsList } from '../../shared/transactions-list/transactions-list';
import { DashboardStateService } from '../../services/dashboardState.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    TransactionsChart,
    CurrencyPipe,
    Cards,
    MatCardModule,
    MatIcon,
    SelectAccount,
    TransactionsList,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {
  dashboardService = inject(DashboardStateService);
  showBalance = signal<boolean>(true);

  accounts = this.dashboardService.accounts$;
  account = this.dashboardService.accountSelected;
  transactions = this.dashboardService.transactions$;
  cards = this.dashboardService.cards$;

  ngOnInit() {
    this.dashboardService.initDashboard()
  }


  toggleBalance() {
    this.showBalance.set(!this.showBalance());
  }
}
