import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { handleStandardFailure } from '../errors/handler.util';
import { CreateCreditCardUseDTO, CreateCreditCardUseRequest, CreditCardUse } from './credit_card_use.model';
import { CreditCardUseService } from './credit_card_use.service';

export class CreditCardUseController {
    private readonly creditCardUseService: CreditCardUseService;

    public constructor(creditCardUseService: CreditCardUseService) {
        this.creditCardUseService = creditCardUseService;
    }

    public async createCreditCardUse(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const createCreditCardRequest: CreateCreditCardUseRequest = req.body;
            const creditCardUse: CreateCreditCardUseDTO = {
                card_id: createCreditCardRequest.card_id,
                user_id: createCreditCardRequest.user_id,
                value: createCreditCardRequest.value,
                description: createCreditCardRequest.description,
                authorization_code: createCreditCardRequest.authorization_code,
            };
            const createdCardId: string = await this.creditCardUseService.createCreditCard(creditCardUse);
            return res.status(200).json({ success: true, data: { id: createdCardId } });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }

    public async getCreditCardUsesByCreditCardId(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const creditCardId = req.params.creditCardId;
            if (creditCardId === undefined) {
                throw new Error('Id de cartao invalido');
            }
            const creditCardUses: CreditCardUse[] = await this.creditCardUseService.getCreditCardUsesByCreditCardId(
                creditCardId,
            );
            return res.status(200).json({ success: true, data: creditCardUses });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }

    public async getCreditCardUsesByUserId(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const userId = req.params.userId;
            if (userId === undefined) {
                throw new Error('Id de usuario invalido');
            }
            const creditCardUses: CreditCardUse[] = await this.creditCardUseService.getCreditCardUsesByUserId(userId);
            return res.status(200).json({ success: true, data: creditCardUses });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }

    public async getAllCreditCardsUses(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const allCreditCardsUses: CreditCardUse[] = await this.creditCardUseService.getAllCreditCardsUses();
            return res.status(200).json({ success: true, data: allCreditCardsUses });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }
}

export class CreditCardUseControllerProvider {
    static create(creditCardUseService: CreditCardUseService) {
        return new CreditCardUseController(creditCardUseService);
    }
}
