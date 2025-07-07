import { HttpClient} from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import {
  TransactionRequestDTO,
  TransactionResponseDTO,
  TransferRequestDTO,
} from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private httpClient = inject(HttpClient);
  private url = 'http://localhost:8080/transaction/';

  getTransactions(id: number) {
    return this.httpClient.get<TransactionResponseDTO[]>(
      this.url + 'transactions/' + id
    );
  }

  deposit(deposit: TransactionRequestDTO, accountId: string) {
    return this.httpClient.post<TransactionResponseDTO>(
      this.url + 'deposit/' + accountId,
      deposit
    );
  }

  transfer(transfer: TransferRequestDTO) {
    return this.httpClient.post<TransactionResponseDTO>(
      this.url + 'transfer',
      transfer
    );
  }

  withdraw(withdrawal: TransactionRequestDTO, accountId: string) {
    return this.httpClient.post<TransactionResponseDTO>(
      this.url + 'withdraw/' + accountId,
      withdrawal
    );
  }
}
