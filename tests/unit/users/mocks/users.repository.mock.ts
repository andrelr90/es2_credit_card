import { IUserDAO } from '../../../../src/users/user.dao';
import { CreateUserDTO, User, UserId } from '../../../../src/users/user.model';

export class UserDAOMock implements IUserDAO {
    private users = {
        '1': {
            id: '1',
            name: 'Teste',
            password: 'Teste',
            role: 'Admin',
        },
        '2': {
            id: '2',
            name: 'Teste2',
            password: 'Teste2',
            role: 'User',
        },
    };

    public async createUser(user: CreateUserDTO): Promise<string> {
        if (user['name'] == 'Teste') {
            return '1';
        }
        return '2';
    }
    public async getUserById(userId: UserId): Promise<User> {
        if (userId === '1') {
            return this.users['1'];
        }
        throw new Error('Nao ha usarios com esse id');
    }
    public async getUserByName(userName: string): Promise<User> {
        if (userName === 'Teste') {
            return this.users['1'];
        }
        throw new Error('Nao ha usuarios com esse nome');
    }
    public async getAllUsers(): Promise<User[]> {
        return [this.users['1'], this.users['2']];
    }
}
