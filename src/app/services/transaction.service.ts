import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TransactionResponseDTO } from "../models/transaction.model";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private httpClient = inject(HttpClient);
    private url = 'http://localhost:8080/transaction';

    getTransactions(id: number) {
        return this.httpClient.get<TransactionResponseDTO[]>(this.url + '/transactions/' + id);
    }
}