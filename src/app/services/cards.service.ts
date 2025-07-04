import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CardRequestDTO, CardResponse } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private httpClient = inject(HttpClient);
  private url = 'http://localhost:8080/card/'

  getCards(id: number) {
    return this.httpClient.get<CardResponse[]>(this.url + id);
  }

  addCard(card: CardRequestDTO) {
    return this.httpClient.post<CardResponse>(this.url + "create", card);
  }
}
