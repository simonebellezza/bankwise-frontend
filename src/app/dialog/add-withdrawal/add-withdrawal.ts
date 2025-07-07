import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TransactionService } from '../../services/transaction.service';
import { AccountService } from '../../services/account.service';
import { AccountResponse } from '../../models/account.model';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { TransactionRequestDTO } from '../../models/transaction.model';
import { MatDialogRef } from '@angular/material/dialog';
import { SidenavQuickActions } from '../../shared/sidenav-quick-actions/sidenav-quick-actions';
import { MatIcon } from '@angular/material/icon';
import { DashboardStateService } from '../../services/dashboardState.service';

@Component({
  selector: 'app-add-withdrawal',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    MatInput,
    MatIcon,
  ],
  templateUrl: './add-withdrawal.html',
  styleUrl: './add-withdrawal.css',
})
export class AddWithdrawal {
  dashboardService = inject(DashboardStateService);
  transactionService = inject(TransactionService);
  private dialogRef = inject(MatDialogRef<SidenavQuickActions>);

  accounts = this.dashboardService.accounts$;
  response = signal('');

  myForm = new FormGroup({
    amount: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    description: new FormControl('', [Validators.required]),
    accountId: new FormControl(0, [Validators.required]),
  });

  createWithdrawal() {
    const depositBody: TransactionRequestDTO = {
      amount: this.myForm.value.amount!,
      description: this.myForm.value.description!,
    };

    const accountId = this.myForm.value.accountId!;

    this.transactionService
      .withdraw(depositBody, accountId.toString())
      .subscribe({
        next: () => {
          this.response.set('Prelievo effettuato con successo!');
          this.dashboardService.loadTransactions(accountId);
          this.dashboardService.loadAccount(accountId);
        },
        error: (error) => this.response.set(error.error.message),
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
