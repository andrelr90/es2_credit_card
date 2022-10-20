import { IUserDAO } from './user.dao';
import { CreateUserDTO, User, UserId } from './user.model';

export interface IUserRepository {
    add(user: CreateUserDTO): Promise<UserId>;
    getById(userId: UserId): Promise<User>;
    getByName(userName: string): Promise<User>;
    getAll(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
    private readonly userDAO: IUserDAO;

    public constructor(userDAO: IUserDAO) {
        this.userDAO = userDAO;
    }

    public async add(user: CreateUserDTO): Promise<UserId> {
        return await this.userDAO.createUser(user);
    }

    public async getById(userId: UserId): Promise<User> {
        return await this.userDAO.getUserById(userId);
    }

    public async getByName(userName: string): Promise<User> {
        return await this.userDAO.getUserByName(userName);
    }

    public async getAll(): Promise<User[]> {
        return await this.userDAO.getAllUsers();
    }
}

export class UserRepositoryProvider {
    static create(userDAO: IUserDAO) {
        return new UserRepository(userDAO);
    }
}
