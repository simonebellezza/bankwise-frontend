export interface CardResponse {
    id: number,
    cardNumber: string,
    iban: string,
    cardType: cardType,
    circuit: string,
    expirationDate: string,
    active: boolean,
    pin: string
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