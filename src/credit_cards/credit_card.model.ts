export type CreditCard = {
    code: string;
    best_by: Date;
    current_balance: number;
    purpose: string;
};

export type CreateCreditCardRequest = CreditCard;
export type CreateCreditCardDTO = CreditCard;
