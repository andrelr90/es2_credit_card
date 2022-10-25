import { UserId } from '../users/user.model';
import { ICreditCardUseDAO } from './credit_card_use.dao';
import { CreditCardUse, CreateCreditCardUseDTO } from './credit_card_use.model';

export interface ICreditCardUseRepository {
    add(creditCardUse: CreateCreditCardUseDTO): Promise<string>;
    getByCreditCardId(creditCardId: string): Promise<CreditCardUse[]>;
    getByUserId(userId: UserId): Promise<CreditCardUse[]>;
    getAll(): Promise<CreditCardUse[]>;
}

class CreditCardUseRepository implements ICreditCardUseRepository {
    private readonly creditCardUseDAO: ICreditCardUseDAO;

    public constructor(creditCardUseDAO: ICreditCardUseDAO) {
        this.creditCardUseDAO = creditCardUseDAO;
    }

    public async add(user: CreateCreditCardUseDTO): Promise<string> {
        return await this.creditCardUseDAO.createCreditCardUse(user);
    }

    public async getByCreditCardId(creditCardId: string): Promise<CreditCardUse[]> {
        return await this.creditCardUseDAO.getCreditCardUsesByCreditCardId(creditCardId);
    }

    public async getByUserId(userId: string): Promise<CreditCardUse[]> {
        return await this.creditCardUseDAO.getCreditCardUsesByCreditCardId(userId);
    }

    public async getAll(): Promise<CreditCardUse[]> {
        return await this.creditCardUseDAO.getAllCreditCardsUses();
    }
}

export class CreditCardUseRepositoryProvider {
    static create(creditCardDAO: ICreditCardUseDAO) {
        return new CreditCardUseRepository(creditCardDAO);
    }
}
