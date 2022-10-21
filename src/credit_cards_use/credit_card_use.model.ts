import { UserId } from '../users/user.model';

export type CreditCardUse = {
    card_id: string;
    user_id: UserId;
    value: number;
    description: string;
    authorization_code: string;
};

export type CreateCreditCardUseRequest = CreditCardUse;
export type CreateCreditCardUseDTO = CreditCardUse;
