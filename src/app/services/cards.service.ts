import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CardRequestDTO,
  CardResponse,
  TransactionRequestByCardDTO,
} from '../models/card.model';
import { TransactionResponseDTO } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private httpClient = inject(HttpClient);
  private url = 'http://localhost:8080/card/';

  getCards(id: number) {
    return this.httpClient.get<CardResponse[]>(this.url + id);
  }

  addCard(card: CardRequestDTO) {
    return this.httpClient.post<CardResponse>(this.url + 'create', card);
  }

  payByCard(transactionByCard: TransactionRequestByCardDTO) {
    return this.httpClient.post<TransactionResponseDTO>(
      this.url + 'payment',
      transactionByCard
    );
  }

  depositByCard(transactionByCard: TransactionRequestByCardDTO) {
    return this.httpClient.post<TransactionResponseDTO>(
      this.url + 'deposit',
      transactionByCard
    );
  }

  withdrawByCard(transactionByCard: TransactionRequestByCardDTO) {
    return this.httpClient.post<TransactionResponseDTO>(
      this.url + 'withdraw',
      transactionByCard
    );
  }
}
