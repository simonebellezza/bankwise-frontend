import { Component, effect, inject, Input, input, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CardsService } from '../../services/cards.service';
import { CardResponse } from '../../models/card.model';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AccountService } from '../../services/account.service';
import { AccountResponse } from '../../models/account.model';

@Component({
  selector: 'app-cards',
  imports: [MatTabsModule, DatePipe, MatIcon],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards{
  private cardsService = inject(CardsService);
  accountService = inject(AccountService);
  
  cards = signal<CardResponse[]>([]);
  account = this.accountService.accountSelected;

  constructor() {
    effect(() => {
      const current = this.account();
      if (current && current.id) {
        this.cardsService.getCards(current.id).subscribe({
          next: (cards) => this.cards.set(cards),
          error: (error) => console.error(error),
        });
      }
    });
  }
}
