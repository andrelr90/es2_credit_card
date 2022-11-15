import {
    UserRepositoryProvider,
    IUserRepository,
} from '../../../src/users/user.repository';
import { UserDAOMock } from './mocks/users.repository.mock';

let repo: IUserRepository;
beforeEach(() => {
    repo = UserRepositoryProvider.create(new UserDAOMock());
});

describe('User creation', () => {
    it('should return id of user when user is created successfully', async () => {
        const toAdd = {
            name: 'Teste',
            password: 'Teste',
            role: 'Admin'
        };
        const id_created = await repo.add(toAdd);
        const isIdANumber = !isNaN(Number(id_created));
        expect(isIdANumber).toBe(true);
    });
});

describe('Get user', () => {
    it('should return user by id', async () => {
        const expectedUser = {
                id: '1',
                name: 'Teste',
                password: 'Teste',
                role: 'Admin'
            };
        expect(await repo.getById(expectedUser.id)).toEqual(expectedUser);
    });

    it('should return user by name', async () => {
        const expectedUser = {
                id: '1',
                name: 'Teste',
                password: 'Teste',
                role: 'Admin'
            };
        expect(await repo.getByName(expectedUser.name)).toEqual(expectedUser);
    });
});

describe('Get all users', () => {
    it('should return all users', async () => {
        const expectedUsers = [
            {
                id: '1',
                name: 'Teste',
                password: 'Teste',
                role: 'Admin'
            },
            {
                id: '2',
                name: 'Teste2',
                password: 'Teste2',
                role: 'User'
            }
        ];
        expect(await repo.getAll()).toEqual(expectedUsers);
    });
});