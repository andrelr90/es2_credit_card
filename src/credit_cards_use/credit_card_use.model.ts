import { CreditCardId } from '../credit_cards/credit_card.model';
import { UserId } from '../users/user.model';

export type CreditCardUse = {
    credit_card_id: CreditCardId;
    user_id: UserId;
    value: number;
    description: string;
    authorization_code: string;
};

export type CreditCardUseId = string;
export type CreateCreditCardUseRequest = CreditCardUse;
export type CreateCreditCardUseDTO = CreditCardUse;
