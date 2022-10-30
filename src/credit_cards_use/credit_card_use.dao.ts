import { Knex } from 'knex';
import { CREDIT_CARDS_USES_TABLE_NAME } from '../../database/consts/tables.consts';
import { CreditCardId } from '../credit_cards/credit_card.model';
import { UserId } from '../users/user.model';
import { CreateCreditCardUseDTO, CreditCardUse, CreditCardUseId } from './credit_card_use.model';

export interface ICreditCardUseDAO {
    createCreditCardUse(creditCardUse: CreateCreditCardUseDTO): Promise<CreditCardUseId>;
    getCreditCardUsesByCreditCardId(creditCardId: CreditCardId): Promise<CreditCardUse[]>;
    getCreditCardUsesByUserId(userId: UserId): Promise<CreditCardUse[]>;
    getAllCreditCardsUses(): Promise<CreditCardUse[]>;
}

class CreditCardUseDAO implements ICreditCardUseDAO {
    private readonly knex: Knex;

    public constructor(knex: Knex) {
        this.knex = knex;
    }

    private getTableName(): string {
        return CREDIT_CARDS_USES_TABLE_NAME;
    }

    public async createCreditCardUse(creditCardUse: CreateCreditCardUseDTO): Promise<CreditCardUseId> {
        const createdCreditCardUse: any[] = await this.knex.transaction(async (trx) => {
            const createdCreditCardUse = await trx<CreditCardUse>(this.getTableName()).insert(creditCardUse, 'id');
            return createdCreditCardUse;
        });
        return createdCreditCardUse[0];
    }

    public async getCreditCardUsesByCreditCardId(creditCardId: CreditCardId): Promise<CreditCardUse[]> {
        const creditCardUses = await this.knex<CreditCardUse>(this.getTableName()).where('card_id', creditCardId);
        if (creditCardUses === undefined) {
            throw new Error('Nao ha usos para esse cartao');
        }
        return creditCardUses;
    }

    public async getCreditCardUsesByUserId(userId: UserId): Promise<CreditCardUse[]> {
        const creditCardUses = await this.knex<CreditCardUse>(this.getTableName()).where('user_id', userId);
        if (creditCardUses === undefined) {
            throw new Error('Nao ha usos para esse usuario');
        }
        return creditCardUses;
    }

    public async getAllCreditCardsUses(): Promise<CreditCardUse[]> {
        const allCreditCardsUses = await this.knex<CreditCardUse>(this.getTableName()).select('*');
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
