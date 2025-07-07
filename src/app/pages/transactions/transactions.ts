import { Component } from '@angular/core';
import { TransactionsList } from "../../shared/transactions-list/transactions-list";

@Component({
  selector: 'app-transactions',
  imports: [TransactionsList],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions {

}
