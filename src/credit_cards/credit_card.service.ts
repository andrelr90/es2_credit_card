import { CreditCard, CreateCreditCardDTO, CreditCardId } from './credit_card.model';
import { ICreditCardRepository } from './credit_card.repository';

export interface ICreditCardService {
    createCreditCard(creditCard: CreateCreditCardDTO): Promise<CreditCardId>;
    getCreditCardById(creditCardId: CreditCardId): Promise<CreditCard>;
    getCreditCardByCode(creditCardCode: string): Promise<CreditCard>;
    getAllCreditCards(): Promise<CreditCard[]>;
}

class CreditCardService implements ICreditCardService {
    private readonly creditCardRepository: ICreditCardRepository;

    public constructor(creditCardRepository: ICreditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    public async createCreditCard(creditCard: CreateCreditCardDTO): Promise<CreditCardId> {
        const createdCreditCard = await this.creditCardRepository.add(creditCard);
        return createdCreditCard;
    }

    public async getCreditCardById(creditCardId: CreditCardId): Promise<CreditCard> {
        const creditCard = await this.creditCardRepository.getById(creditCardId);
        return creditCard;
    }

    public async getCreditCardByCode(creditCardCode: string): Promise<CreditCard> {
        const creditCard = await this.creditCardRepository.getByCode(creditCardCode);
        return creditCard;
    }

    public async getAllCreditCards(): Promise<CreditCard[]> {
        const allCreditCards = await this.creditCardRepository.getAll();
        return allCreditCards;
    }
}

export class CreditCardServiceProvider {
    static create(creditCardRepository: ICreditCardRepository) {
        return new CreditCardService(creditCardRepository);
    }
}
