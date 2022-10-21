import { Knex } from 'knex';
import { UserId } from '../users/user.model';
import { CreateCreditCardUseDTO, CreditCardUse } from './credit_card_use.model';

export interface ICreditCardUseDAO {
    createCreditCardUse(creditCardUse: CreateCreditCardUseDTO): Promise<string>;
    getCreditCardUsesByCreditCardId(creditCardId: string): Promise<CreditCardUse[]>;
    getCreditCardUsesByUserId(userId: UserId): Promise<CreditCardUse[]>;
    getAllCreditCardsUses(): Promise<CreditCardUse[]>;
}

export class CreditCardUseDAO implements ICreditCardUseDAO {
    private readonly knex: Knex;

    public constructor(knex: Knex) {
        this.knex = knex;
    }

    public static getTableName(): string {
        return 'credit_cards_use';
    }

    public async createCreditCardUse(creditCardUse: CreateCreditCardUseDTO): Promise<string> {
        const createdCreditCardUse: any[] = await this.knex.transaction(async (trx) => {
            const createdCreditCardUse = await trx<CreditCardUse>(CreditCardUseDAO.getTableName()).insert(
                creditCardUse,
                '*',
            );
            return createdCreditCardUse;
        });
        return createdCreditCardUse[0];
    }

    public async getCreditCardUsesByCreditCardId(creditCardId: string): Promise<CreditCardUse[]> {
        const creditCardUses = await this.knex<CreditCardUse>(CreditCardUseDAO.getTableName()).where(
            'card_id',
            creditCardId,
        );
        if (creditCardUses === undefined) {
            throw new Error('Nao ha usos para esse cartao');
        }
        return creditCardUses;
    }

    public async getCreditCardUsesByUserId(userId: UserId): Promise<CreditCardUse[]> {
        const creditCardUses = await this.knex<CreditCardUse>(CreditCardUseDAO.getTableName()).where('user_id', userId);
        if (creditCardUses === undefined) {
            throw new Error('Nao ha usos para esse usuario');
        }
        return creditCardUses;
    }

    public async getAllCreditCardsUses(): Promise<CreditCardUse[]> {
        const allCreditCardsUses = await this.knex<CreditCardUse>(CreditCardUseDAO.getTableName()).select('*');
        if (allCreditCardsUses === undefined) {
            throw new Error('Nao ha usos de cartoes de credito');
        }
        return allCreditCardsUses;
    }
}

export class CreditCardUseDAOProvider {
    public static create(knex: Knex) {
        return new CreditCardUseDAO(knex);
    }
}
