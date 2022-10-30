import { CreditCard, CreditCardId } from '../credit_cards/credit_card.model';
import { CreditCardService } from '../credit_cards/credit_card.service';
import { UserId } from '../users/user.model';
import { IUserService } from '../users/user.service';
import { CreditCardUse, CreateCreditCardUseDTO, CreditCardUseId } from './credit_card_use.model';
import { ICreditCardUseRepository } from './credit_card_use.repository';

export interface ICreditCardUseService {
    createCreditCardUse(creditCardUse: CreateCreditCardUseDTO): Promise<CreditCardUseId>;
    getCreditCardUsesByCreditCardId(creditCardId: CreditCardId): Promise<CreditCardUse[]>;
    getCreditCardUsesByUserId(userId: UserId): Promise<CreditCardUse[]>;
    getAllCreditCardUses(): Promise<CreditCardUse[]>;
}

class CreditCardUseService implements ICreditCardUseService {
    private readonly creditCardUseRepository: ICreditCardUseRepository;
    private readonly creditCardService: CreditCardService;
    private readonly userService: IUserService;

    public constructor(
        creditCardUseRepository: ICreditCardUseRepository,
        creditCardService: CreditCardService,
        userService: IUserService,
    ) {
        this.creditCardUseRepository = creditCardUseRepository;
        this.creditCardService = creditCardService;
        this.userService = userService;
    }

    public async createCreditCardUse(creditCardUse: CreateCreditCardUseDTO): Promise<CreditCardUseId> {
        const creditCardUsed: CreditCard = await this.creditCardService.getCreditCardById(creditCardUse.credit_card_id);
        await this.userService.getUserById(creditCardUse.user_id);
        if (creditCardUsed.current_balance - creditCardUse.value < 0) {
            throw Error(
                `Esse cartão não pode ser utilizado - valor do uso (R$${creditCardUse.value}) maior que o balanço atual (R$${creditCardUsed.current_balance})`,
            );
        }

        const createdCreditCardUse = await this.creditCardUseRepository.add(creditCardUse);
        return createdCreditCardUse;
    }

    public async getCreditCardUsesByCreditCardId(creditCardId: CreditCardId): Promise<CreditCardUse[]> {
        await this.creditCardService.getCreditCardById(creditCardId);
        const creditCardUses = await this.creditCardUseRepository.getByCreditCardId(creditCardId);
        return creditCardUses;
    }

    public async getCreditCardUsesByUserId(userId: UserId): Promise<CreditCardUse[]> {
        await this.userService.getUserById(userId);
        const creditCardUses = await this.creditCardUseRepository.getByUserId(userId);
        return creditCardUses;
    }

    public async getAllCreditCardUses(): Promise<CreditCardUse[]> {
        const allCreditCardUses = await this.creditCardUseRepository.getAll();
        return allCreditCardUses;
    }
}

export class CreditCardUseServiceProvider {
    static create(
        creditCardUseRepository: ICreditCardUseRepository,
        creditCardService: CreditCardService,
        userService: IUserService,
    ) {
        return new CreditCardUseService(creditCardUseRepository, creditCardService, userService);
    }
}
