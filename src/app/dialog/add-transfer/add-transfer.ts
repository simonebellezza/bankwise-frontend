import { Component, inject, signal } from '@angular/core';
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
import { TransferRequestDTO } from '../../models/transaction.model';
import { MatDialogRef } from '@angular/material/dialog';
import { SidenavQuickActions } from '../../shared/sidenav-quick-actions/sidenav-quick-actions';
import { MatIcon } from '@angular/material/icon';
import { DashboardStateService } from '../../services/dashboardState.service';

@Component({
  selector: 'app-add-transfer',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    MatInput,
  ],
  templateUrl: './add-transfer.html',
  styleUrl: './add-transfer.css',
})
export class AddTransfer {
  dashboardService = inject(DashboardStateService);
  transactionService = inject(TransactionService);
  private dialogRef = inject(MatDialogRef<SidenavQuickActions>);

  accounts = this.dashboardService.accounts$;
  response = signal('');

  myForm = new FormGroup({
    amount: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    description: new FormControl('', [Validators.required]),
    senderAccountId: new FormControl(0, [Validators.required]),
    iban: new FormControl('', [Validators.required]),
  });

  createTransfer() {
    const transfer: TransferRequestDTO = {
      amount: this.myForm.value.amount!,
      description: this.myForm.value.description!,
      senderAccountId: this.myForm.value.senderAccountId!,
      receiverIban: this.myForm.value.iban!,
    };

    this.transactionService.transfer(transfer).subscribe({
      next: () => {
        this.response.set('Bonifico effettuato!');
        this.dashboardService.initDashboard();
      },
      error: (error) => this.response.set(error.error.message),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
