import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';
import { UserControllerProvider, IUserController } from '../users/user.controller';
import { UserDAOProvider, IUserDAO } from '../users/user.dao';
import { validateCreateUser } from '../users/createUser.validators.middlewares';
import { UserRepositoryProvider, IUserRepository } from '../users/user.repository';
import { UserServiceProvider, IUserService } from '../users/user.service';
import { Knex } from 'knex';

const URI_v1 = '/api/v1';
export const USERS_ROUTE = URI_v1 + '/users';

export const userRouterProvider = (db: Knex): Router => {
    const userDAO: IUserDAO = UserDAOProvider.create(db);
    const userRepository: IUserRepository = UserRepositoryProvider.create(userDAO);
    const userService: IUserService = UserServiceProvider.create(userRepository);
    const userController: IUserController = UserControllerProvider.create(userService);

    const router: Router = setupRoutes(userController);

    return router;
};

function setupRoutes(userController: IUserController) {
    const router: Router = Router();

    router.post(USERS_ROUTE, checkSchema(validateCreateUser), async (req: Request, res: Response) => {
        return await userController.createUser(req, res);
    });
    router.get(USERS_ROUTE, async (req: Request, res: Response) => {
        return await userController.getAllUsers(req, res);
    });
    router.get(USERS_ROUTE + '/:userId', async (req: Request, res: Response) => {
        return await userController.getUser(req, res);
    });
    return router;
}
