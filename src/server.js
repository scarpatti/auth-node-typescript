const express = require('express');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

require('./database/index');

app.use(express.json());

app.use(authRoutes);
app.use(usersRoutes);

app.listen(3000);
