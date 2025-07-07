import { Component, inject, OnInit, signal } from '@angular/core';
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
import { MatDialogRef } from '@angular/material/dialog';
import { SidenavQuickActions } from '../../shared/sidenav-quick-actions/sidenav-quick-actions';
import { MatIcon } from '@angular/material/icon';
import { CardsService } from '../../services/cards.service';
import { TransactionRequestByCardDTO } from '../../models/card.model';
import { DashboardStateService } from '../../services/dashboardState.service';

@Component({
  selector: 'app-add-payment',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    MatInput,
  ],
  templateUrl: './add-payment.html',
  styleUrl: './add-payment.css',
})
export class AddPayment {
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

  createPayment() {
    const payment: TransactionRequestByCardDTO = {
      amount: this.myForm.value.amount!,
      description: this.myForm.value.description!,
      cardId: this.myForm.value.cardId!,
      pin: this.myForm.value.pin!,
    };

    this.cardService.payByCard(payment).subscribe({
      next: () => {
        this.response.set('Pagamento effettuato correttamente');
        this.dashboardService.initDashboard();
      },
      error: (error) => this.response.set(error.error.message),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
