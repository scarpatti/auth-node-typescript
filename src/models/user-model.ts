import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import database from '../database';

class User extends Model {
    public id!: string;

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
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        passwordHash: Sequelize.STRING,
    },
    {
        sequelize: database.connection,
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

User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    delete values.passwordHash;

    return values;
}

export default User;
