import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';
import { Knex } from 'knex';
import { ICreditCardUseDAO, CreditCardUseDAOProvider } from '../credit_cards_use/credit_card_use.dao';
import {
    ICreditCardUseRepository,
    CreditCardUseRepositoryProvider,
} from '../credit_cards_use/credit_card_use.repository';
import { validateCreateCreditCard } from '../credit_cards/createCreditCard.validators.middlewares';
import {
    ICreditCardUseController,
    CreditCardUseControllerProvider,
} from '../credit_cards_use/credit_card_use.controller';
import { ICreditCardUseService, CreditCardUseServiceProvider } from '../credit_cards_use/credit_card_use.service';
const URI_v1 = '/api/v1';
export const CREDIT_CARDS_USES_ROUTE = URI_v1 + '/credit_cards_use';

export const creditCardUseRouterProvider = (db: Knex): Router => {
    const creditCarUsedDAO: ICreditCardUseDAO = CreditCardUseDAOProvider.create(db);
    const creditCardUseRepository: ICreditCardUseRepository = CreditCardUseRepositoryProvider.create(creditCarUsedDAO);
    const creditCardUseService: ICreditCardUseService = CreditCardUseServiceProvider.create(creditCardUseRepository);
    const creditCardUseController: ICreditCardUseController =
        CreditCardUseControllerProvider.create(creditCardUseService);

    const router: Router = setupRoutes(creditCardUseController);

    return router;
};

function setupRoutes(creditCardUseController: ICreditCardUseController) {
    const router: Router = Router();

    router.post(CREDIT_CARDS_USES_ROUTE, checkSchema(validateCreateCreditCard), async (req: Request, res: Response) => {
        return await creditCardUseController.createCreditCardUse(req, res);
    });
    router.get(CREDIT_CARDS_USES_ROUTE, async (req: Request, res: Response) => {
        return await creditCardUseController.getAllCreditCardsUses(req, res);
    });
    router.get(CREDIT_CARDS_USES_ROUTE + '/credit_cards/:creditCardId', async (req: Request, res: Response) => {
        return await creditCardUseController.getCreditCardUsesByCreditCardId(req, res);
    });
    router.get(CREDIT_CARDS_USES_ROUTE + '/users/:userId', async (req: Request, res: Response) => {
        return await creditCardUseController.getCreditCardUsesByUserId(req, res);
    });
    return router;
}
