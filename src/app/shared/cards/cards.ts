import { Component, effect, inject, input, signal } from '@angular/core';
import { CardResponse } from '../../models/card.model';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AccountService } from '../../services/account.service';
import { MatButtonModule } from '@angular/material/button';
import { DashboardStateService } from '../../services/dashboardState.service';

@Component({
  selector: 'app-cards',
  imports: [ DatePipe, MatIcon, MatButtonModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards{
  dashboardService = inject(DashboardStateService)
  cards = this.dashboardService.cards$;
  cardSelected = signal<CardResponse | null>(null);

  constructor() {
  effect(() => {
    const newCards = this.cards();
    if (newCards.length > 0) {
      this.cardSelected.set(newCards[0]);
    } else {
      this.cardSelected.set(null);
    }
  });
}

  selectCard(card: CardResponse){
    this.cardSelected.set(card);
  }
}
