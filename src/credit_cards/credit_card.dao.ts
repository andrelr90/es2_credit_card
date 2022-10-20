import { Knex } from 'knex';
import { CreateCreditCardDTO, CreditCard } from './credit_card.model';

export class CreditCardDAO {
    private readonly knex: Knex;

    public constructor(knex: Knex) {
        this.knex = knex;
    }

    public static getTableName(): string {
        return 'credit_cards';
    }

    public async createCreditCard(creditCard: CreateCreditCardDTO): Promise<string> {
        const createdCreditCard: any[] = await this.knex.transaction(async (trx) => {
            const createdCreditCard = await trx<CreditCard>(CreditCardDAO.getTableName()).insert(creditCard, '*');
            return createdCreditCard;
        });
        return createdCreditCard[0];
    }

    public async getCreditCardById(creditCardId: string): Promise<CreditCard> {
        const creditCard = await this.knex<CreditCard>(CreditCardDAO.getTableName()).where('id', creditCardId).first();
        if (creditCard === undefined) {
            throw new Error('Nao ha cartao de credito com esse id');
        }
        return creditCard;
    }

    public async getCreditCardByCode(creditCardCode: string): Promise<CreditCard> {
        const creditCard = await this.knex<CreditCard>(CreditCardDAO.getTableName())
            .where('code', creditCardCode)
            .first();
        if (creditCard === undefined) {
            throw new Error('Nao ha cartao de credito com esse codigo');
        }
        return creditCard;
    }

    public async getAllCreditCards(): Promise<CreditCard[]> {
        const allCreditCards = await this.knex<CreditCard>(CreditCardDAO.getTableName()).select('*');
        if (allCreditCards === undefined) {
            throw new Error('Nao ha cartoes de credito');
        }
        return allCreditCards;
    }
}

export class CreditCardDAOProvider {
    public static create(knex: Knex) {
        return new CreditCardDAO(knex);
    }
}
