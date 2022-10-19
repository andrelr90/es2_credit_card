import { Knex } from 'knex';
import { CreateUserDTO, User, UserId } from './user.model';

export interface IUserDAO {
    createUser(user: CreateUserDTO): Promise<UserId>;
    getUserById(userId: UserId): Promise<User>;
    getUserByName(userName: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}

export class UserDAO implements IUserDAO {
    private readonly knex: Knex;

    public constructor(knex: Knex) {
        this.knex = knex;
    }

    public static getTableName(): string {
        return 'users';
    }

    public async createUser(user: CreateUserDTO): Promise<UserId> {
        const createdUser: any[] = await this.knex.transaction(async (trx) => {
            const createdUser = await trx<User>(UserDAO.getTableName()).insert(user, '*');
            return createdUser;
        });
        return createdUser[0];
    }

    public async getUserById(userId: UserId): Promise<User> {
        const user = await this.knex<User>(UserDAO.getTableName()).where('id', userId).first();
        if (user === undefined) {
            throw new Error('Nao ha usuario com esse id');
        }
        return user;
    }

    public async getUserByName(userName: string): Promise<User> {
        const user = await this.knex<User>(UserDAO.getTableName()).where('name', userName).first();
        if (user === undefined) {
            throw new Error('Nao ha usuario com esse nome');
        }
        return user;
    }

    public async getAllUsers(): Promise<User[]> {
        const allUsers = await this.knex<User>(UserDAO.getTableName()).select('*');
        if (allUsers === undefined) {
            throw new Error('Nao ha usuarios');
        }
        return allUsers;
    }
}

export class UserDAOProvider {
    public static create(knex: Knex) {
        return new UserDAO(knex);
    }
}
