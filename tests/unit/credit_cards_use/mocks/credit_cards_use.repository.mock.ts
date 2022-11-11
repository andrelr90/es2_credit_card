import { ICreditCardUseDAO } from '../../../../src/credit_cards_use/credit_card_use.dao';
import { CreditCardUse } from '../../../../src/credit_cards_use/credit_card_use.model';

export class CreditCardUseDAOMock implements ICreditCardUseDAO {
    private uses = {
        '1': {
            credit_card_id: '1',
            user_id: '1',
            value: 10.2,
            description: 'Teste',
            authorization_code: 'Teste',
        },
    };

    public async createCreditCardUse(creditCardUse: CreditCardUse): Promise<string> {
        if (creditCardUse['user_id'] == '1') {
            return '2';
        }
        return '3';
    }
    public async getCreditCardUsesByCreditCardId(creditCardId: string): Promise<CreditCardUse[]> {
        if (creditCardId === '1') {
            return [this.uses['1']];
        }
        throw new Error('Nao ha usos para esse cartao');
    }
    public async getCreditCardUsesByUserId(userId: string): Promise<CreditCardUse[]> {
        if (userId === '1') {
            return [this.uses['1']];
        }
        throw new Error('Nao ha usos para esse usuario');
    }
    public async getAllCreditCardsUses(): Promise<CreditCardUse[]> {
        return [this.uses['1']];
    }
}
