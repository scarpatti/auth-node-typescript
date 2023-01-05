import { Permission, Prisma, Role, RoleType, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';

export default class UserService {
  public static async store(user: Prisma.UserCreateManyInput): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);

    return await UserRepository.store(user);
  }

  public static async find(
    userId: string
  ): Promise<Omit<User, 'password'>
  & { Role: Role
    & { Permissions: Permission[] }
    & { RoleType: RoleType }}
  | null> {
    const user = await UserRepository.find(userId);

    return user;
  }

  public static async checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  public static exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key]
    }
    return user
  }
}
