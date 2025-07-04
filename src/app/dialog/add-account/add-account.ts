import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';
import { AccountRequestDTO, Currency } from '../../models/account.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-account',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatSelect,
    MatOption,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './add-account.html',
  styleUrl: './add-account.css',
})
export class AddAccount {
  accountService = inject(AccountService);
  private dialogRef = inject(MatDialogRef<AddAccount>);
  response = signal("");

  myForm = new FormGroup({
    balance: new FormControl(null, [Validators.required, Validators.min(0)]),
    currency: new FormControl<Currency>(Currency.EUR, [Validators.required]),
  });

  createAccount() {
    if (this.myForm.valid) {
      const account: AccountRequestDTO = {
        balance: this.myForm.value.balance!,
        currency: this.myForm.value.currency!,
      };

      this.accountService.createAccount(account).subscribe({
        next: () => {
          this.response.set("Conto attivato regolarmente!");
        },
        error: (error) => {
          this.response.set(error.error);
        },
      });
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }
  
}
