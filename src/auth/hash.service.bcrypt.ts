import { PasswordHash } from './passwordHash.model';
import bcrypt from 'bcrypt';

export class HashServiceBcrypt {
    public static async hashPassword(plainTextPassword: string): Promise<PasswordHash> {
        return await bcrypt.hash(plainTextPassword, 10);
    }
    public static async isSamePassword(plainTextPassword: string, passwordHash: PasswordHash): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, passwordHash);
    }
}
