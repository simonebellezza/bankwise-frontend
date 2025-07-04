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

@Component({
  selector: 'app-add-withdrawal',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    MatInput,
    MatIcon
  ],
  templateUrl: './add-withdrawal.html',
  styleUrl: './add-withdrawal.css',
})
export class AddWithdrawal implements OnInit {
  accountService = inject(AccountService);
  transactionService = inject(TransactionService);
  private dialogRef = inject(MatDialogRef<SidenavQuickActions>);

  accounts = signal<AccountResponse[]>([]);
  response = signal('');

  myForm = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    description: new FormControl('', [Validators.required]),
    accountId: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts: AccountResponse[]) => {
        this.accounts.set(accounts);
      },
      error: (error: any) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  createWithdrawal() {
    const depositBody: TransactionRequestDTO = {
      amount: this.myForm.value.amount!,
      description: this.myForm.value.description!,
    };

    const accountId = this.myForm.value.accountId!;

    this.transactionService
      .withdraw(depositBody, accountId)
      .subscribe({
        next: () => {
          this.response.set('Prelievo effettuato con successo!');
        },
        error: (error) => {
          this.response.set(error.error);
          setTimeout(() => {
            this.dialogRef.close();
          }, 1000)
        },
      });
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
