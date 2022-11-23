import { createTestDatabase } from '../createTestDatabase';
import dbConfig from '../../../db.configs';
import { dbProvider } from '../../../database/database.providers';
import { UserDAOProvider, IUserDAO } from '../../../src/users/user.dao';
import { UserRepositoryProvider, IUserRepository } from '../../../src/users/user.repository';
import { UserServiceProvider, IUserService } from '../../../src/users/user.service';
import { Knex } from 'knex';

let db: Knex<any, any[]>;
let userService: IUserService;

function getUserService(db: Knex) {
    const userDAO: IUserDAO = UserDAOProvider.create(db);
    const userRepository: IUserRepository = UserRepositoryProvider.create(userDAO);
    return UserServiceProvider.create(userRepository);
}

beforeEach(async () => {
    db = dbProvider(dbConfig['test']);
    userService = getUserService(db);
    await createTestDatabase(db);
});

afterEach(async () => {
    await db.destroy();
});

describe('User creation', () => {
    it('should create User', async () => {
        const user = {
            name: 'Teste',
            password: 'Teste',
            role: 'Admin',
        };

        expect(await userService.createUser(user)).toEqual({ id: 1 });
    });

    it('should be able to get all users created', async () => {
        const user = {
            name: 'Teste',
            password: 'Teste',
            role: 'Admin',
        };
        await userService.createUser(user);
        await userService.createUser(user);
        const users = await userService.getAllUsers();

        expect(users.length).toEqual(2);
    });
});
