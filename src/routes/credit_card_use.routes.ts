import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';
import { Knex } from 'knex';
import { ICreditCardUseDAO, CreditCardUseDAOProvider } from '../credit_cards_use/credit_card_use.dao';
import {
    ICreditCardUseRepository,
    CreditCardUseRepositoryProvider,
} from '../credit_cards_use/credit_card_use.repository';
import { validateCreateCreditCardUse } from '../credit_cards_use/createCreditCardUse.validators.middlewares';
import {
    ICreditCardUseController,
    CreditCardUseControllerProvider,
} from '../credit_cards_use/credit_card_use.controller';
import { ICreditCardUseService, CreditCardUseServiceProvider } from '../credit_cards_use/credit_card_use.service';
import { IUserService, UserServiceProvider } from '../users/user.service';
import { IUserRepository, UserRepositoryProvider } from '../users/user.repository';
import { IUserDAO, UserDAOProvider } from '../users/user.dao';
import { CreditCardDAO, CreditCardDAOProvider } from '../credit_cards/credit_card.dao';
import { CreditCardRepository, CreditCardRepositoryProvider } from '../credit_cards/credit_card.repository';
import { CreditCardService, CreditCardServiceProvider } from '../credit_cards/credit_card.service';
const URI_v1 = '/api/v1';
export const CREDIT_CARDS_USES_ROUTE = URI_v1 + '/credit_cards_use';

export const creditCardUseRouterProvider = (db: Knex): Router => {
    const creditCardDAO: CreditCardDAO = CreditCardDAOProvider.create(db);
    const creditCardRepository: CreditCardRepository = CreditCardRepositoryProvider.create(creditCardDAO);
    const creditCardService: CreditCardService = CreditCardServiceProvider.create(creditCardRepository);

    const userDAO: IUserDAO = UserDAOProvider.create(db);
    const userRepository: IUserRepository = UserRepositoryProvider.create(userDAO);
    const userService: IUserService = UserServiceProvider.create(userRepository);

    const creditCarUsedDAO: ICreditCardUseDAO = CreditCardUseDAOProvider.create(db);
    const creditCardUseRepository: ICreditCardUseRepository = CreditCardUseRepositoryProvider.create(creditCarUsedDAO);
    const creditCardUseService: ICreditCardUseService = CreditCardUseServiceProvider.create(
        creditCardUseRepository,
        creditCardService,
        userService,
    );
    const creditCardUseController: ICreditCardUseController =
        CreditCardUseControllerProvider.create(creditCardUseService);

    const router: Router = setupRoutes(creditCardUseController);

    return router;
};

function setupRoutes(creditCardUseController: ICreditCardUseController) {
    const router: Router = Router();

    router.post(CREDIT_CARDS_USES_ROUTE, checkSchema(validateCreateCreditCardUse), async (req: Request, res: Response) => {
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
