import { CreditCardDAO } from './credit_card.dao';
import { CreditCard, CreateCreditCardDTO } from './credit_card.model';

export class CreditCardRepository {
    private readonly creditCardDAO: CreditCardDAO;

    public constructor(creditCardDAO: CreditCardDAO) {
        this.creditCardDAO = creditCardDAO;
    }

    public async add(creditCard: CreateCreditCardDTO): Promise<string> {
        return await this.creditCardDAO.createCreditCard(creditCard);
    }

    public async getById(creditCardId: string): Promise<CreditCard> {
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
    static create(creditCardDAO: CreditCardDAO) {
        return new CreditCardRepository(creditCardDAO);
    }
}
