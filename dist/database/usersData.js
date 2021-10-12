"use strict";
const database = require('../config/database');
exports.getUsers = () => database.query('select * from auth.users');
//# sourceMappingURL=usersData.js.map