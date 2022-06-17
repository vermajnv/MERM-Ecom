const express = require('express');
const { listUsers, registerUser, loginUser, logoutUser } = require('../Controllers/user');
const Router = express.Router();

Router.route('/').get(listUsers);
Router.route('/register').post(registerUser);
Router.route('/login').post(loginUser);
Router.route('/logout').get(logoutUser);

module.exports = Router;