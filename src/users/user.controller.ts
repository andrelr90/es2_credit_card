import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { handleStandardFailure } from '../errors/handler.util';
import { CreateUserDTO, CreateUserRequest, User, UserId } from './user.model';
import { IUserService } from './user.service';

export interface IUserController {
    createUser(req: Request, res: Response): Promise<Response>;
    getUser(req: Request, res: Response): Promise<Response>;
    getAllUsers(req: Request, res: Response): Promise<Response>;
}

class UserController implements IUserController {
    private readonly userService: IUserService;

    public constructor(userService: IUserService) {
        this.userService = userService;
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const createUserRequest: CreateUserRequest = req.body;
            const user: CreateUserDTO = {
                name: createUserRequest.name,
                password: createUserRequest.password,
                role: createUserRequest.role,
            };
            const createdUserId: UserId = await this.userService.createUser(user);
            return res.status(200).json({ success: true, data: { id: createdUserId } });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const userId = req.params.userId;
            if (userId === undefined) {
                throw new Error('Id de usuario invalido');
            }
            const user: User = await this.userService.getUserById(userId);
            return res.status(200).json({ success: true, data: user });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const allUsers: User[] = await this.userService.getAllUsers();
            return res.status(200).json({ success: true, data: allUsers });
        } catch (err) {
            return handleStandardFailure(err, res);
        }
    }
}

export class UserControllerProvider {
    static create(userService: IUserService) {
        return new UserController(userService);
    }
}
