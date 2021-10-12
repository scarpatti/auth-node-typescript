import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import database from '../database';

class User extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  public passwordHash!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}

User.init(
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    passwordHash: Sequelize.STRING,
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
  }
);

User.addHook(
  'beforeSave',
  async (user: User): Promise<void> => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 10);
    }
  }
);

export default User;
