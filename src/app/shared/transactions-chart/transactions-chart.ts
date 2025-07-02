import { Component, effect, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TransactionService } from '../../services/transaction.service';
import { TransactionResponseDTO } from '../../models/transaction.model';
import { AccountService } from '../../services/account.service';

Chart.register(...registerables);
@Component({
  selector: 'app-transactions-chart',
  imports: [],
  templateUrl: './transactions-chart.html',
  styleUrl: './transactions-chart.css',
})
export class TransactionsChart {
  private transactionService = inject(TransactionService);
  private accountService = inject(AccountService);
  transactions: TransactionResponseDTO[] = [];
  account = this.accountService.accountSelected;

  payment = 0;
  deposit = 0;
  withdrawal = 0;

  public config: any = {
    type: 'doughnut',
    data: {
      labels: ['Pagamenti', 'Depositi', 'Prelievi'],
      datasets: [
        {
          data: [this.payment, 50, 100],
          backgroundColor: [
            'rgb(255, 0, 55)',
            'rgb(0, 153, 255)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    },
  };

  chart: any;

  constructor() {
    effect(() => {
      const current = this.account();
  
      if (!(current && current.id)) {
        return;
      }
      this.transactionService.getTransactions(current.id).subscribe({
        next: (transactions) => {
          this.transactions = transactions;

          // Calcola i pagamenti
          this.payment = this.transactions
            .filter((t) => t.transactionType === 'PAYMENT')
            .reduce((sum, t) => sum + t.amount, 0);

          // Calcola i depositi
          this.deposit = this.transactions
            .filter((t) => t.transactionType === 'DEPOSIT')
            .reduce((sum, t) => sum + t.amount, 0);

          // Calcola i prelievi
          this.withdrawal = this.transactions
            .filter((t) => t.transactionType === 'WITHDRAWAL')
            .reduce((sum, t) => sum + t.amount, 0);

          // Aggiorna i dati del grafico
          this.config.data.datasets[0].data = [
            this.payment,
            this.deposit,
            this.withdrawal,
          ];

          if (this.chart) {
            this.chart.destroy();
          }

          // Crea il grafico DOPO aver aggiornato i dati
          this.chart = new Chart('MyChart', this.config);
        },
      });
    });
  }
}
