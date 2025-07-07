import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { TransactionRequestDTO } from '../../models/transaction.model';
import { MatDialogRef } from '@angular/material/dialog';
import { SidenavQuickActions } from '../../shared/sidenav-quick-actions/sidenav-quick-actions';
import { MatIcon } from '@angular/material/icon';
import { DashboardStateService } from '../../services/dashboardState.service';
import { CardsService } from '../../services/cards.service';
import { TransactionRequestByCardDTO } from '../../models/card.model';

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
      cardService = inject(CardsService);
      private dialogRef = inject(MatDialogRef<SidenavQuickActions>);
    
      cards = this.dashboardService.cards$;
      response = signal('');
    
      myForm = new FormGroup({
        amount: new FormControl(null, [Validators.required, Validators.min(0.01)]),
        description: new FormControl('', [Validators.required]),
        cardId: new FormControl(0, [Validators.required]),
        pin: new FormControl('', [Validators.required]),
      });

  createWithdrawal() {
    const withdrawal: TransactionRequestByCardDTO = {
              amount: this.myForm.value.amount!,
              description: this.myForm.value.description!,
              cardId: this.myForm.value.cardId!,
              pin: this.myForm.value.pin!,
            };
    
         this.cardService.withdrawByCard(withdrawal).subscribe({
          next: () => {
            this.response.set('Prelievo effettuato correttamente');
            this.dashboardService.initDashboard();
          },
          error: (error) => this.response.set(error.error.message),
        });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
