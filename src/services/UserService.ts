import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';

export default class UserService {
  public static async store(user: Prisma.UserCreateInput): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);

    return await UserRepository.store(user);
  }

  public static async checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
