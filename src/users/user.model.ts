export interface BaseUser {
    name: string;
    password: string;
    role: string;
}

export type UserId = string;
interface UserIdentity {
    id: UserId;
    name: string;
}

export type CreateUserRequest = BaseUser & { confirmPassword: string };
export type CreateUserDTO = BaseUser;

export type User = UserIdentity & BaseUser;
