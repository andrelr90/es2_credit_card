import { UserId } from '../users/user.model';
import { CreditCardUse, CreateCreditCardUseDTO } from './credit_card_use.model';
import { ICreditCardUseRepository } from './credit_card_use.repository';

export interface ICreditCardUseService {
    createCreditCardUse(creditCardUse: CreateCreditCardUseDTO): Promise<string>;
    getCreditCardUsesByCreditCardId(creditCardId: string): Promise<CreditCardUse[]>;
    getCreditCardUsesByUserId(userId: UserId): Promise<CreditCardUse[]>;
    getAllCreditCardUses(): Promise<CreditCardUse[]>;
}

export class CreditCardUseService implements ICreditCardUseService {
    private readonly creditCardUseRepository: ICreditCardUseRepository;

    public constructor(creditCardUseRepository: ICreditCardUseRepository) {
        this.creditCardUseRepository = creditCardUseRepository;
    }

    public async createCreditCardUse(creditCard: CreateCreditCardUseDTO): Promise<string> {
        const createdCreditCardUse = await this.creditCardUseRepository.add(creditCard);
        return createdCreditCardUse;
    }

    public async getCreditCardUsesByCreditCardId(creditCardId: string): Promise<CreditCardUse[]> {
        const creditCardUses = await this.creditCardUseRepository.getByCreditCardId(creditCardId);
        return creditCardUses;
    }

    public async getCreditCardUsesByUserId(userId: UserId): Promise<CreditCardUse[]> {
        const creditCardUses = await this.creditCardUseRepository.getByUserId(userId);
        return creditCardUses;
    }

    public async getAllCreditCardUses(): Promise<CreditCardUse[]> {
        const allCreditCardUses = await this.creditCardUseRepository.getAll();
        return allCreditCardUses;
    }
}

export class CreditCardUseServiceProvider {
    static create(creditCardUseRepository: ICreditCardUseRepository) {
        return new CreditCardUseService(creditCardUseRepository);
    }
}
