import { Knex } from 'knex';
import { ICreditCardDAO } from '../../../../src/credit_cards/credit_card.dao';
import { CreditCard } from '../../../../src/credit_cards/credit_card.model';

export class CreditCardDAOMock implements ICreditCardDAO {
    private credit_cards = {
        '1': {
            code: '123456',
            best_by: new Date('2023/05/12'),
            current_balance: 56,
            purpose: 'aereo',
        },
    };

    public async createCreditCard(creditCard: CreditCard): Promise<string> {
        return creditCard.code === '123457' ? '2' : '3';
    }

    public async getCreditCardById(creditCardId: string): Promise<CreditCard> {
        if (creditCardId === '1') {
            return this.credit_cards['1'];
        }
        throw new Error('Nao ha cartao de credito com esse id');
    }

    public async getCreditCardByIdTransaction(trx: Knex, creditCardId: string): Promise<CreditCard> {
        trx;
        if (creditCardId === '1') {
            return this.credit_cards['1'];
        }
        throw new Error('Nao ha cartao de credito com esse codigo');
    }

    public async getCreditCardByCode(creditCardCode: string): Promise<CreditCard> {
        if (creditCardCode === '123456') {
            return this.credit_cards['1'];
        }
        throw new Error('Nao ha cartao de credito com esse codigo');
    }

    public async getAllCreditCards(): Promise<CreditCard[]> {
        return [this.credit_cards['1']];
    }

    public async useCreditCard(trx: Knex, creditCardId: string, value: number): Promise<void> {
        trx;
        creditCardId;
        value;
        return;
    }
}
