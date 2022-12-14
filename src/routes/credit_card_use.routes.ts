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
import { CreditCardUseServiceProvider } from '../credit_cards_use/credit_card_use.service';
import { UserServiceProvider } from '../users/user.service';
import { IUserRepository, UserRepositoryProvider } from '../users/user.repository';
import { IUserDAO, UserDAOProvider } from '../users/user.dao';
import { ICreditCardDAO, CreditCardDAOProvider } from '../credit_cards/credit_card.dao';
import { ICreditCardRepository, CreditCardRepositoryProvider } from '../credit_cards/credit_card.repository';
import { CreditCardServiceProvider } from '../credit_cards/credit_card.service';
const URI_v1 = '/api/v1';
export const CREDIT_CARDS_USES_ROUTE = URI_v1 + '/credit_cards_uses';

export const creditCardUseRouterProvider = (db: Knex): Router => {
    const creditCardUseController: ICreditCardUseController = CreditCardUseControllerProvider.create(
        getCreditCardUseService(db),
    );

    const router: Router = setupRoutes(creditCardUseController);
    return router;
};

function getCreditCardService(db: Knex) {
    const creditCardDAO: ICreditCardDAO = CreditCardDAOProvider.create(db);
    const creditCardRepository: ICreditCardRepository = CreditCardRepositoryProvider.create(creditCardDAO);
    return CreditCardServiceProvider.create(creditCardRepository);
}

function getUserService(db: Knex) {
    const userDAO: IUserDAO = UserDAOProvider.create(db);
    const userRepository: IUserRepository = UserRepositoryProvider.create(userDAO);
    return UserServiceProvider.create(userRepository);
}

function getCreditCardUseService(db: Knex) {
    const creditCardDAO: ICreditCardDAO = CreditCardDAOProvider.create(db);
    const creditCarUsedDAO: ICreditCardUseDAO = CreditCardUseDAOProvider.create(db, creditCardDAO);
    const creditCardUseRepository: ICreditCardUseRepository = CreditCardUseRepositoryProvider.create(creditCarUsedDAO);
    return CreditCardUseServiceProvider.create(creditCardUseRepository, getCreditCardService(db), getUserService(db));
}

function setupRoutes(creditCardUseController: ICreditCardUseController) {
    const router: Router = Router();

    setupPostRoutes(router, creditCardUseController);
    setupGetRoutes(router, creditCardUseController);

    return router;
}

function setupPostRoutes(router: Router, creditCardUseController: ICreditCardUseController) {
    router.post(
        CREDIT_CARDS_USES_ROUTE,
        checkSchema(validateCreateCreditCardUse),
        async (req: Request, res: Response) => {
            return await creditCardUseController.createCreditCardUse(req, res);
        },
    );
}

function setupGetRoutes(router: Router, creditCardUseController: ICreditCardUseController) {
    router.get(CREDIT_CARDS_USES_ROUTE, async (req: Request, res: Response) => {
        return await creditCardUseController.getAllCreditCardsUses(req, res);
    });
    router.get(CREDIT_CARDS_USES_ROUTE + '/credit_cards/:creditCardId', async (req: Request, res: Response) => {
        return await creditCardUseController.getCreditCardUsesByCreditCardId(req, res);
    });
    router.get(CREDIT_CARDS_USES_ROUTE + '/users/:userId', async (req: Request, res: Response) => {
        return await creditCardUseController.getCreditCardUsesByUserId(req, res);
    });
}
