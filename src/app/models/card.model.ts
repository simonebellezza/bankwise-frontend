export interface CardResponse {
    id: number,
    cardNumber: string,
    cardType: cardType,
    circuit: string,
    expirationDate: string,
    active: boolean,
    pin: string
}

export interface CardRequestDTO {
    cardType: cardType,
    circuit: Circuit,
    accountId: number
}

export interface TransactionRequestByCardDTO {
    amount: number;
    description:string;
    cardId: number;
    pin:string;
}

export enum cardType {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
    PREPAID = 'PREPAID'
}

export enum Circuit {
    VISA = 'VISA',
    MASTERCARD = 'MASTERCARD',
    AMERICAN_EXPRESS = 'AMERICAN_EXPRESS'
}