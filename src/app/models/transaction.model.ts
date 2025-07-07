export interface TransactionResponseDTO {
  id: number;
  transactionType: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
}

export interface TransactionRequestDTO {
  amount: number;
  description: string;
}

export interface TransferRequestDTO {
  amount: number;
  description: string;
  senderAccountId: number;
  receiverIban: string;
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT',
}