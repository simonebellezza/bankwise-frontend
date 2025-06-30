import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CardResponse } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private httpClient = inject(HttpClient);
  private url = 'http://localhost:8080/card'

  getCards() {
    return this.httpClient.get<CardResponse[]>(this.url + '/cards');
  }
}
