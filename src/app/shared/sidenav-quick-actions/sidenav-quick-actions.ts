import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddCard } from '../../dialog/add-card/add-card';
import { AddDeposit } from '../../dialog/add-deposit/add-deposit';
import { AddTransfer } from '../../dialog/add-transfer/add-transfer';
import { AddWithdrawal } from '../../dialog/add-withdrawal/add-withdrawal';
import { AddPayment } from '../../dialog/add-payment/add-payment';

@Component({
  selector: 'app-sidenav-quick-actions',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './sidenav-quick-actions.html',
  styleUrl: './sidenav-quick-actions.css',
})
export class SidenavQuickActions {
  cardDialog = inject(MatDialog);
  paymentDialog = inject(MatDialog);
  depositDialog = inject(MatDialog);
  transferDialog = inject(MatDialog);
  withdrawDialog = inject(MatDialog);

  openCardDialog() {
    this.cardDialog.open(AddCard);
  }

  openPaymentDialog() {
    this.cardDialog.open(AddPayment);
  }
  
  openDepositDialog() {
    this.cardDialog.open(AddDeposit);
  }

  openTransferDialog() {
    this.cardDialog.open(AddTransfer);
  }
  
  openWithdrawDialog() {
    this.cardDialog.open(AddWithdrawal);
  }
}
