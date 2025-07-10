import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountResponse } from '../../models/account.model';
import { MatIcon } from '@angular/material/icon';
import { AddAccount } from '../../dialog/add-account/add-account';
import { MatDialog } from '@angular/material/dialog';
import { DashboardStateService } from '../../services/dashboardState.service';

@Component({
  selector: 'app-select-account',
  imports: [MatIcon],
  templateUrl: './select-account.html',
  styleUrl: './select-account.css',
})
export class SelectAccount {
  private dialog = inject(MatDialog);
  private dashboardService = inject(DashboardStateService);

  accounts = this.dashboardService.accounts$;
  selected = this.dashboardService.accountSelected;

  onSelectAccount(account: AccountResponse) {
    this.dashboardService.selectAccount(account);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddAccount);

    dialogRef.afterClosed().subscribe({
      next: (newAccount) => {
        if (newAccount) {
          this.dashboardService.initDashboard();
        }
      },
    });
  }
}
