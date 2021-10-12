import Sequelize from 'sequelize';
import config from '../config/database';

// import { User } from '../models/user-model';

// const connection = new sequelize.Sequelize(config);

// User.init(connection);

// export const connection;

class Database {
    public connection!: Sequelize.Sequelize
    private config: any;

    constructor() {
        this.config = config;
        this.init();
    }

    init(): void {
        this.connection = new Sequelize.Sequelize(this.config);
    }
}

const database: Database = new Database();

export default database;
