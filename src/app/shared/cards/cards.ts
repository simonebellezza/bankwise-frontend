import { Component, effect, inject, signal } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CardResponse } from '../../models/card.model';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AccountService } from '../../services/account.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cards',
  imports: [ DatePipe, MatIcon, MatButtonModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards{
  private cardsService = inject(CardsService);
  accountService = inject(AccountService);
  
  cards = signal<CardResponse[]>([]);
  cardSelected = signal<CardResponse>({} as CardResponse);
  account = this.accountService.accountSelected;

  constructor() {
    effect(() => {
      const current = this.account();
      if (current && current.id) {
        this.cardsService.getCards(current.id).subscribe({
          next: (cards) => {
            this.cards.set(cards);
            if(cards.length > 0){
              this.cardSelected.set(cards[0])
            }
          },
          error: (error) => console.error(error),
        });
      }
    });
  }

  selectCard(card: CardResponse){
    this.cardSelected.set(card);
  }
}
