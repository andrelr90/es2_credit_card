import { CreditCard, CreateCreditCardDTO } from './credit_card.model';
import { CreditCardRepository } from './credit_card.repository';

export class CreditCardService {
    private readonly creditCardRepository: CreditCardRepository;

    public constructor(creditCardRepository: CreditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    public async createCreditCard(creditCard: CreateCreditCardDTO): Promise<string> {
        const createdCreditCard = await this.creditCardRepository.add(creditCard);
        return createdCreditCard;
    }

    public async getCreditCardById(creditCardId: string): Promise<CreditCard> {
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
    static create(creditCardRepository: CreditCardRepository) {
        return new CreditCardService(creditCardRepository);
    }
}
