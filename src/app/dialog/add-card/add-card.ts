import { Component, inject, signal, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CardRequestDTO, CardResponse, cardType, Circuit } from '../../models/card.model';
import { AccountResponse } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { CardsService } from '../../services/cards.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DashboardStateService } from '../../services/dashboardState.service';

@Component({
  selector: 'app-add-card',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIcon],
  templateUrl: './add-card.html',
  styleUrl: './add-card.css',
})
export class AddCard {
  dashboardService = inject(DashboardStateService);
  private cardService = inject(CardsService);
  private dialogRef = inject(MatDialogRef<CardResponse>);

  accounts = this.dashboardService.accounts$;
  response = signal('');

  myForm = new FormGroup({
    cardType: new FormControl<cardType | null>(null, [Validators.required]),
    circuit: new FormControl<Circuit | null>(null, [Validators.required]),
    accountId: new FormControl<number | null>(null, [Validators.required]),
  });

  createCard() {
    const cardData: CardRequestDTO = {
      cardType: this.myForm.value.cardType!,
      circuit: this.myForm.value.circuit!,
      accountId: this.myForm.value.accountId!,
    };

    this.cardService.addCard(cardData).subscribe({
      next: (card) => {
        this.response.set('Carta bancaria attivata! Conserva il pin in un luogo sicuro: ' + card.pin);
        this.dashboardService.loadCards(cardData.accountId);
      },
      error: (error) => {
        this.response.set(error.error.message);
      },
    });
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
