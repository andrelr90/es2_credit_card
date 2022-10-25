import { CreateUserDTO, User, UserId } from './user.model';
import { IUserRepository } from './user.repository';
import { HashServiceBcrypt } from '../auth/hash.service.bcrypt';

export interface IUserService {
    createUser(user: CreateUserDTO): Promise<UserId>;
    getUserById(userId: UserId): Promise<User>;
    getUserByName(userName: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}

class UserService implements IUserService {
    private readonly userRepository: IUserRepository;

    public constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async createUser(user: CreateUserDTO): Promise<UserId> {
        const hashedPasswordUser: CreateUserDTO = { ...user };
        hashedPasswordUser.password = await HashServiceBcrypt.hashPassword(user.password);

        const createdUser = await this.userRepository.add(hashedPasswordUser);
        return createdUser;
    }

    public async getUserById(userId: UserId): Promise<User> {
        const user = await this.userRepository.getById(userId);
        return user;
    }

    public async getUserByName(userName: string): Promise<User> {
        const user = await this.userRepository.getByName(userName);
        return user;
    }

    public async getAllUsers(): Promise<User[]> {
        const allUsers = await this.userRepository.getAll();
        return allUsers;
    }
}

export class UserServiceProvider {
    static create(userRepository: IUserRepository) {
        return new UserService(userRepository);
    }
}
