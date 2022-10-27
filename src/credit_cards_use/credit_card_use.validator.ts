import { CreditCardUse } from './credit_card_use.model';

export const validateCreditCardUse = (creditCardUse: CreditCardUse): void => {
    if (parseInt(creditCardUse.user_id) <= 0) {
        throw Error('Id de usuário inválido');
    }
    if (parseInt(creditCardUse.credit_card_id) <= 0) {
        throw Error('Id de cartão de crédito inválido');
    }
    if (creditCardUse.value <= 0) {
        throw Error('Valor de uso não é maior ou igual a zero');
    }
};
