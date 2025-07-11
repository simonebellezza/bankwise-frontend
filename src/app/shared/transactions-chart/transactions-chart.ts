import { Component, effect, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardStateService } from '../../services/dashboardState.service';
import { MatIcon } from '@angular/material/icon';

Chart.register(...registerables);
@Component({
  selector: 'app-transactions-chart',
  imports: [MatIcon],
  templateUrl: './transactions-chart.html',
  styleUrl: './transactions-chart.css',
})
export class TransactionsChart {
  dashboardService = inject(DashboardStateService);

  transactions = this.dashboardService.transactions$;
  account = this.dashboardService.accountSelected;

  payment = 0;
  deposit = 0;
  withdrawal = 0;
  transfer = 0;

  public config: any = {
    type: 'doughnut',
    data: {
      labels: ['Pagamenti', 'Depositi', 'Prelievi', 'Bonifici'],
      datasets: [
        {
          data: [this.payment, this.deposit, this.withdrawal, this.transfer],
          backgroundColor: [
            'rgb(255, 0, 55)',
            'rgb(0, 153, 255)',
            'rgb(255, 205, 86)',
            'rgb(0, 194, 32)',
          ],
          hoverOffset: 4,
        },
      ],
    },
  };

  chart: any;

  constructor() {
    effect(() => {
      const currentTransactions = this.transactions();

      if (!currentTransactions || currentTransactions.length === 0) {
        return;
      }

      this.payment = currentTransactions
        .filter((t) => t.transactionType === 'PAYMENT')
        .reduce((sum, t) => sum + t.amount, 0);

      this.deposit = currentTransactions
        .filter((t) => t.transactionType === 'DEPOSIT')
        .reduce((sum, t) => sum + t.amount, 0);

      this.withdrawal = currentTransactions
        .filter((t) => t.transactionType === 'WITHDRAWAL')
        .reduce((sum, t) => sum + t.amount, 0);

      this.transfer = currentTransactions
      .filter((t) => t.transactionType === 'TRANSFER')
      .reduce((sum, t) => sum + t.amount, 0);

      this.config.data.datasets[0].data = [
        this.payment,
        this.deposit,
        this.withdrawal,
        this.transfer
      ];

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart('MyChart', this.config);
    });
  }
}
