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
  selector: 'app-add-deposit',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    MatInput,
  ],
  templateUrl: './add-deposit.html',
  styleUrl: './add-deposit.css',
})
export class AddDeposit implements OnInit {
  accountService = inject(AccountService);
  transactionService = inject(TransactionService);
  private dialogRef = inject(MatDialogRef<SidenavQuickActions>);

  accounts = signal<AccountResponse[]>([]);
  response = signal('');

  myForm = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    accountId: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => this.accounts.set(accounts),
      error: (error) => console.log(error),
    });
  }

  createDeposit() {
    const depositBody: TransactionRequestDTO = {
      amount: this.myForm.value.amount!,
      description: this.myForm.value.description!,
    };

    const accountId = this.myForm.value.accountId!;

    this.transactionService
      .deposit(depositBody, accountId.toString())
      .subscribe({
        next: (response) => {
          this.response.set('Deposito effettuato con successo!');
        },
        error: (error) => {
          this.response.set(error.error);
        },
      });
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
