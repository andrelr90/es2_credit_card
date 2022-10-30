import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { handleStandardFailure } from '../errors/handler.util';
import { CreateCreditCardDTO, CreateCreditCardRequest, CreditCard, CreditCardId } from './credit_card.model';
import { CreditCardService } from './credit_card.service';

export class CreditCardController {
    private readonly creditCardService: CreditCardService;

    public constructor(creditCardService: CreditCardService) {
        this.creditCardService = creditCardService;
    }

    public async createCreditCard(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const createCreditCardRequest: CreateCreditCardRequest = req.body;
            const creditCard: CreateCreditCardDTO = {
                code: createCreditCardRequest.code,
                current_balance: createCreditCardRequest.current_balance,
                best_by: createCreditCardRequest.best_by,
                purpose: createCreditCardRequest.purpose,
            };
            const createdCardId: CreditCardId = await this.creditCardService.createCreditCard(creditCard);
            return res.status(200).json({ success: true, data: { id: createdCardId } });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }

    public async getCreditCardById(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const creditCardId = req.params.creditCardId;
            if (creditCardId === undefined) {
                throw new Error('Id de cartao invalido');
            }
            const creditCard: CreditCard = await this.creditCardService.getCreditCardById(creditCardId);
            return res.status(200).json({ success: true, data: creditCard });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }

    public async getAllCreditCards(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const allCreditCards: CreditCard[] = await this.creditCardService.getAllCreditCards();
            return res.status(200).json({ success: true, data: allCreditCards });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }
}

export class CreditCardControllerProvider {
    static create(creditCardService: CreditCardService) {
        return new CreditCardController(creditCardService);
    }
}
