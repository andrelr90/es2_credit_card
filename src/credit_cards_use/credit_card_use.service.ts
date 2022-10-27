import { CreditCardService } from '../credit_cards/credit_card.service';
import { UserId } from '../users/user.model';
import { IUserService } from '../users/user.service';
import { CreditCardUse, CreateCreditCardUseDTO } from './credit_card_use.model';
import { ICreditCardUseRepository } from './credit_card_use.repository';

export interface ICreditCardUseService {
    createCreditCardUse(creditCardUse: CreateCreditCardUseDTO): Promise<string>;
    getCreditCardUsesByCreditCardId(creditCardId: string): Promise<CreditCardUse[]>;
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

    public async createCreditCardUse(creditCardUse: CreateCreditCardUseDTO): Promise<string> {
        await this.creditCardService.getCreditCardById(creditCardUse.credit_card_id);
        await this.userService.getUserById(creditCardUse.user_id);

        const createdCreditCardUse = await this.creditCardUseRepository.add(creditCardUse);
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
    static create(
        creditCardUseRepository: ICreditCardUseRepository,
        creditCardService: CreditCardService,
        userService: IUserService,
    ) {
        return new CreditCardUseService(creditCardUseRepository, creditCardService, userService);
    }
}
