import { Knex } from 'knex';
import { CREDIT_CARDS_TABLE_NAME } from '../../database/consts/tables.consts';
import { CreateCreditCardDTO, CreditCard, CreditCardId } from './credit_card.model';

export class CreditCardDAO {
    private readonly knex: Knex;

    public constructor(knex: Knex) {
        this.knex = knex;
    }

    private getTableName(): string {
        return CREDIT_CARDS_TABLE_NAME;
    }

    public async createCreditCard(creditCard: CreateCreditCardDTO): Promise<CreditCardId> {
        const createdCreditCard: any[] = await this.knex.transaction(async (trx) => {
            const createdCreditCard = await trx<CreditCard>(this.getTableName()).insert(creditCard, 'id');
            return createdCreditCard;
        });
        return createdCreditCard[0];
    }

    public async getCreditCardById(creditCardId: CreditCardId): Promise<CreditCard> {
        const creditCard = await this.knex<CreditCard>(this.getTableName()).where('id', creditCardId).first();
        if (creditCard === undefined) {
            throw new Error('Nao ha cartao de credito com esse id');
        }
        return creditCard;
    }

    public async getCreditCardByIdTransaction(trx: Knex, creditCardId: CreditCardId): Promise<CreditCard> {
        const creditCard = await trx<CreditCard>(this.getTableName()).where('id', creditCardId).first();
        if (creditCard === undefined) {
            throw new Error('Nao ha cartao de credito com esse codigo');
        }
        return creditCard;
    }

    public async getCreditCardByCode(creditCardCode: string): Promise<CreditCard> {
        const creditCard = await this.knex<CreditCard>(this.getTableName()).where('code', creditCardCode).first();
        if (creditCard === undefined) {
            throw new Error('Nao ha cartao de credito com esse codigo');
        }
        return creditCard;
    }

    public async getAllCreditCards(): Promise<CreditCard[]> {
        const allCreditCards = await this.knex<CreditCard>(this.getTableName()).select('*');
        if (allCreditCards === undefined) {
            throw new Error('Nao ha cartoes de credito');
        }
        return allCreditCards;
    }

    public async useCreditCard(trx: Knex, creditCardId: CreditCardId, value: number) {
        const creditCard = await this.getCreditCardByIdTransaction(trx, creditCardId);
        await trx<CreditCard>(this.getTableName())
            .update({ current_balance: creditCard.current_balance - value })
            .update('updated_at', trx.fn.now())
            .where('id', creditCardId);
    }
}

export class CreditCardDAOProvider {
    public static create(knex: Knex) {
        return new CreditCardDAO(knex);
    }
}
