const express = require('express');
const usersService = require('../services/usersService');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');


const usersRoutes = express.Router();

usersRoutes.use(authMiddleware);

usersRoutes.get('/users', UserController.index);
usersRoutes.get('/users/:id');
usersRoutes.post('/users', UserController.store);
usersRoutes.put('/users/:id');
usersRoutes.delete('/users/:id');

module.exports = usersRoutes;
