import { CreditCardId } from '../credit_cards/credit_card.model';
import { UserId } from '../users/user.model';
import { ICreditCardUseDAO } from './credit_card_use.dao';
import { CreditCardUse, CreateCreditCardUseDTO, CreditCardUseId } from './credit_card_use.model';

export interface ICreditCardUseRepository {
    add(creditCardUse: CreateCreditCardUseDTO): Promise<CreditCardUseId>;
    getByCreditCardId(creditCardId: CreditCardId): Promise<CreditCardUse[]>;
    getByUserId(userId: UserId): Promise<CreditCardUse[]>;
    getAll(): Promise<CreditCardUse[]>;
}

class CreditCardUseRepository implements ICreditCardUseRepository {
    private readonly creditCardUseDAO: ICreditCardUseDAO;

    public constructor(creditCardUseDAO: ICreditCardUseDAO) {
        this.creditCardUseDAO = creditCardUseDAO;
    }

    public async add(user: CreateCreditCardUseDTO): Promise<CreditCardUseId> {
        return await this.creditCardUseDAO.createCreditCardUse(user);
    }

    public async getByCreditCardId(creditCardId: CreditCardId): Promise<CreditCardUse[]> {
        return await this.creditCardUseDAO.getCreditCardUsesByCreditCardId(creditCardId);
    }

    public async getByUserId(userId: UserId): Promise<CreditCardUse[]> {
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
