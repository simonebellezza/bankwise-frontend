export interface AccountResponse {
  id: number;
  iban: string;
  accountNumber: string;
  balance: number;
  currency: Currency;
}

export interface AccountRequestDTO {
  balance: number;
  currency: Currency;
}

export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}