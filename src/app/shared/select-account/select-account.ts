import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountResponse } from '../../models/account.model';
import { MatIcon } from '@angular/material/icon';
import { AddAccount } from '../../dialog/add-account/add-account';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-select-account',
  imports: [MatIcon],
  templateUrl: './select-account.html',
  styleUrl: './select-account.css',
})
export class SelectAccount implements OnInit {
  accountService = inject(AccountService);
  dialog = inject(MatDialog);
  accounts = signal<AccountResponse[]>([]);

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => this.accounts.set(accounts),
      error: (error) => console.log(error),
    });
  }

  onSelectAccount(accountId: number) {
    this.accountService.getAccountById(accountId);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddAccount);

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          console.log('Account creato:', result);
          this.getAccounts();
        }
      },
    });
  }
}
