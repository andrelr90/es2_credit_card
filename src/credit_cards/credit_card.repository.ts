import { ICreditCardDAO } from './credit_card.dao';
import { CreditCard, CreateCreditCardDTO, CreditCardId } from './credit_card.model';

export interface ICreditCardRepository {
    add(creditCard: CreateCreditCardDTO): Promise<CreditCardId>;
    getById(creditCardId: CreditCardId): Promise<CreditCard>;
    getByCode(creditCardCode: string): Promise<CreditCard>;
    getAll(): Promise<CreditCard[]>;
}

class CreditCardRepository implements ICreditCardRepository {
    private readonly creditCardDAO: ICreditCardDAO;

    public constructor(creditCardDAO: ICreditCardDAO) {
        this.creditCardDAO = creditCardDAO;
    }

    public async add(creditCard: CreateCreditCardDTO): Promise<CreditCardId> {
        return await this.creditCardDAO.createCreditCard(creditCard);
    }

    public async getById(creditCardId: CreditCardId): Promise<CreditCard> {
        return await this.creditCardDAO.getCreditCardById(creditCardId);
    }

    public async getByCode(creditCardCode: string): Promise<CreditCard> {
        return await this.creditCardDAO.getCreditCardByCode(creditCardCode);
    }

    public async getAll(): Promise<CreditCard[]> {
        return await this.creditCardDAO.getAllCreditCards();
    }
}

export class CreditCardRepositoryProvider {
    static create(creditCardDAO: ICreditCardDAO) {
        return new CreditCardRepository(creditCardDAO);
    }
}
